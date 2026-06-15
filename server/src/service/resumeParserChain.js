import fs from "node:fs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { groq } from "../config/groq.js";
import { z } from "zod";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import User from "../models/user.model.js";

const PersonSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
});
export const resumeParserChain = async (resume, ip) => {
  try {
    const loader = new PDFLoader(resume.path);
    const docs = await loader.load();

    const split = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 200,
    });

    const chunk = await split.splitDocuments(docs);

    const structuredLlm = groq.withStructuredOutput(PersonSchema);

    const prompt = ChatPromptTemplate.fromTemplate(
      "Extract the name and email from this resume:\n\n{resume}",
    );

    const chain = prompt.pipe(structuredLlm);

    const res = await chain.invoke({
      resume: chunk[0].pageContent,
    });

    if (res) {
      const { name, email } = res;
      if (name && email) {
        const existingUser = await User.findOne({ ip });
        if (existingUser) {
          const now = new Date();
          const diff = now - existingUser.lastUsed;

          if (diff > 86400) {
            await User.findOneAndUpdate(
              { email },
              { $inc: { toolUseCount: 1 } },
              { new: true },
            );
          } else {
            return {
              status: "error",
              message:
                "You have already used tool 5 times successfully , come back next day",
            };
          }
          console.log("user already exist ");
        } else {
          await User.create({
            name,
            email,
            role: "user",
            ip,
            toolUseCount: 1,
          });
          console.log("user created successfully");
        }
      }
    }
    return chunk;
  } catch (error) {
    console.error("resume Chain Error : ", error);
    throw error;
  } finally {
    fs.unlinkSync(resume.path);
  }
};
