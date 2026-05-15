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

    const { data, error } = await supabase
        .from("comments")
        .insert({ slug, name: name.trim(), email: email?.trim() || null, message: message.trim() })
        .select("id, name, message, created_at")
        .single();

    if (error) return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
}
