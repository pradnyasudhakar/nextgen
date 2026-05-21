import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET ?? "super-secret-change-this-in-production-min-32-chars"
);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme123";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body as { email?: string; password?: string };

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required." },
                { status: 400 }
            );
        }

        const isValid =
            email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase() &&
            password === ADMIN_PASSWORD;

        if (!isValid) {
            return NextResponse.json(
                { message: "Invalid email or password." },
                { status: 401 }
            );
        }

        const token = await new SignJWT({
            email: email.toLowerCase().trim(),
            role: "admin",
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("8h")
            .sign(JWT_SECRET);

        const cookieStore = await cookies();
        cookieStore.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 8,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[admin/login]", err);
        return NextResponse.json(
            { message: "Server error. Please try again." },
            { status: 500 }
        );
    }
}