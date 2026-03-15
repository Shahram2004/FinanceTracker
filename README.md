# 💰 FinanceTracker

An AI-powered personal finance tracker built with React Native and Expo, now deployed as a web app on Vercel.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://financetracker-mu-nine.vercel.app)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)

## 🚀 Live Demo

Check out the live web application: **[https://financetracker-mu-nine.vercel.app](https://financetracker-mu-nine.vercel.app)**

## ✨ Features

- 📊 **Dashboard** — Real-time balance, income & expense overview.
- 🔐 **Authentication** — Secure user login and signup powered by **Firebase Auth**.
- ➕ **Add Transactions** — Log income and expenses with categories and descriptions.
- 📈 **Charts & Reports** — Visual spending breakdown by category and daily bar charts using `react-native-chart-kit`.
- 🤖 **AI Financial Advisor** — Personalized money advice powered by **Groq API (Llama 3)**.
- 🌓 **Theme Support** — Seamless switching between light and dark modes.
- 📱 **Responsive Design** — Optimized for both mobile (via Expo) and web (via Vercel).

## 🛠️ Tech Stack

- **Frontend:** React Native + Expo (Expo Router for file-based navigation)
- **Web Deployment:** Vercel
- **Authentication:** Firebase Authentication
- **AI Integration:** Groq API (Llama 3)
- **Data Visualization:** React Native Chart Kit & SVG
- **Styling:** React Native StyleSheet with Theme Context

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Shahram2004/FinanceTracker.git
cd FinanceTracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your credentials:
```env
EXPO_PUBLIC_GROQ_API_KEY=your_groq_api_key
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the application
- **Web:** `npm run web`
- **iOS:** `npx expo start --ios`
- **Android:** `npx expo start --android`

## 📱 Screens

| Screen | Description |
|---|---|
| 🔐 Login | Secure access to your financial data |
| 🏠 Dashboard | Balance overview and recent transactions |
| ➕ Add Transaction | Log income or expenses with category |
| 📊 Reports | Spending charts and category breakdown |
| 🤖 AI Advisor | Chat with AI for financial advice |

## 📄 License

MIT License
