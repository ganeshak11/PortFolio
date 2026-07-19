import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Uses the Web Crypto API (globalThis.crypto) which is available in
// Node.js 18+, Edge Runtime, and all modern browsers — no Node 'crypto' import needed.



export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;

        // 1. Read the client-generated visitor UUID from the request body
        //    This UUID is generated once on first visit and stored in localStorage.
        let visitorId: string | undefined;
        try {
            const body = await req.json();
            visitorId = typeof body?.visitorId === "string" ? body.visitorId : undefined;
        } catch {
            // Body may be empty or non-JSON — fall through to fallback
        }

        // 2. Fallback: generate a random UUID server-side if none was provided
        if (!visitorId) {
            const { randomUUID } = require('crypto');
            visitorId = randomUUID();
        }

        // 3. Extract the raw IP address for metadata (abuse detection / geo-analytics)
        const forwardedFor = req.headers.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

        // 4. Generate current time in IST (UTC+5:30) as a plain datetime string
        // We strip the 'Z' suffix so Postgres stores it as-is (requires 'timestamp' column type, not 'timestamptz')
        const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in ms
        const istTimestamp = new Date(Date.now() + istOffset).toISOString().slice(0, 19).replace("T", " ");
        // e.g. "2026-06-23 19:14:26" — stored exactly as IST in Supabase

        // 5. Upsert the visitor row:
        //    - New UUID  → INSERT a fresh row (visit_count = 1)
        //    - Known UUID → UPDATE visit_count + 1 and last_seen to now
        const { error: upsertError } = await supabase.rpc("upsert_visitor", {
            p_slug:          slug,
            p_visitor_hash:  visitorId,
            p_ip_address:    ip,
            p_timestamp:     istTimestamp,
        });
        if (upsertError) console.error("[upsert_visitor error]", upsertError.message);

        // 6. Increment the view counter on every visit
        await supabase.rpc("increment_page_view", { page_slug: slug });

        // 7. Fetch and return the latest count
        const { data: viewData } = await supabase
            .from("page_views")
            .select("view_count")
            .eq("slug", slug)
            .single();

        const count = viewData ? viewData.view_count : 1;
        return NextResponse.json({ count });

    } catch (e: any) {
        console.error("[POST views error]", e);
        return NextResponse.json({ error: e.message || "Internal Error" }, { status: 500 });
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
        console.error("[GET views error]", e);
        return NextResponse.json({ count: 0 }, { status: 500 });
    }
}
