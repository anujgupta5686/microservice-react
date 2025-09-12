import axiox from "axios"
import { randomBytes } from "crypto";
import { snippets } from "../database/index.js";

export const createSnippet = async (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { title, code } = req.body;

    // Validate input
    if (!title || !code) {
        return res.status(400).json({
            success: false,
            message: "Title and code are required"
        });
    }

    // Current date and time
    const createdAt = new Date().toISOString();
    // If you prefer human-readable format, use: new Date().toLocaleString()

    // Creating a snippet
    snippets[id] = {
        id,
        title,
        code,
        createdAt
    };
    // Before return Emit Event 
    await axiox.post("http://localhost:8005/events", {
        type: "SnippetCreated",
        data: {
            id,
            title
        }
    })
    return res.status(201).json({
        success: true,
        snippet: snippets[id],
        message: "Snippet created successfully"
    });
};

export const getSnippet = (_, res) => {
    return res.status(200).json({
        success: true,
        snippets: snippets
    });
};
