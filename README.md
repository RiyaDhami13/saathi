# saathi
first

Web application that helps families in Sudurpaschim province to find immediate medical services and understand prescriptions and services.

# SUDUR SAATHI

**An AI-Powered Document Reading and Explanation Platform**

## 1. Introduction

Sudur Saathi is an AI-powered application designed to help users read, understand, and interpret documents more easily.

The project aims to use Artificial Intelligence to process document information and provide clear, understandable explanations to users.

## 2. Problem Statement

Many people face difficulties understanding information contained in documents, particularly when the language or terminology is complex.

Understanding important information can be time-consuming and challenging.

Sudur Saathi aims to address this problem through AI-powered document reading and explanation.

## 3. Objectives

The main objectives of Sudur Saathi are:

- To simplify document understanding using Artificial Intelligence.
- To extract relevant information from uploaded documents.
- To generate clear and understandable explanations.
- To provide an accessible and user-friendly interface.
- To integrate multiple AI providers for processing requests.

## 4. Key Features

The following features are planned or being developed:

- AI-powered document reading.
- Automatic information extraction.
- AI-generated explanations.
- Multiple AI provider integration.
- Error handling and provider fallback.
- User-friendly interface.

*Note: Update this section to reflect the features that are actually implemented.*

## 5. Technologies Used

| Technology | Purpose |

|Next.js- Application framework |
| TypeScript- Type-safe programming |
| Tailwind CSS- User interface styling |
| Gemini API- AI processing |
| Groq API- AI processing |
| Cohere API- AI processing |
| Git and GitHub- Version control and collaboration |

## 6. Project Structure

sudur-saathi/
│
├── app/
│   └── api/
│       ├── explain/
│       └── read-documents/
│
├── lib/
│   ├── ai.ts
│   ├── prompts.ts
│   ├── types.ts
│   └── mock-data.ts
│
├── public/
│
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

## 7. Installation and Setup

### Prerequisites

- Node.js
- npm
- Visual Studio Code
- Git

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Open the Project

```bash
cd sudur-saathi
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment Variables

Create a `.env.local` file in the root directory.

Add the API keys required by the project.

Never share API keys publicly or commit `.env.local` to GitHub.

### Step 5: Run the Development Server

```bash
npm run dev
```

Open the following address in your browser:

```text
http://localhost:3000
```

## 8. AI Integration

Sudur Saathi uses multiple AI providers:

- Google Gemini
- Groq
- Cohere

The AI integration layer is organized into separate modules:

- `types.ts`: Defines data structures and TypeScript types.
- `prompts.ts`: Contains instructions given to AI models.
- `ai.ts`: Handles AI provider communication and processing.
- `mock-data.ts`: Contains sample or fallback data.

## 9. Error Handling

The application should handle common API errors, including:

- 400 – Bad Request
- 401 – Unauthorized
- 429 – Rate Limit Exceeded
- 503 – Service Unavailable

Provider fallback and retry mechanisms should be documented according to their actual implementation.

## 10. Team Contributions

Add the names and responsibilities of all team members here.

## 11. Future Improvements

- Improve AI response accuracy.
- Enhance document processing.
- Improve application performance.
- Expand language support.
- Strengthen error handling and reliability.

## 12. License

Add the project's chosen license here.

---

**Developed as a Hackathon Project – Sudur Saathi**
