'use client';

import React, { useEffect, useRef, useState } from 'react';

// Define message types
interface ChatMessage {
  sender: 'player' | 'enemy' | 'system';
  content: string;
  timestamp: Date;
  action?: 'attack' | 'skill' | 'defend' | 'damage' | 'victory' | 'defeat';
}

interface ChatInterfaceProps {
  onSendMessage?: (message: string) => void;
  gameRef?: any; // Reference to the Phaser game for potential direct communication
}

export default function ChatInterface({ onSendMessage, gameRef }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'system',
      content: 'Battle started! Prepare for combat.',
      timestamp: new Date(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Function to add a message to the chat
  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };
  
  // Function to expose the addMessage functionality to the parent
  // This allows BattleScene to add messages to the chat
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Create a global function that BattleScene can call
      (window as any).addBattleMessage = (
        sender: 'player' | 'enemy' | 'system',
        content: string,
        action?: 'attack' | 'skill' | 'defend' | 'damage' | 'victory' | 'defeat'
      ) => {
        addMessage({
          sender,
          content,
          timestamp: new Date(),
          action
        });
      };
      
      // Cleanup
      return () => {
        delete (window as any).addBattleMessage;
      };
    }
  }, []);
  
  // Render appropriate icon based on sender and action
  const renderIcon = (message: ChatMessage) => {
    switch (message.sender) {
      case 'player':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
            {message.action === 'attack' ? '⚔️' : 
             message.action === 'skill' ? '✨' : 
             message.action === 'defend' ? '🛡️' : 
             message.action === 'damage' ? '💔' : 'P'}
          </div>
        );
      case 'enemy':
        return (
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
            {message.action === 'attack' ? '⚔️' : 
             message.action === 'skill' ? '✨' : 
             message.action === 'defend' ? '🛡️' : 
             message.action === 'damage' ? '💔' : 'E'}
          </div>
        );
      case 'system':
        return (
          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">
            {message.action === 'victory' ? '🏆' : 
             message.action === 'defeat' ? '💀' : '📢'}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 rounded-lg border border-purple-800 overflow-hidden">
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Battle Log</h2>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.sender === 'player' ? 'justify-start' : 
                               message.sender === 'enemy' ? 'justify-end' : 'justify-center'}`}
          >
            {message.sender === 'player' && (
              <div className="flex items-start space-x-2">
                {renderIcon(message)}
                <div className="bg-purple-800 text-white px-4 py-2 rounded-lg max-w-xs">
                  <p>{message.content}</p>
                  <p className="text-xs text-gray-300 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            )}
            
            {message.sender === 'enemy' && (
              <div className="flex items-start space-x-2">
                <div className="bg-gray-700 text-white px-4 py-2 rounded-lg max-w-xs">
                  <p>{message.content}</p>
                  <p className="text-xs text-gray-300 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {renderIcon(message)}
              </div>
            )}
            
            {message.sender === 'system' && (
              <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg max-w-xs text-center text-sm">
                {message.content}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 italic">
          Battle actions will appear here automatically
        </div>
      </div>
    </div>
  );
}
