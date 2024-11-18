import { FileText, Image, Pen, User } from "lucide-react";
import { FC } from "react";

interface AttachmentModalProps {
  isOpen: boolean;
  onClose: ()=>void;
}

const AttachmentModal: FC<AttachmentModalProps> = ({onClose, isOpen}) => {
  const attachmentOptions = [
    { 
      icon: <Image size={24} className="text-blue-500" />, 
      label: 'Gallery', 
      color: 'bg-blue-100' 
    },
    { 
      icon: <FileText size={24} className="text-green-500" />, 
      label: 'Document', 
      color: 'bg-green-100' 
    },
    { 
      icon: <User size={24} className="text-purple-500" />, 
      label: 'Contact', 
      color: 'bg-purple-100' 
    },
    { 
      icon: <Pen size={24} className="text-orange-500" />, 
      label: 'Drawing', 
      color: 'bg-orange-100' 
    }
  ];

  if(!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-neutral-800 rounded-xl p-6 w-96 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Attachment</h2>
          <button 
            onClick={onClose} 
            className="text-neutral-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {attachmentOptions.map((option, index) => (
            <button 
              key={index} 
              className="flex flex-col items-center p-4 rounded-lg hover:bg-neutral-700 transition-colors"
            >
              <div className={`p-3 rounded-full mb-2 ${option.color}`}>
                {option.icon}
              </div>
              <span className="text-white text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


export default AttachmentModal