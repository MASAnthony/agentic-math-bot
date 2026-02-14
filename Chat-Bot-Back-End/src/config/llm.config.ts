// import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import * as dotenv from "dotenv";

dotenv.config();

console.log("Loading LLM Config...");
console.log("GOOGLE_API_KEY present:", !!process.env.GOOGLE_API_KEY);

export const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY,
});
