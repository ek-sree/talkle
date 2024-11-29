import { X } from "lucide-react";

const AddUserModal = ({isOpen, onClose}) => {

    if(!isOpen) return null;

    return (
        <div className="text-white bg-black/70 fixed inset-0 z-30 flex justify-center items-center">
            <div className="bg-slate-900/80 px-5 py-6 rounded-lg">
          
                <h1 className="flex justify-center mb-4 text-neutral-400 text-xl">AddUserModal</h1>
                <button>
            <X
              size={40}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
            />
          </button>
                <textarea 
                    name="message" 
                    id="message" 
                    placeholder="Hello ,We met in park today evng (max-50)" 
                    maxLength={50} 
                    className="text-neutral-200 w-full h-20 resize-none rounded-md p-2 bg-neutral-700 mb-4"
                ></textarea>
                
                <button className="bg-indigo-500 py-1 px-2 mb-4 justify-center w-full rounded-md hover:bg-indigo-600">
                    Add with message
                </button>
                
                <div className="flex items-center mb-4">
                    <div className="h-px bg-neutral-400 flex-grow"></div>
                    <span className="px-3 text-neutral-400">or</span>
                    <div className="h-px bg-neutral-400 flex-grow"></div>
                </div>
                
                <button className="bg-gray-500 py-1 px-2 justify-center w-full rounded-md hover:bg-gray-600">
                    Add without message
                </button>
            </div>
        </div>
    );
};

export default AddUserModal;
