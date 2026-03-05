// app/api/winners/route.js
import { NextResponse } from "next/server";
import { getAllWinners, addWinner } from "@/lib/sheets";
import { verifyAdminToken, unauthorizedResponse } from "@/lib/auth";

// Public: Get all winners
export async function GET() {
    try {
        const winners = await getAllWinners();
        return NextResponse.json(winners);
    } catch (error) {
        console.error("Error fetching winners:", error);
        return NextResponse.json({ error: "Failed to fetch winners." }, { status: 500 });
    }
}

// Admin only: Add a winner
export async function POST(request) {
    const admin = await verifyAdminToken(request);
    if (!admin) return unauthorizedResponse();

    try {
        const data = await request.json();
        const { event, position, participantName, college } = data;

        if (!event || !position || !participantName || !college) {
            return NextResponse.json({ error: "All winner fields are required." }, { status: 400 });
        }

        const id = await addWinner(data);
        return NextResponse.json({ success: true, id }, { status: 201 });
    } catch (error) {
        console.error("Error adding winner:", error);
        return NextResponse.json({ error: "Failed to add winner." }, { status: 500 });
    }
}
