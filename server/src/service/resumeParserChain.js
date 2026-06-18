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
        const existingUser = await User.findOne({ $or: [{ ip }, { email }] });
        if (existingUser) {
          const now = new Date();
          const oneDayInMs = 24 * 60 * 60 * 1000;
          const diff = now - new Date(existingUser.lastUsed);

          if (diff > oneDayInMs) {
            // More than 24 hours since last usage, reset count
            existingUser.toolUseCount = 1;
            existingUser.lastUsed = now;
            if (ip) existingUser.ip = ip;
            if (email) existingUser.email = email;
            await existingUser.save();
          } else {
            // Within 24 hours, check if count exceeds limit
            if (existingUser.toolUseCount >= 5) {
              return {
                status: "error",
                message:
                  "You have already used the tool 5 times successfully, please come back tomorrow.",
              };
            } else {
              existingUser.toolUseCount += 1;
              existingUser.lastUsed = now;
              await existingUser.save();
            }
          }
          console.log("user already exists, usage count updated");
        } else {
          await User.create({
            name,
            email,
            role: "user",
            ip,
            toolUseCount: 1,
            lastUsed: new Date(),
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
