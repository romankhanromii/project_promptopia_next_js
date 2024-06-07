
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET handler
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creater');
        if (!prompt) return new Response("Prompt not found", { status: 404 });
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error("Error fetching prompt:", error);
        return new Response("Failed to fetch the prompt", { status: 500 });
    }
};

// PATCH handler
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        console.error("Error updating prompt:", error);
        return new Response("Failed to update the prompt", { status: 500 });
    }
};

// DELETE handler
export const DELETE = async (request, { params }) => {
    try {
        // Connect to the database
        await connectToDB();
        console.log("Connected to the database");

        // Log the ID to be deleted
        console.log("Deleting prompt with ID:", params.id);

        // Find the prompt by ID and delete it
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

        // If the prompt is not found, log and return a 404 response
        if (!deletedPrompt) {
            console.error(`Prompt with ID ${params.id} not found`);
            return new Response("Prompt not found", { status: 404 });
        }

        console.log(`Prompt with ID ${params.id} deleted successfully`);

        // Return a success response
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        // Log the error details
        console.error("Error deleting prompt:", error);

        // Return a 500 response with error details
        return new Response(`Failed to delete the prompt: ${error.message}`, { status: 500 });
    }
};