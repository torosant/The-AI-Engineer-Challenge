# AI Chat Assistant Frontend

A beautiful, modern chat interface built with Next.js that integrates with the FastAPI backend to provide an AI-powered chat experience using OpenAI's GPT-4.1-mini model.

## Features

- 🎨 **Professional Orange Theme**: Appealing orange color scheme with excellent visual clarity and contrast
- 💬 **Real-time Chat**: Streaming responses from the AI assistant
- 🔐 **Secure API Key Input**: Password-style input field for OpenAI API key
- ⚙️ **Customizable System Messages**: Define the AI's behavior and personality
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🚀 **Fast Performance**: Built with Next.js for optimal performance
- ✨ **Modern UI/UX**: Clean, intuitive interface with smooth animations and professional styling

## Prerequisites

Before running the frontend, make sure you have:

1. **Node.js** (version 18 or higher)
2. **npm** (comes with Node.js)
3. **The backend API running** on `http://localhost:8000`
4. **An OpenAI API key** (get one from [OpenAI's website](https://platform.openai.com/api-keys))

## Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 3. Start the Backend API

In a separate terminal, navigate to the project root and start the FastAPI backend:

```bash
# From the project root directory
uv run uvicorn api.app:app --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000)

## How to Use

1. **Open the application** in your browser at `http://localhost:3000`
2. **Enter your OpenAI API key** in the configuration panel (this is required for the chat to work)
3. **Optionally customize the system message** to define how the AI should behave
4. **Type your message** in the chat input area
5. **Press Enter** to send your message (or click the Send button)
6. **Watch the AI respond** in real-time as it streams the response

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles with green theme
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Main page component
│   └── components/
│       └── ChatInterface.tsx # Main chat interface component
├── public/                  # Static assets
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## API Integration

The frontend integrates with the FastAPI backend through the `/api/chat` endpoint:

- **Endpoint**: `POST http://localhost:8000/api/chat`
- **Request Body**:
  ```json
  {
    "developer_message": "You are a helpful AI assistant.",
    "user_message": "Hello, how are you?",
    "model": "gpt-4.1-mini",
    "api_key": "your-openai-api-key"
  }
  ```
- **Response**: Streaming text response from the AI

## Deployment

This frontend is designed to be deployed on Vercel:

1. **Connect your GitHub repository** to Vercel
2. **Set the build command** to `npm run build`
3. **Set the output directory** to `.next`
4. **Deploy** and your app will be live!

## Troubleshooting

### Common Issues

1. **"Network Error" or "Failed to fetch"**
   - Make sure the backend API is running on `http://localhost:8000`
   - Check that CORS is properly configured in the backend

2. **"Invalid API Key" error**
   - Verify your OpenAI API key is correct
   - Make sure you have sufficient credits in your OpenAI account

3. **Messages not appearing**
   - Check the browser console for any JavaScript errors
   - Ensure the API endpoint is responding correctly

### Getting Help

If you encounter any issues:

1. Check the browser console for error messages
2. Verify both frontend and backend are running
3. Test the API directly using a tool like Postman or curl
4. Check the backend logs for any server-side errors

## Contributing

Feel free to contribute to this project by:

1. Reporting bugs
2. Suggesting new features
3. Submitting pull requests
4. Improving the documentation

## License

This project is part of the AI Engineer Challenge and follows the same license terms.