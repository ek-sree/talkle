import { X } from "lucide-react";
import { useState } from "react";

const Requests = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('incoming');
  
  if (!isOpen) return null;

  return (
    <div className="bg-black/70 inset-0 z-50 flex items-center justify-center fixed">
      <div className="relative w-[25rem] h-[600px] bg-neutral-900 rounded-2xl shadow-xl">
        <div className="sticky top-0 z-10 bg-neutral-900 pt-3 pb-2 rounded-t-2xl">
          <h2 className="text-white text-xl font-semibold px-6">Requests</h2>
          <button>
            <X
              size={40}
              onClick={onClose}
              className="absolute top-3 right-3 z-10 text-gray-400 hover:text-white transition-colors"
            />
          </button>
        </div>

        {/* Toggle Buttons */}
        <div className="mx-4 mt-2 bg-neutral-800 rounded-xl p-1 flex gap-1">
          <button 
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'incoming' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('incoming')}
          >
            Incoming
          </button>
          <button 
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'sent' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('sent')}
          >
            Sent
          </button>
        </div>

        {/* Incoming Request Section */}
        <div className="mt-4 px-4">
          <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-colors">
            <div className="flex items-center gap-3">
              <img 
                src="/api/placeholder/48/48" 
                alt="" 
                className="w-12 h-12 rounded-full ring-2 ring-indigo-600/50"
              />
              <span className="text-white font-medium">Sreehari</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                Accept
              </button>
              <button className="px-4 py-1.5 text-sm font-medium rounded-lg bg-neutral-700 text-gray-300 hover:bg-neutral-600 transition-colors">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;