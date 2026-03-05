// app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "neurovex_dev_secret_at_least_32_chars_long"
);

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        if (
            username !== process.env.ADMIN_USERNAME ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
        }

        const token = await new SignJWT({ username, role: "admin" })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("8h")
            .sign(JWT_SECRET);

        const response = NextResponse.json({ success: true });
        response.cookies.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 8, // 8 hours
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Login failed." }, { status: 500 });
    }
}
