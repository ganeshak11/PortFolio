import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data } = await supabase.from("likes").select("count").eq("slug", slug).single();
    return NextResponse.json({ count: data?.count ?? 0 });
}

export async function POST(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data } = await supabase.from("likes").select("count").eq("slug", slug).single();

    if (data) {
        await supabase.from("likes").update({ count: data.count + 1 }).eq("slug", slug);
    } else {
        await supabase.from("likes").insert({ slug, count: 1 });
    }

    const { data: updated } = await supabase.from("likes").select("count").eq("slug", slug).single();
    return NextResponse.json({ count: updated?.count ?? 1 });
}
