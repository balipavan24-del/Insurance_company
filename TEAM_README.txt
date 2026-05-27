InsureEase — Team project package
===============================

1) Open the "insurance" folder in this zip.

2) Install & run frontend:
   npm install
   copy .env.example .env
   npm run dev
   Browser: http://localhost:5173/

3) Important pages:
   /              Home
   /signup        Create account (start backend work here)
   /login         Login (OTP demo: 1234)

4) Backend handoff:
   - InsureEase_Folder_Structure_and_Routes.pdf
   - InsureEase_Signup_Validation_Logic.pdf  (signup rules — separate)
   - Code: src/utils/validations/leadValidation.js
   - Routes: src/App.jsx

5) First API to build (Spring Boot):
   POST /api/v1/auth/create-account
   Body JSON: fullName, mobileNumber, email, password

6) Connect frontend when API is ready:
   In .env set: VITE_API_BASE_URL=http://localhost:8080
   Restart: npm run dev

7) Excluded from zip (install locally):
   node_modules, dist, .vercel, .env

Questions: contact your team lead.
