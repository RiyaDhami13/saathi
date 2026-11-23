1. Project overview
Sudur Sathi is a web application designed to help families in Sudurpaschim Province, Nepal, access medical services and understand medical prescriptions and healthcare-related information.

According to the repository description, the project focuses on two main problems:
1. Helping families find immediate medical services.
2. Helping people understand prescriptions and medical services.
The overall goal is to make healthcare information more accessible and understandable for local communities.
2. Project objectives
- Improve access to healthcare service information.
- Help users understand medical prescriptions.
- Make healthcare-related information easier to understand.
- Provide a simple and accessible web interface.
- Use AI-assisted functionality to support information processing, where implemented.
The first four points describe the project's intended goals; specific AI capabilities will be documented based on the actual source code.
3. Technology stack
The repository README identifies the following technologies:
Technology	Role in Sudur Sathi
Next.js	Frontend and backend application framework
TypeScript	Type-safe application development
Tailwind CSS	User interface styling
Google Gemini API	AI-based content processing
Groq API	AI model processing
Cohere API	AI model processing
Git and GitHub	Version control and team collaboration

The README also describes the project as an AI-powered document reading and explanation platform. 
GitHub

4. Main functional modules
The documented project features can be organized into these modules:
4.1 AI document reading
Purpose:
- Accept document content.
- Process the content using AI.
- Extract relevant information.
- Help users understand the contents.
4.2 AI explanation
Purpose:
- Receive text or information from the user.
- Send appropriate instructions to an AI provider.
- Generate explanations in understandable language.
4.3 AI provider integration
The project identifies three AI providers:
- Google Gemini
- Groq
- Cohere
The intended architecture supports multiple AI providers, error handling, and provider fallback. The exact provider selection and fallback implementation still need source-code verification. 
GitHub

4.4 Healthcare facility data
The TypeScript definitions also include a healthcare facility structure.

A facility record contains:
Field	Data type	Description
id	String	Unique facility identifier
name	String	Healthcare facility name
district	String	Kanchanpur or Kailali
phone	String	Contact number
emergency_24h	Boolean	Whether 24-hour emergency service is available
specialties	String array	Medical specialties
lat	Number	Latitude
lng	Number	Longitude
distanceKm	Number (optional)	Distance from the user

This is an important data structure for locating healthcare facilities. However, the presence of this interface alone does not prove that live facility search or distance calculation is implemented. 
GitHub

5. Detailed backend architecture
I inspected the repository's actual API and AI integration code. The following describes the implementation visible in the source, rather than just the README.
5.1 Document reading API
Verified in source code
Endpoint:

POST /api/read-document

This API accepts an uploaded file.

Input data:
- File object.
- File MIME type.
- File size.
- File contents.
Supported formats in the route:
- Image files.
- Text files.
Validation rules:
- File must be provided.
- File must be an image or text file.
- Maximum file size is 4 MB.
Processing:
1. Receives the uploaded file.
2. Checks its format and size.
3. Sends it to the document-reading function.
4. Extracts relevant text.
5. Returns the extracted items as JSON.
Example response structure:
{
  "items": [
    {
      "id": "1",
      "text": "Paracetamol",
      "type": "medicine"
    },
    {
      "id": "2",
      "text": "Blood test",
      "type": "test"
    }
  ]
}


The example illustrates the response structure, not actual output from a live request.

Source: app/api/read-document/route.ts and lib/aiAdapter.ts. 
GitHub+1

5.2 Explanation API
Verified in source code
Endpoint:

POST /api/explain

This API receives extracted medical information and generates explanations.

Input data:
- items: Array of medical information.
- id: Unique identifier for each item.
- text: Text that needs explanation.
- type: Category of the item.
- lang: Language selection.
Supported item categories:
Category	Meaning
medicine	Medicine names
test	Medical tests
instruction	Instructions written on prescriptions
other	Other medical information

