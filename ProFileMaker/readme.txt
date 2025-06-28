ProFileMaker - README.txt

==========================
ProFileMaker Setup & Usage
==========================

Thank you for choosing ProFileMaker! This file will help you get started.

--------------------------
1. Requirements
--------------------------
- Node.js v16 or higher
- npm or yarn
- A Firebase project (for authentication, Firestore, and Storage)
- A modern web browser

--------------------------
2. Installation
--------------------------
1. Unzip the project and open a terminal in the 'code' folder.
2. Install dependencies:
   npm install
   (or)
   yarn

3. Create a .env file in the 'code' folder with your Firebase config:
   (Get these values from your Firebase Console > Project Settings > General > Your apps)

   Example:
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id

--------------------------
3. Running the Project
--------------------------
1. In the 'code' folder, start the development server:
   npm run dev
   (or)
   yarn dev

2. Open your browser and go to http://localhost:3000

--------------------------
4. Features
--------------------------
- Build and edit your professional portfolio
- Upload an avatar and project images
- Choose from free and deluxe templates
- Showcase your skills, experience, and contact info
- Deluxe users can unlock all premium templates for a one-time $19.99 fee

--------------------------
5. Payment & Deluxe Templates
--------------------------
- Regular users: Free access to standard templates and features.
- Deluxe users: One-time $19.99 fee unlocks all deluxe templates and future deluxe template updates.
- Payment is handled securely in-app.

--------------------------
6. Bug Handling & Support
--------------------------
- Bug fixes are always free for all users (regular and deluxe).
- If you encounter any bugs or issues, contact our support team via the app or by email.
- We aim to resolve reported bugs within 3 business days.

--------------------------
7. Notes
--------------------------
- Make sure your Firebase Firestore and Storage rules are set up as described in the documentation.
- For any setup or usage issues, please contact support.

--------------------------
Enjoy building your portfolio with ProFileMaker!