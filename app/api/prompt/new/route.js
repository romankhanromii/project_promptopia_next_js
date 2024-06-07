import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json()
    
    try {
        await connectToDB()
        const newPrompt = new Prompt({
            creater: userId,
            prompt,
            tag
        })
        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt),{status:201})
    } catch (error) {
        return new Response("failed to create new promopt ",{status:500})
    }
}