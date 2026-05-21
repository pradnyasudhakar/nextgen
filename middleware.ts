
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET ?? "super-secret-change-this-in-production-min-32-chars"
);

const PUBLIC_ADMIN_PATHS = ["/admin/login"];
const PUBLIC_API_PATHS = ["/api/admin/login"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (
        PUBLIC_ADMIN_PATHS.includes(pathname) ||
        PUBLIC_API_PATHS.some((p) => pathname.startsWith(p))
    ) {
        return NextResponse.next();
    }

    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
        const loginUrl = new URL("/admin/login", req.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
    }

    try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.next();
    } catch {
        const response = NextResponse.redirect(new URL("/admin/login", req.url));
        response.cookies.delete("admin_token");
        return response;
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};