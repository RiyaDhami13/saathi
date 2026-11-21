import OpenAI from "openai";
import {
    MOCK_READ_ITEMS,
    MOCK_EXPLANATION,
} from  "./mock-data";

import {
    READ_ITEMS_PROMPTS,
    EXPLANATION_PROMPT,
} from "./prompts";


// Create the OpenAI client only when an API key exists.

const apiKey = process.env.OPENAI_API_KEY;

const openai = apiKey
  ? new OpenAI({apiKey})
  :null;
 

  const MODEL = "gpt-4.1-mini"; // ai model
  const TIMEOUT = 10_000;
  const MAX_RETRIES = 1;


  //generic helper for Ai requests.

  async function requestAI<T>(
    prompt: string,
    data: unknown,
    fallback:T
  ): Promise<T> {
    if (!openai){
        console.warn("OpenAI API key missing. Using mock data.")
        return fallback;
    }
// Initial attempt plus one try
for (let attempt = 0; attempt <=MAX_RETRIES;attempt++) {
    const controller = new AbortController();

    const timeoutID = setTimeout(()=>{controller.abort();},TIMEOUT);

    try {
        const response = await openai.responses.create(
            {
                model:MODEL,
                instructions:prompt,
                input: JSON.stringify(data),

            },
            {
                signal: controller.signal,
            }
        );

        const result = response.output_text;

        if (!result){
            throw new Error("AI returned an empty response.");
        }

        return JSON.parse(result) as T;
    } catch (error) {
        console.error(
            `AI request attempt ${attempt = 1} failed:`,
            error
        );

        //retry once,then use fallback.

        if (attempt===MAX_RETRIES) {
            console.warn("AI unavailable.Using mock data.");
            return fallback;
        }
    }finally {
        clearTimeout(timeoutID);
    }
  }
  return fallback;
  }

  // Generate reading items.
  export async function generateReadItems(data: unknown){
    return requestAI(
        "READ_ITEMS_PROMPTS",
        data,
        MOCK_READ_ITEMS
    );
  }

  // generate an explanaton.

  export async function generateExplanation(data: unknown) {
    return requestAI(
        EXPLANATION_PROMPT,
        data,
        MOCK_EXPLANATION
    );
  }
  
