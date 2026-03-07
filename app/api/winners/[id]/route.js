// app/api/winners/[id]/route.js
import { NextResponse } from "next/server";
import { updateWinner, deleteWinner } from "@/lib/sheets";
import { verifyAdminToken, unauthorizedResponse } from "@/lib/auth";

export async function PUT(request, { params }) {
    const admin = await verifyAdminToken(request);
    if (!admin) return unauthorizedResponse();

    try {
        const resolvedParams = await params;
        const data = await request.json();
        await updateWinner(resolvedParams.id, data);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating winner:", error);
        return NextResponse.json({ error: "Failed to update winner." }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const admin = await verifyAdminToken(request);
    if (!admin) return unauthorizedResponse();

    try {
        const resolvedParams = await params;
        await deleteWinner(resolvedParams.id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting winner:", error);
        return NextResponse.json({ error: "Failed to delete winner." }, { status: 500 });
    }
}
