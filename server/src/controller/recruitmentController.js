// import { generateEmbedding } from "../service/embedding.js";
import { resumeParserChain } from "../service/resumeParserChain.js";
import { storeEmbedd } from "../service/storeEmbeddings.js";
import fs from "fs";

export const UploadResume = async (req, res) => {
  const resume = req.file;

  try {
    if (!resume) {
      return res.status(400).json({ message: "Please upload a resume" });
    }

    const data = await resumeParserChain(resume);

    const store = await storeEmbedd(data);

    return res.status(200).json({ message: "Resume uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
