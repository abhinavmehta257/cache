
import user from "@/model/user";
import connectDB from "./lib/connectDB";
import { fetchPageContent } from "@/helpers/screapeLink";


export default async function handler(req, res) {
    const chunks = await fetchPageContent('https://www.indiatoday.in/technology/news/story/tiktok-maker-launched-a-fully-agentic-ai-phone-in-china-then-scaled-back-its-powers-after-a-privacy-scare-2832035-2025-12-07', '643c8f6f3f1cfb001ed6f3a1', '64b8f0e2f4d3c2001f9e4b5a');
    res.status(200).json({ done: true, chunks })
  }