import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import * as cheerio from "cheerio"; // 👈 IMPORTANT

export async function fetchPageContent(url, user_id, bookmark_id) {
  const loader = new CheerioWebBaseLoader(url);

  // Always returns an array of Documents
  let docs = await loader.load();

  // Safety: normalize
  if (!Array.isArray(docs)) {
    docs = [docs];
  }

  // 1) Clean HTML + extract visible text
  const textDocs = docs.map((doc) => {
    const html = doc.pageContent || "";
    const $ = cheerio.load(html);

    // Remove non-content elements
    $("script, style, noscript, iframe, svg, meta, link").remove();

    // Get body text only (fallback to root)
    const body = $("body");
    const rawText = body.text() || $.root().text() || "";

    // Normalize whitespace
    const cleanText = rawText.replace(/\s+/g, " ").trim();

    return {
      pageContent: cleanText,
      metadata: doc.metadata,
    };
  });

  // 2) Split into chunks of text
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 150,
  });

  const chunkDocs = await splitter.splitDocuments(
    textDocs.map((d) => ({
      pageContent: d.pageContent,
      metadata: d.metadata,
    }))
  );

  // 3) Final mapping + filter empty chunks
  const chunks = chunkDocs
    .filter((d) => d.pageContent && d.pageContent.trim().length > 0)
    .map((d) => ({
      // content: d.pageContent.trim(),
      metadata: d.metadata,
      user_id,
      bookmark_id,
    }));

  return chunks;
}