Supported language values:
- en – English
- ne – Nepali
Validation rules:
- At least one item is required.
- Maximum 20 items per request.
- Each item must have a valid string ID and non-empty text.
- Each item's text must not exceed 500 characters.
- Invalid item types are converted to other.
- An unsupported language value defaults to English.
Processing:
1. Receives the extracted information.
2. Validates the incoming JSON.
3. Identifies the language.
4. Passes the items to the AI adapter.
5. Generates simple explanations.
6. Returns the explanation and safety disclaimer.
Example response:
{
  "summary": "This document contains medical information.",
  "items": [
    {
      "id": "1",
      "plain": "Explanation in simple language.",
      "doctorNote": "Ask your doctor or pharmacist to confirm this."
    }
  ],
  "disclaimer": "This only explains words. It does not diagnose or change treatment."
}


Source: app/api/explain/route.ts and lib/aiAdapter.ts. 
GitHub+1

6. AI integration architecture
Your project has a dedicated AI integration module named lib/kapilAi.ts.

It supports three AI providers.
AI provider architecture
AI processing layer

lib/kapilAi.ts

Selects a provider using AI_PROVIDER

Gemini

Text and image


Groq

Text and image


Cohere

Text only



The code selects one configured provider. It does not demonstrate automatic switching to another provider after a failure.

6.1 Google Gemini
- Uses the Google GenAI SDK.
- Reads GEMINI_API_KEY.
- Processes text and image inputs.
- Used for reading images of prescriptions and lab reports.
6.2 Groq
- Uses the Groq chat completions API.
- Reads GROQ_API_KEY.
- Supports text and image input in the implementation.
- Sends requests through an HTTP POST request.
6.3 Cohere
- Uses the Cohere chat API.
- Reads COHERE_API_KEY.
- Supports text processing.
- Image reading is not enabled for this provider.
6.4 Provider selection
The application reads:
AI_PROVIDER=gemini


Possible values:
AI_PROVIDER=gemini
AI_PROVIDER=groq
AI_PROVIDER=cohere


Only one provider is selected by this configuration at a time. Missing API keys and provider errors result in errors rather than a demonstrated automatic fallback. 
GitHub

7. Document processing workflow
The actual AI module performs two major operations.

Operation 1: Read document
- Accepts text or an image.
- Extracts the document's contents.
- For images, sends the image to the configured AI provider.
- Instructs the model to extract medicine names, tests, and written instructions.
- Avoids extracting patient names, addresses, phone numbers, and other personal details.
- Returns extracted content.
Operation 2: Explain document
- Receives extracted items.
- Sends them to the AI model with specific instructions.
- Requests a short summary.
- Generates an explanation for every item.
- Requests a safety reminder.
- Parses the AI response as JSON.
The implementation also includes validation to check whether the AI response has the expected structure. 
GitHub

8. Data structures and types
The lib/types.ts file defines the application's core data structures.
8.1 Language type
export type Lang = "ne" | "en";


The application recognizes English and Nepali as language options.
8.2 Zoom scale
export type ZoomScale = "A" | "A+" | "A++";


Represents three text-size or zoom levels.
8.3 ReadItem interface
export interface ReadItem {
  id: string;
  text: string;
  type: "medicine" | "test" | "instruction" | "other";
}


Stores information extracted from prescriptions or laboratory reports.
8.4 ExplainResponse interface
export interface ExplainResponse {
  summary: string;
  items: {
    id: string;
    plain: string;
    doctorNote: string;
  }[];
  disclaimer: string;
}


Stores the AI-generated explanation and safety information.
8.5 Facility interface
Stores healthcare facility information, including location, contact number, emergency availability, and specialties.

These structures are defined in the repository's TypeScript types. 
GitHub

9. Complete application workflow
The following diagram represents the main document-reading and explanation workflow based on the inspected implementation.
Step 1 – User uploads document

Prescription image or text file


Step 2 – Document API

POST /api/read-document

Checks file type and size


Step 3 – AI document reading

readDocumentAsItems()

Extracts and classifies document text


Step 4 – Extracted information

Medicine · Test · Instruction · Other


Step 5 – Explanation API

POST /api/explain

Validates and forwards extracted items


Step 6 – AI explanation

explainItems()

Generates a summary and explanations


Step 7 – Final result

Simple explanations and medical safety disclaimer


10. Medical safety and error handling
This is particularly important because Sudur Sathi works with medical documents.

