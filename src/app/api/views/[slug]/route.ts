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

        // 3. Check if this unique hash has viewed this specific blog post before
        const { data: existingView } = await supabase
            .from("unique_visitors")
            .select("id")
            .eq("slug", slug)
            .eq("visitor_hash", visitorHash)
            .single();

        let isNewView = false;
        
        if (!existingView) {
            // Record that they have now seen it
            await supabase.from("unique_visitors").insert({
                slug,
                visitor_hash: visitorHash
            });
            isNewView = true;
        }

        // 4. If it's a new view, increment the total counter securely via RPC
        if (isNewView) {
            await supabase.rpc('increment_page_view', { page_slug: slug });
        }

        // 5. Fetch and return the latest count
        const { data: viewData } = await supabase
            .from("page_views")
            .select("view_count")
            .eq("slug", slug)
            .single();

        const count = viewData ? viewData.view_count : (isNewView ? 1 : 0);
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
