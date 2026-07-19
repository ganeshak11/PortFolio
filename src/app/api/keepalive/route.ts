import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const supabaseUrl = process.env.MY_SUPABASE_URL?.replace(/^["']|["']$/g, '').trim();
        const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.MY_SUPABASE_ANON_KEY)?.replace(/^["']|["']$/g, '').trim();
        
        if (!supabaseUrl || !supabaseKey || supabaseUrl === 'undefined' || supabaseKey === 'undefined') {
            const keySuffix = supabaseKey ? supabaseKey.slice(-8) : 'missing';
            return NextResponse.json({ error: `Missing Supabase configuration. URL: "${supabaseUrl}", Key ends with: "...${keySuffix}"` }, { status: 500 });
        }

        console.log(`[Supabase Keepalive] URL: ${supabaseUrl}, Key ends with: ...${supabaseKey.slice(-8)}`);

        try {
            new URL(supabaseUrl);
        } catch (e) {
            return NextResponse.json({ error: `Invalid NEXT_PUBLIC_SUPABASE_URL: "${supabaseUrl}". Must start with https://` }, { status: 500 });
        }

        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Execute a tiny read query to keep the Supabase Postgres instance awake
        const { error } = await supabase.from('page_views').select('slug').limit(1);
        
        if (error) throw error;

        return NextResponse.json({ status: "alive", message: "Supabase database pinged successfully." });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
