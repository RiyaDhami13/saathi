
import { NextRequest, NextResponse } from "next/server";
import { explainItems } from "../../../lib/ai/ts";
import type { ReadItem } from "../../../lib/types";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (
            !Array.isArray(body.items) ||
            body.items.length === 0
        ) {
            return NextResponse.json(
                { error: "Items array is required." },
                { status: 400 }
            );
        }

        const items = body.items as ReadItem[];

        const result = await explainItems(items);

        return NextResponse.json(result, {
            status: 200,
        });

    } catch (error) {
        console.error("Explain error:", error);

        return NextResponse.json(
            { error: "Failed to explain document." },
            { status: 500 }
        );
    }
}
