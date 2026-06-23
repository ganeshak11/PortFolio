import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data } = await supabase
        .from("comments")
        .select("id, name, message, created_at")
        .eq("slug", slug)
        .order("created_at", { ascending: false });
    return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { name, email, message } = await req.json();

    if (!name?.trim() || !message?.trim()) {
        return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }

    // Generate current time in IST (UTC+5:30) as a plain datetime string
    // Stored as-is when column type is 'timestamp' (not 'timestamptz')
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in ms
    const istTimestamp = new Date(Date.now() + istOffset).toISOString().slice(0, 19).replace('T', ' ');
    // e.g. "2026-06-23 19:14:26" — stored exactly as IST in Supabase

    const { data, error } = await supabase
        .from("comments")
        .insert({ slug, name: name.trim(), email: email?.trim() || null, message: message.trim(), created_at: istTimestamp })
        .select("id, name, message, created_at")
        .single();

    if (error) return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
}
