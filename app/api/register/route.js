// app/api/register/route.js
import { NextResponse } from "next/server";
import { addRegistration, checkDuplicate } from "@/lib/sheets";

export async function POST(request) {
    try {
        const data = await request.json();
        const { name, college, phone, email, event, teamSize } = data;

        // Validate required fields
        if (!name || !college || !phone || !email || !event || !teamSize) {
            return NextResponse.json(
                { error: "All required fields must be filled." },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
        }

        // Check for duplicate registration
        const isDuplicate = await checkDuplicate(email, event);
        if (isDuplicate) {
            return NextResponse.json(
                { error: "This email has already been registered for this event. Each participant can only register once per event." },
                { status: 409 }
            );
        }

        const id = await addRegistration(data);

        return NextResponse.json(
            { success: true, message: "Registration successful!", id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Registration failed. Please try again later." },
            { status: 500 }
        );
    }
}
