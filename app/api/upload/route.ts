import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import parsePDF from "@/app/utils/parsePDF";
import LLMTextParse from "@/app/utils/anthropicTextExtract";
import PdfParse from "pdf-parse";
import writeCsvWithMetadata from "@/app/utils/writeToCSVWithMetaData";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type");

    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF files are allowed." },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const pdfFile = formData.get("pdf") as File | null;
    const metadataString = formData.get("metadata") as string | null;

    if (!pdfFile || !metadataString) {
      return NextResponse.json(
        { error: "Missing PDF file or metadata." },
        { status: 400 }
      );
    }
    const metadata = JSON.parse(metadataString);

    console.log(metadata);

    const { restaurantName } = metadata;

    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer()); // Convert ArrayBuffer to Buffer

    const filePath = path.join(
      process.cwd(),
      "uploads",
      `${restaurantName}.pdf`
    ); // Define the file path

    await fs.writeFile(filePath, pdfBuffer);

    const pdfText = await parsePDF(filePath);

    const text = await LLMTextParse(pdfText);

    const csvFileName = restaurantName.replace(/\s+/g, "");

    await writeCsvWithMetadata(csvFileName, text, metadata);

    return NextResponse.json(
      { message: `pdf and metadata received, csv written ` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
