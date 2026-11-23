#  Sudur Saathi
### Your Digital Companion for Accessible Healthcare

**Sudur Saathi** is an AI-powered healthcare accessibility platform designed to help people and families in Sudurpashchim Province, Nepal, access healthcare information more easily.

Finding the right healthcare facility and understanding medical prescriptions can be challenging, especially when reliable information is difficult to access. Sudur Saathi aims to bridge this gap through AI-assisted prescription understanding, healthcare facility discovery, and a simple, accessible web experience.

 **Live Demo:** https://sudur-saathi.vercel.app/  
 **GitHub Repository:** https://github.com/RiyaDhami13/saathi

---

##  The Problem

Many people in Sudurpashchim face difficulties when accessing and understanding healthcare information.

Some common challenges include:

- Difficulty finding nearby healthcare facilities and available medical services.
- Trouble understanding medical prescriptions and medical terminology.
- Limited access to understandable healthcare information in local languages.
- Difficulty finding emergency healthcare contact information.

These challenges can delay access to appropriate healthcare services.

##  Our Solution

Sudur Saathi brings essential healthcare information into one accessible digital platform.

It combines AI-assisted document reading, understandable medical explanations, and healthcare facility information to help users make more informed decisions about their healthcare needs.

Our goal is to make healthcare information easier to find, understand, and access.

##  Key Features

###  1. Emergency Access
- Quick access to emergency healthcare information.
- Easy navigation to emergency-related services.

###  2. AI-Powered Prescription Understanding
- Upload prescription images or supported text documents.
- Extract important medical information using AI.
- Identify medicines, medical tests, and instructions.
- Generate easy-to-understand explanations.

###  3. Multilingual Support
- English and Nepali language support.
- Designed to make healthcare information more understandable for local communities.

###  4. Healthcare Facility Discovery
- Explore healthcare facilities.
- Search and filter facilities by district.
- Access available facility information and contact details.
- Explore medical specialties and services.

###  5. Accessible User Interface
- Simple and user-friendly design.
- Clear navigation and readable interface.
- Designed with accessibility and ease of use in mind.

##  Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Full-stack web application framework |
| React | User interface |
| TypeScript | Type-safe development |
| Tailwind CSS | Responsive styling |
| Supabase | Database and backend services |
| Google Gemini API | AI-powered document processing |
| Groq API | AI model integration |
| Cohere API | AI text processing |
| Vercel | Application deployment |
| Git & GitHub | Version control and collaboration |

##  How It Works

### Prescription Understanding Workflow

1. The user uploads a prescription image or supported text document.
2. The application validates the uploaded file.
3. The AI integration processes the document.
4. Important medical information is extracted and categorized.
5. The user can review the extracted information.
6. AI generates simple explanations and relevant safety reminders.

### Healthcare Facility Discovery Workflow

1. The user opens the healthcare facility section.
2. The user searches for facilities or selects a district.
3. The application retrieves relevant facility information.
4. The user explores available contact information and medical services.

##  Project Structure

```text
saathi/
│
├── app/
│   ├── api/
│   │   ├── care/
│   │   ├── explain/
│   │   ├── facilities/
│   │   ├── facility-list/
│   │   └── read-document/
│   │
│   ├── care/
│   ├── confirm/
│   ├── emergency/
│   ├── explain/
│   ├── page.tsx
│   └── layout.tsx
│
├── components/
├── docs/
├── lib/
├── mocks/
├── public/
├── .env.example
├── package.json
└── README.md
```

##  Getting Started

Follow these steps to run Sudur Saathi locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/RiyaDhami13/saathi.git
```

### 2. Navigate to the Project

```bash
cd saathi
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory.

Add the required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://vpibxsgztbiydyfvaqzf.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_Y5xRwOEqbHHsM26-19UHOg_EsFcfskj

AI_PROVIDER=gemini

GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
COHERE_API_KEY=your_cohere_api_key
```

Configure the API keys for the services you intend to use.

**Important:** Never share or upload your private API keys to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Open the Application

Visit:

```text
http://localhost:3000
```

##  Healthcare Safety

Healthcare information must be handled responsibly.

Sudur Saathi is designed as an informational support platform, not a replacement for professional medical advice.

- AI-generated explanations are intended to help users understand medical terminology.
- The platform does not replace a doctor's diagnosis.
- Users should confirm medical instructions with qualified healthcare professionals.
- AI-generated information should not be used independently to change medication or treatment.

##  Our Vision

We envision a future where everyone can access understandable healthcare information regardless of their location or technical knowledge.

Through technology and AI, Sudur Saathi aims to contribute to a more accessible and informed healthcare experience for communities in Sudurpashchim and beyond.

##  Hackathon

**Developed for INNEX 2026**

Project Category: Health

Project Domain: Healthcare Accessibility

Built with teamwork, creativity and a vision to make healthcare information more accessible.

##  Team

**Freshers**

Developed collaboratively by a team of student innovators for INNEX 2026.

-Riya Dhami
-Sugam Joshi
-Jyoti Bhatt
-Kapil Bohara

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Sudur Saathi – Making Healthcare Information Accessible to Everyone. **
