# RiddlesNet

RiddlesNet is a React web application that generates riddles using AI (Google Gemini API) and allows the user to guess the answers.

## Features
- Get a random riddle in English
- Enter and check your answer
- Show the correct answer after an attempt
- Modern interface using SCSS

## Screenshot
![RiddlesNet interface screenshot](readme-screenshot.png)

## Installation and Launch

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ByteMe6/riddles-net](https://github.com/ByteMe6/riddles-net)
   cd RiddlesNet
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create an environment variables file:**
   In the root of the project, create a `.env` file and add your Gemini API key:
   ```env
   VITE_API_KEY=your_Gemini_API_key
   ```
4. **Run the project:**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:5173](http://localhost:5173) (or another address shown in the console).

## Requirements
- Node.js >= 16
- NPM >= 7
- Access to Google Gemini API (API key required)

## SCSS
To support SCSS, make sure the `sass` package is installed:
