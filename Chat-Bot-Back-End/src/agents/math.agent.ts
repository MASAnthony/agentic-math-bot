import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { mathSystemPrompt } from "../prompts/math.prompts";
import { Calculator } from "@langchain/community/tools/calculator";
import { llm } from "../config/llm.config";

export async function createMathAgent() {
    
  const calculator = new Calculator();

  const agent = await createReactAgent({
    llm,
    tools: [calculator],
    stateModifier: mathSystemPrompt,
  });

  return agent;
}
