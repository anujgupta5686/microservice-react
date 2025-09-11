// controller/snippet.js
import { randomBytes } from "crypto";
import { snippets } from "../database/index.js";

export const createSnippet = (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title, code } = req.body;

    // Validate input
    if (!title || !code) {
        return res.status(400).json({
            success: false,
            message: "Title and code are required"
        });
    }

    // Creating a snippet
    snippets[id] = {
        id, title, code
    }

    return res.status(201).json({
        success: true,
        snippet: snippets[id],
        message: "Snippet created successfully"
    });
}

export const getSnippet = (_, res) => {
    return res.status(200).json({
        success: true,
        snippets: snippets
    });
}