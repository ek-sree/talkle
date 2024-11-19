import React, { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import messageDummy from '../../constant/message.json';

const MessageArea = ({ user }) => {
  const userId = 2;
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      // Set scroll to the bottom immediately after render
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [user]); // Trigger when user changes

  const getFormattedDate = (date: string) => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (date === today) return 'Today';
    if (date === yesterday) return 'Yesterday';

    return new Date(date).toLocaleDateString();
  };

  if (!user)
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a user to start chatting!
      </div>
    );

  let lastRenderedDate: string | null = null; 

  return (
    <div 
      ref={messageContainerRef}
      className="mb-10 overflow-y-auto h-[500px]"
    >
      {messageDummy.map((message, index) => {
        const isNewDate = message.date !== lastRenderedDate;
        lastRenderedDate = message.date;

        return (
          <div key={index}>
            {/* Sticky Date Header */}
            {isNewDate && (
              <div className="sticky top-0 text-center py-1 shadow-sm z-10">
                <span className="bg-green-300 px-4 text-black font-sans rounded-xl">
                  {getFormattedDate(message.date)}
                </span>
              </div>
            )}
            {/* Message Bubble */}
            <div
              className={`flex ${
                message.senderId === userId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs mb-6 py-4 ${
                  message.senderId === userId
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {message.message}
                <span className="justify-end flex text-sm text-slate-600 font-serif">
                  {message.time}
                </span>
                <span className=' justify-end flex mt-2'>
                  <Check/>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageArea;