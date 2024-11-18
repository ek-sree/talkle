import { useState } from 'react';
import { Laugh, Mic, Paperclip, Send } from 'lucide-react';
import AttachmentModal from './AttachmentModal';

const ChatInput = () => {
    const [showAttachment, setShowAttachment] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage(''); 
    }
  };

  const handleShowAttachment=()=>{
    setShowAttachment(true);
  }

  const handleCloseAttachment=()=>{
    setShowAttachment(false);
  }


  return (
    <div className="fixed bottom-0 left-[25rem] right-0 bg-neutral-800 p-4 flex items-center space-x-2">
      <button onClick={handleShowAttachment} className="text-neutral-400 hover:text-white">
        <Paperclip size={24} />
      </button>
      <button className="text-neutral-400 hover:text-white pl-2">
        <Laugh size={24} />
      </button>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="flex-grow bg-neutral-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />

      {message?(<button 
        onClick={handleSend} 
        disabled={!message.trim()}
        className="bg-blue-500 text-white p-2 rounded-full disabled:opacity-50 hover:bg-blue-600 transition-colors"
      >
        <Send size={20} />
      </button>):(
      <button 
        onClick={handleSend} 
        className="bg-blue-500 text-white p-2 rounded-full disabled:opacity-50 hover:bg-blue-600 transition-colors"
      >
        <Mic size={20} />
      </button>)}
      {showAttachment&&(
        <AttachmentModal
        isOpen={showAttachment}
        onClose={handleCloseAttachment}
        />
      )}
    </div>
  );
};

export default ChatInput;