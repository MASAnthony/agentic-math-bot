import { PromptTemplate } from "@langchain/core/prompts";
import { llm } from "../config/llm.config";
import { classifierPrompt } from "../prompts/classifier.prompt";

export async function isMathQuestion(input: string): Promise<boolean> {
  const prompt = PromptTemplate.fromTemplate(classifierPrompt);
  const chain = prompt.pipe(llm);

  const result = await chain.invoke({ input });

  const content =
    typeof result.content === "string"
      ? result.content
      : result.content.map((c: any) => c.text ?? "").join("");

  return content.trim() === "YES";
}
