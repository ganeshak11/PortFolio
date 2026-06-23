import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        
        // 1. Get the user's IP address (Vercel uses x-forwarded-for)
        const forwardedFor = req.headers.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(',')[0] : "127.0.0.1";
        
        // 2. Cryptographically hash the IP so we NEVER store actual IPs in the database (Privacy first!)
        const salt = process.env.VIEWS_SALT || "portfolio-salt-123";
        const visitorHash = crypto.createHash("sha256").update(ip + salt).digest("hex");

        // 3. Generate current time in IST (UTC+5:30) as a plain datetime string
        // We strip the 'Z' suffix so Postgres stores it as-is (requires 'timestamp' column type, not 'timestamptz')
        const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in ms
        const istTimestamp = new Date(Date.now() + istOffset).toISOString().slice(0, 19).replace('T', ' ');
        // e.g. "2026-06-23 19:14:26" — stored exactly as IST in Supabase

        // 4. Log every visit (including repeat visits from the same IP)
        const { error: insertError } = await supabase.from("unique_visitors").insert({
            slug,
            visitor_hash: visitorHash,
            created_at: istTimestamp
        });
        if (insertError) console.error("[visitors insert error]", insertError.message);

        // 5. Increment the view counter on every visit
        await supabase.rpc('increment_page_view', { page_slug: slug });

        // 6. Fetch and return the latest count
        const { data: viewData } = await supabase
            .from("page_views")
            .select("view_count")
            .eq("slug", slug)
            .single();

        const count = viewData ? viewData.view_count : 1;
        return NextResponse.json({ count });

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const { data: viewData } = await supabase
            .from("page_views")
            .select("view_count")
            .eq("slug", slug)
            .single();
            
        return NextResponse.json({ count: viewData ? viewData.view_count : 0 });
    } catch (e: any) {
        return NextResponse.json({ count: 0 }, { status: 500 });
    }
}
