# Caloriq - Calorie Tracking PWA

**Caloriq** is a lightweight, privacy-focused Progressive Web App (PWA) for tracking your daily calorie and macronutrient intake. It uses the power of Google's Gemini AI to instantly analyze photos of your meals and provide detailed nutritional information.

## Features

*   **AI-Powered Meal Logging:** Snap a photo of your food, and Caloriq will identify it and estimate its calories, protein, carbs, and fat.
*   **Barcode Scanning:** Quickly log packaged foods by scanning their barcodes.
*   **PWA Support:** Install Caloriq on your phone's home screen for a native-app-like experience.
*   **Privacy First:** All your data is stored locally on your device.
*   **Customizable Goals:** Set your own daily calorie and macro targets.
*   **Dark Mode:** Easy on the eyes, day or night.

## Deployment

You can deploy this application to Vercel with the following steps:

1.  **Fork this repository.**
2.  **Create a new project in Vercel** and connect it to your forked repository.
3.  **Set the Environment Variable:**
    *   In your Vercel project settings, go to **Settings > Environment Variables**.
    *   Add a new variable named `GEMINI_API_KEY` and paste your Gemini API key as the value.
4.  **Deploy:** Vercel will automatically build and deploy your application.
