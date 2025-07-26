# Setup Guide for Prompt Architect

## Prerequisites

You need to install Node.js and npm first:

1. **Download Node.js**: Go to https://nodejs.org/ and download the LTS version
2. **Install Node.js**: Run the installer (this will also install npm)
3. **Verify installation**: Open a new terminal and run:
   ```bash
   node --version
   npm --version
   ```

## Setup Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up your Gemini API key**:
   - Get a Gemini API key from Google AI Studio: https://makersuite.google.com/app/apikey
   - Replace `PLACEHOLDER_API_KEY` in `.env.local` with your actual API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

## Deployment

After running `npm run build`, you'll have a `dist` folder containing all the static files ready for deployment to any web server or hosting service like:

- Vercel
- Netlify
- GitHub Pages
- Any static file hosting service

## Environment Variables

Make sure to set the `GEMINI_API_KEY` environment variable in your production environment.

## Troubleshooting

- If you get API key errors, make sure your `.env.local` file has the correct API key
- If styles look broken, make sure `index.css` exists in the root directory
- If TypeScript errors occur, run `npm install` to ensure all type definitions are installed