// app/api/registrations/route.js
import { NextResponse } from "next/server";
import { getAllRegistrations } from "@/lib/sheets";
import { verifyAdminToken, unauthorizedResponse } from "@/lib/auth";

export async function GET(request) {
    const admin = await verifyAdminToken(request);
    if (!admin) return unauthorizedResponse();

    try {
        const registrations = await getAllRegistrations();
        return NextResponse.json(registrations);
    } catch (error) {
        console.error("Error fetching registrations:", error);
        return NextResponse.json({ error: "Failed to fetch registrations." }, { status: 500 });
    }
}
