import { PineconeStore } from "@langchain/pinecone";
import { embedder } from "../config/embedding.js";
import { pineconeIndex } from "../service/storeEmbeddings.js";
import { groq } from "../config/groq.js";

export const getChatResponse = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: "Please provide a query" });
    }
    //connect the vector database
    const namespace = (req.ip || "default").replace(/[^a-zA-Z0-9-_]/g, "_");
    const vectorStore = await PineconeStore.fromExistingIndex(embedder, {
      pineconeIndex,
      namespace,
    });

    //search with similerity
    const result = await vectorStore.similaritySearch(query, 10);
    const context = result.map((doc) => doc.pageContent);

    const prompt = `You are an expert AI assistant specialized in analyzing candidate profiles, resumes, and extracted context to provide accurate job-related insights and answer profile-specific questions.

    Context/Data:
    ${context.join("\n")}

    Instructions:
    1. Answer the user's question accurately based on the provided Context/Data.
    2. If the user asks about personal details (like name, email, skills, or projects), extract them smartly from the provided context.
    3. Maintain a professional yet helpful tone.
    4. Only say "I don't have enough information to answer that." if the context absolutely does not contain any relevant clues, keywords, or data to answer the question.
    5. Align your output with the required JSON schema fields:
       - 'reasoning': Detailed explanation answering the user's question or analyzing the resume.
       - 'match': An integer percentage (0-100) representing how well the candidate matches the job or role mentioned in the query. If the query does not ask to match a role, output a default of 100 if the query was answered successfully, or 0 if not.
       - 'suggestion': Recommendations, improvements, or constructive feedback for the candidate based on the resume and query.

    Question: ${query}

    Answer: 
                    `;
    const chain = groq.withStructuredOutput({
      name: "resume_analysis",
      description: "Analyze the candidate's resume against the job description",
      schema: {
        type: "object",
        properties: {
          reasoning: {
            type: "string",
            description: "reasoning",
          },
          match: {
            type: "number",
            description: "match percentage",
          },
          suggestion: {
            type: "string",
            description: "suggestion",
          },
        },
      },
    });
    const response = await chain.invoke(prompt);

    return res.status(200).json({ message: "query", data: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
