import { Injectable } from "@nestjs/common";
import { isMathQuestion } from "../agents/domain.guard";
import { createMathAgent } from "../agents/math.agent";
import { HumanMessage } from "@langchain/core/messages";

@Injectable()
export class ChatService {

  async handleMessage(message: string): Promise<string> {
    console.log("ChatService: Processing message:", message);

    try {
      console.log("ChatService: Checking if math question...");
      const allowed = await isMathQuestion(message);
      console.log("ChatService: Is math question?", allowed);

      if (!allowed) {
        return "I am a math teacher. I can only answer math-related questions.";
      }

      console.log("ChatService: Creating agent...");
      const agent = await createMathAgent();
      console.log("ChatService: Invoking agent...");
      const result = await agent.invoke({ messages: [new HumanMessage(message)] });
      console.log("ChatService: Agent finished.");

      const lastMessage = result.messages[result.messages.length - 1];

      return typeof lastMessage.content === "string"
        ? lastMessage.content
        : lastMessage.content.map((c: any) => c.text ?? "").join("");
    } catch (error) {
      console.error("ChatService Error:", error);
      throw error;
    }
  }
}