The AI instructions explicitly prohibit:
- Diagnosing diseases.
- Recommending medicine doses.
- Advising users to start or stop medicines.
- Changing existing treatments.
The application instructs users to confirm medical information with a doctor or pharmacist.
API error responses
HTTP status	Meaning
400	Invalid request or missing items
413	Uploaded file exceeds the size limit
415	Unsupported file format
502	Document reading or AI processing failure

The explanation endpoint also returns a 502 response if its processing fails. 
GitHub+2

11. Installation and execution
The repository README provides the following setup procedure.

Requirements:
- Node.js
- npm
- Git
- Visual Studio Code
Step 1 – Clone the repository
git clone https://github.com/RiyaDhami13/saathi.git


Step 2 – Enter the project directory
cd saathi


Step 3 – Install dependencies
npm install


Step 4 – Configure environment variables

Create a .env.local file in the root directory.

The AI integration code requires these variables:
AI_PROVIDER=gemini

GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
COHERE_API_KEY=your_cohere_api_key


Only configure the API key for the provider you intend to use.

Never upload real API keys to GitHub.

Step 5 – Start the development server
npm run dev


Step 6 – Open the application
http://localhost:3000



GitHub+1
12. Current implementation versus future scope
It is important to distinguish between implemented functionality and planned functionality.
Functionality	Evidence from inspected source
AI document reading	Implemented
Image-based prescription reading	Implemented
Text-file reading	Implemented
Medical item classification	Implemented
AI-generated explanations	Implemented
Gemini integration	Implemented
Groq integration	Implemented
Cohere integration	Implemented for text
English/Nepali safety messages	Implemented
Automatic provider fallback	Not demonstrated
PDF document upload	Not supported by the inspected upload route
Healthcare facility search	Data type exists; full implementation not verified
Database and user authentication	Not established by inspected source

The README itself describes several features as planned or being developed, so it should not be treated as proof that every listed feature is complete. 
GitHub+3

13. Important observations and recommended improvements
After reviewing the available repository documentation and backend source, I noticed a few areas worth addressing.
13.1 Nepali explanation support
Although the API accepts Nepali (ne) and English (en), the actual AI explanation prompt does not appear to receive the selected language. The adapter localizes the doctor note and disclaimer, but the generated explanation itself is not explicitly instructed to use Nepali.

Recommendation: Pass the selected language into the AI explanation prompt.
13.2 Document format support
The inspected upload endpoint supports images and text files, with a 4 MB maximum size.

Recommendation: Add PDF support if users need to upload scanned or digital prescriptions in PDF format.
13.3 Healthcare facility information
The Facility interface already defines useful information about local healthcare facilities.

Recommendation: Develop a facility directory with:
- Hospital and health post names.
- District and location.
- Contact information.
- Emergency availability.
- Medical specialties.
- Map-based facility discovery.
13.4 AI reliability
Recommendation:
- Add provider fallback.
- Improve handling of unclear prescription images.
- Validate AI-generated explanations.
- Handle missing and incomplete information.
- Clearly identify uncertain extracted text.
13.5 Medical data privacy
Since users may upload prescriptions and laboratory reports, the application should protect sensitive information.

Recommended improvements include:
- Avoid storing uploaded medical documents unnecessarily.
- Avoid logging personal medical information.
- Protect API keys.
- Use secure data transmission.
- Establish a clear document retention policy.

14. Project conclusion
Sudur Sathi is an AI-assisted healthcare information platform that aims to reduce the difficulty people face when understanding medical documents.

Its central technical workflow combines document reading, information extraction, medical-item classification, and AI-generated explanations.

The use of multiple AI providers provides flexibility, while TypeScript interfaces help maintain consistent data structures.

The project has potential to improve access to understandable healthcare information, particularly for families in Sudurpaschim Province.

The application should be treated as an informational support tool, not a replacement for professional medical advice.

15. Reference links
Resource	Link
GitHub repository	Source code
README	Project README
AI integration	AI module
AI adapter	AI adapter
API explanation	Explanation API
Document API	Document reading API
Data types	TypeScript types


16. One important clarification about your project files
Your earlier VS Code screenshot shows read/route.ts and read-documents/route.ts, whereas the current GitHub source I inspected contains read-document/route.ts.

The GitHub repository also has folders such as components, docs, and mocks that aren't visible in your screenshot.

Therefore, the documentation above is based on the accessible GitHub version, not necessarily every change in your local working copy.
