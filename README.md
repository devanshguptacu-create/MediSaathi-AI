# MediSaathi AI 🩺

**An AI-powered healthcare assistance prototype designed to make health information and document access simpler.**

## 🌐 Project Links

- **Live Demo:** https://devanshguptacu-create.github.io/MediSaathi-AI/
- **GitHub Repository:** https://github.com/devanshguptacu-create/MediSaathi-AI

## 📌 About the Project

MediSaathi AI is a healthcare-focused web prototype that aims to make accessing health-related information more convenient. It provides a simple dashboard and a PDF document-reading feature, with a demo database integration planned to support sample records.

The project is a prototype for demonstration and educational purposes, not a substitute for professional medical advice.

## ✨ Features

- **Dashboard Interface:** A central interface for accessing project features.
- **PDF Document Reading:** Extracts text from supported PDF documents using PDF.js.
- **Demo Records Integration:** Designed to retrieve sample records from Supabase.
- **Web-Based Access:** Built with HTML, CSS and JavaScript.
- **Responsive Development Approach:** Designed for convenient browser access.

> Note: Supabase connectivity is still being tested. Features may be limited in the current demo.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- PDF.js
- Supabase
- Git and GitHub Pages

## 🚀 Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/devanshguptacu-create/MediSaathi-AI.git
   ```

2. Open the project folder:

   ```bash
   cd MediSaathi-AI
   ```

3. Open `index.html` using VS Code with the Live Server extension, or use another local web server.

4. Open the local URL provided by your server in a browser.

## 🗄️ Database Setup

The prototype uses Supabase for sample demo records.

To configure your own instance:

1. Create a Supabase project.
2. Create a `public.demo_records` table with the fields required by the application.
3. Configure appropriate Row Level Security (RLS) policies.
4. Add the project URL and publishable key to the frontend configuration.
5. Test the connection before deploying.

**Security:** Never expose a Supabase secret/service-role key in frontend code. Use only a publishable key with appropriately configured database permissions.

## 🔮 Future Improvements

- Complete and verify database connectivity.
- Improve PDF text extraction and document handling.
- Add better loading, error and empty states.
- Improve accessibility and mobile usability.
- Explore responsible AI-assisted health information features.
- Strengthen privacy and security before handling any sensitive data.

## ⚠️ Disclaimer

MediSaathi AI is an educational prototype. It does not provide a medical diagnosis and should not be used as a replacement for qualified healthcare professionals. Use synthetic demo data only; do not upload real patient information.

## 👨‍💻 Project Information

**Project:** MediSaathi AI  
**Repository:** [devanshguptacu-create/MediSaathi-AI](https://github.com/devanshguptacu-create/MediSaathi-AI)

Built as a prototype exploring how web technologies can support more accessible healthcare experiences.