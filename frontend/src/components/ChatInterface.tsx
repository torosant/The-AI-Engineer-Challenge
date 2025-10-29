'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [developerMessage, setDeveloperMessage] = useState('You are a helpful AI assistant.');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!inputMessage.trim() || !apiKey.trim()) {
            setError('Please enter both a message and your OpenAI API key');
            return;
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage,
            role: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    developer_message: developerMessage,
                    user_message: inputMessage,
                    model: 'gpt-4.1-mini',
                    api_key: apiKey,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('No response body');
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: '',
                role: 'assistant',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);

            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;

                if (value) {
                    const chunk = decoder.decode(value);
                    setMessages(prev =>
                        prev.map(msg =>
                            msg.id === assistantMessage.id
                                ? { ...msg, content: msg.content + chunk }
                                : msg
                        )
                    );
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Configuration Panel */}
            <div className="bg-white rounded-xl shadow-xl border border-orange-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-orange-900 mb-4">Configuration</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="apiKey" className="block text-sm font-medium text-orange-800 mb-2">
                            OpenAI API Key
                        </label>
                        <input
                            type="password"
                            id="apiKey"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter your OpenAI API key"
                            className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="developerMessage" className="block text-sm font-medium text-orange-800 mb-2">
                            System Message (Optional)
                        </label>
                        <textarea
                            id="developerMessage"
                            value={developerMessage}
                            onChange={(e) => setDeveloperMessage(e.target.value)}
                            placeholder="Define the AI's behavior and personality"
                            rows={3}
                            className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                        />
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="bg-white rounded-xl shadow-xl border border-orange-200 h-96 overflow-y-auto p-6 mb-6">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-600 mt-20">
                        <div className="mb-4">
                            <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-lg font-medium">Start a conversation!</p>
                        <p className="text-sm text-gray-500">Enter your message below and press Enter to send.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow-sm ${message.role === 'user'
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-gray-50 text-gray-800 border border-gray-200'
                                        }`}
                                >
                                    {message.role === 'assistant' ? (
                                        <div className="markdown-body">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {message.content}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                    )}
                                    <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-orange-100' : 'text-gray-500'
                                        }`}>
                                        {message.timestamp.toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-50 text-gray-800 px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
                                    <div className="flex items-center space-x-3">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                                        <span className="font-medium">AI is thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6 shadow-sm">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <strong>Error:</strong> {error}
                    </div>
                </div>
            )}

            {/* Message Input */}
            <div className="bg-white rounded-xl shadow-xl border border-orange-200 p-6">
                <div className="flex space-x-4">
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                        rows={3}
                        className="flex-1 px-4 py-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none bg-white text-gray-900 placeholder-gray-500"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !inputMessage.trim() || !apiKey.trim()}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                    >
                        {isLoading ? (
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>Sending...</span>
                            </div>
                        ) : (
                            'Send'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
