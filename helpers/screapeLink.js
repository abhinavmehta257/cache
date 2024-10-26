// import { htmlToText } from 'html-to-text';
// import puppeteer from 'puppeteer';

// export async function fetchPageContent(url) {
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: 'networkidle2' });  // Wait for the network to be idle
    
//     // Extract the text content
//     const content = await page.evaluate(() => document.body.innerHTML);

//     await browser.close();
//     htmlToText
//     return content.slice(0, 3000);  // Limit content size for embedding
//   } catch (error) {
//     console.error('Error fetching dynamic page content:', error);
//     return null;
//   }
// }

import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { HtmlToTextTransformer } from "@langchain/community/document_transformers/html_to_text";

export async function fetchPageContent(url, user_id, bookmark_id) {
  const loader = new CheerioWebBaseLoader(url);

  const docs = await loader.load();

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");
  const transformer = new HtmlToTextTransformer();
  
  const sequence = splitter.pipe(transformer);

  const newDocuments = await sequence.invoke(docs);

  const chunks = newDocuments.map((chunk)=>{return {content:chunk.pageContent,  metadata:chunk.metadata, user_id, bookmark_id}})
  console.log(chunks.length);

  return chunks;
}