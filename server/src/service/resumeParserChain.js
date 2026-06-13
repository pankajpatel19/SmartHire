import fs from "node:fs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const resumeParserChain = async (resume) => {
  try {
    const loader = new PDFLoader(resume.path);
    const docs = await loader.load();

    const split = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 200,
    });

    const chunk = await split.splitDocuments(docs);
    return chunk;
  } catch (error) {
    console.error("resume Chain Error : ", error);
  } finally {
    fs.unlinkSync(resume.path);
  }
};
