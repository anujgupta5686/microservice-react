import axios from "axios"
import { randomBytes } from "crypto";
import { CommentsDB } from "../database/index.js";

export const createComment = async (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { text } = req.body;
    const snippetId = req.params.id;

    // Validate input
    if (!text) {
        return res.status(400).json({
            success: false,
            message: "Comment text is required"
        });
    }

    // Add date and time
    const createdAt = new Date().toISOString();
    // If you want human-readable: new Date().toLocaleString()

    const comments = CommentsDB[snippetId] || [];

    // Create new comment
    const newComment = { commentId, text, createdAt };

    comments.push(newComment);
    CommentsDB[snippetId] = comments;
    // Before return Emit Event
    await axios.post("http://localhost:8005/events", {
        type: "CommentCreated",
        data: {
            id: commentId,
            content: text,
            snippetId
        }
    })
    return res.status(201).json({
        success: true,
        message: "Comment Added",
        comment: newComment
    });
};

export const getCommentBySnippetId = (req, res) => {
    const snippetId = req.params.id;
    return res.status(200).json({
        success: true,
        comments: CommentsDB[snippetId] || []
    });
};
