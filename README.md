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
NEXT_PUBLIC_SUPABASE_URL=Our_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=Our__supabase_publishable_key

AI_PROVIDER=gemini

GEMINI_API_KEY=Our_gemini_api_key
GROQ_API_KEY=Our_groq_api_key
COHERE_API_KEY=Our_cohere_api_key
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

## &#x20;Project Progress: Planned vs. Achieved

During INNEX 2026, our team aimed to build Sudur Saathi as an accessible healthcare platform for people in Sudurpashchim Province, Nepal.

We worked toward our planned features within the limited hackathon development period.

### What We Planned and Achieved

| Planned Feature               | Achievement                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| Healthcare web platform       | Developed the main web application and user interface.                                        |
| Healthcare facility discovery | Implemented healthcare facility search and listing functionality.                             |
| Database integration          | Set up Supabase with PostgreSQL to store and manage healthcare information.                   |
| AI-powered document reading   | Implemented an AI-based prescription/document reading workflow.                               |
| AI medical explanations       | Developed an AI-powered feature to explain extracted medical information in simpler language. |
| Multilingual accessibility    | Started building English and Nepali language support.                                         |
| Emergency access              | Added an emergency access option to the application.                                          |

### Planned Features We Could Not Fully Complete

Due to the limited 48-hour hackathon development period, technical challenges, and time constraints, some planned features could not be completed to the level we originally intended.

| Incomplete Feature                            | Reason / Current Status                                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- |
|                                               |                                                                                             |
| Fully functional multilingual experience      | Language support requires further implementation and testing across the entire application. |
| Comprehensive facility and doctor information | More complete and verified healthcare records are needed.                                   |
|                                               |                                                                                             |
|                                               |                                                                                             |



## Future Development Roadmap

Sudur Saathi is not intended to stop at the hackathon prototype. We want to continue improving it into a practical healthcare accessibility platform.

### Features We Plan to Add

**1. Improved Multilingual Support**

- Complete English and Nepali language support.
- Explore voice-based interaction.
- Make healthcare information easier to understand for local communities.

**2. Advanced Healthcare Directory**

- Add more verified hospitals, clinics, pharmacies, and healthcare professionals.
- Include doctor availability, specialties, contact details, and service information.
- Improve location-based facility discovery.

**3. AI-Powered Healthcare Assistance**

- Improve prescription and medical document reading.
- Provide clearer explanations of medical terms.
- Add support for more document formats and regional languages.
- Include stronger medical safety checks and reminders.

**4. Emergency Assistance Improvements**

- Provide easier access to emergency contact information.
- Add location-aware emergency facility discovery.
- Explore directions to nearby healthcare facilities.

**5. User Accounts and Personalization**

- Allow users to save useful healthcare facilities.
- Maintain personal preferences and language settings.
- Explore secure storage of health-related documents with user consent.

**6. Reliability and Accessibility**

- Improve mobile responsiveness.
- Optimize performance for slower internet connections.
- Conduct usability testing with people from different communities.
- Strengthen data protection and application security.

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

##  Team Members & Contributions

Sudur Saathi was developed by a team of four members for **INNEX 2026**. Each member contributed to a different part of the project.

| Team Member | Role | Key Contributions |
|---|---|---|
| **Sugam Joshi** | Database Management | Designed and managed the healthcare database using Supabase and PostgreSQL; organized healthcare facility and doctor records; worked on database security and integration with the application. |
| **Riya Dhami** | Frontend Development | Worked on the user interface, responsive web design, accessibility, and user experience. |
| **Kapil Bohara** | AI Integration | Worked on AI-powered prescription/document reading, medical information explanations, and multilingual AI functionality. |
| **Jyoti Bhatt** | Testing, Safety & Presentation | Contributed to application testing, checking functionality, reviewing safety considerations, and preparing the project presentation. |


##  License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Sudur Saathi – Making Healthcare Information Accessible to Everyone. **
