import { open, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to /public/uploads/
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true, mode: 0o755 });

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;
    const filePath = path.join(uploadDir, fileName);

    // Explicit write + fsync to guarantee disk flush before responding
    const fileHandle = await open(filePath, "w", 0o644);
    await fileHandle.writeFile(buffer);
    await fileHandle.sync();
    await fileHandle.close();

    return NextResponse.json({ url: `/uploads/${fileName}` });
}