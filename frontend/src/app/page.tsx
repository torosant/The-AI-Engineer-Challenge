'use client';

import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-900 mb-4">
            AI Chat Assistant
          </h1>
          <p className="text-lg text-orange-700 font-medium">
            Powered by OpenAI GPT-4.1-mini
          </p>
        </div>
        <ChatInterface />
      </div>
    </main>
  );
}