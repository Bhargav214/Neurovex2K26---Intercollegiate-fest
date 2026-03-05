// lib/auth.js
// Admin authentication helper

import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "neurovex_dev_secret_at_least_32_chars_long"
);

export async function verifyAdminToken(request) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;
    } catch {
        return null;
    }
}

export function unauthorizedResponse() {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
    });
}
