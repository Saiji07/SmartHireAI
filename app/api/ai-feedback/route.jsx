import { FEEDBACK_PROMPT } from "@/services/Constants";

import { NextResponse } from 'next/server';

import OpenAI from "openai";



export async function POST(req) {
const { conversation: stringifiedConversation } = await req.json();
 try {
 if (!stringifiedConversation) {
 console.error("Error: 'conversation' is missing in the request body.");
 return NextResponse.json(

 { error: "Bad Request", details: "Conversation data is required." },

{ status: 400 } 

);

}



// 3. Parse the stringified conversation back into a JavaScript array of objects

let parsedConversation;

try {

 parsedConversation = JSON.parse(stringifiedConversation);

 } catch (parseError) {

 console.error("Error parsing conversation JSON string:", parseError);

return NextResponse.json(
{ error: "Invalid Conversation Format", details: "Conversation data is not valid JSON." },

{ status: 400 } // HTTP 400 Bad Request

 );

 }



// 4. Format the parsed conversation into a human-readable transcript for the AI

 // Vapi's message.conversation typically has 'role' and 'content' keys for each turn.

 const formattedConversationForAI = parsedConversation.map(turn => {

// Ensure you're accessing 'content' which holds the actual speech text

 const speaker = turn.role === 'user' ? 'User' : (turn.role === 'assistant' ? 'Assistant' : turn.role);

 return `${speaker}: ${turn.content}`;

 }).join('\n'); // Join each turn with a newline for readability by the AI



// 5. Replace the placeholder in the feedback prompt with the formatted transcript

const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', formattedConversationForAI);

console.log("--- Formatted Conversation sent to AI ---");

console.log(formattedConversationForAI); // Log to verify the content

console.log("--- End Formatted Conversation ---");

console.log("--- FINAL_PROMPT sent to AI ---");

console.log(FINAL_PROMPT); // Log the full prompt

console.log("--- End FINAL_PROMPT ---");



// 6. Initialize OpenAI client

const openai = new OpenAI({

 baseURL: "https://openrouter.ai/api/v1",

 apiKey: process.env.OPENROUTER_API_KEY, // Ensure this environment variable is set correctly

});



// 7. Create chat completion request

const completion = await openai.chat.completions.create({

 model: "google/gemma-3n-e4b-it:free", // Verify this model name with OpenRouter's documentation

 messages: [

{ role: "user", content: FINAL_PROMPT }

 ],

 temperature: 0.7, // Add temperature for consistent output, though 0 might be better for strict JSON

});



// 8. Extract AI's response message

const aiResponse = completion.choices[0].message;

console.log("AI Completion Raw Response:", aiResponse);



// --- START FIX: Clean the AI's response before parsing ---

let cleanedResponse = aiResponse.content.trim();



// Remove markdown code blocks if present

// This regex handles '```json' or '```' at the start and '```' at the end

cleanedResponse = cleanedResponse.replace(/^```(?:json\s*)?/, '').replace(/```$/, '').trim();



console.log("Cleaned Response for JSON parsing:", cleanedResponse);

// --- END FIX ---



// 9. Attempt to parse the AI's content if it's expected to be JSON string

try {

 const parsedAiResponseContent = JSON.parse(cleanedResponse); // Use the cleaned response

 return NextResponse.json(parsedAiResponseContent); // Return the parsed JSON object

} catch (jsonParseError) {

 console.error("Error parsing AI response content as JSON:", jsonParseError);

 console.error("AI Raw Content (after cleaning):", cleanedResponse); // Log the cleaned content

 // If AI doesn't return valid JSON, handle gracefully

 return NextResponse.json(

{

 error: "AI did not return valid JSON.",

 aiRawResponse: aiResponse.content, // Still include original raw response for full context

 cleanedRawResponse: cleanedResponse // Include the cleaned response for debugging

},

{ status: 500 }

 );

}



 } catch (e) {

console.error("Caught error in /api/ai-feedback:", e);



if (e.response) {

 console.error("External API Response Data:", e.response.data);

 console.error("External API Response Status:", e.response.status);

 console.error("External API Response Headers:", e.response.headers);

}



return NextResponse.json(

 {

error: "Internal Server Error",

details: e.message || "An unknown error occurred during AI feedback generation."

 },

 { status: 500 }

);

 }

}