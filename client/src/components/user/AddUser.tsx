import { Search, X, UserPlus } from "lucide-react";
import { useState } from "react";
import AddUserModal from "./AddUserModal";

const AddUser = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  
  if (!isOpen) return null;

  const users = [
    { id: 1, name: "Sreehari E K" },
    { id: 2, name: "Alex Morgan" },
    { id: 3, name: "Sarah Chen" },
    { id: 4, name: "James Wilson" },
    { id: 5, name: "Maria Garcia" },
    { id: 6, name: "David Kim" },
    { id: 7, name: "Emma Thompson" },
    { id: 8, name: "Michael Brown" },
  ];


  const handleModalOpen = ()=>{
    setIsOpenModal(true);
  }
  
  return (
    <div className="bg-black/80 inset-0 z-50 flex items-center justify-center fixed backdrop-blur-sm">
      <div className="relative w-[25rem] h-[600px] bg-neutral-900 rounded-2xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="bg-neutral-900 pt-6 pb-4 rounded-t-2xl border-b border-neutral-800">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 transition-colors duration-200"
          >
            <X size={24} className="text-neutral-400 hover:text-white" />
          </button>
          
          <h2 className="text-white text-xl font-semibold px-6 flex items-center gap-2">
            <UserPlus size={24} className="text-indigo-500" />
            Add User
          </h2>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-4 bg-neutral-900 border-b border-neutral-800"> 
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users" 
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-800 text-white rounded-xl 
                       placeholder:text-neutral-500 focus:outline-none focus:ring-2 
                       focus:ring-indigo-500/50 transition-all duration-200"
            /> 
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" 
            /> 
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800">
          <div className="px-4 py-2">
            {users.map((user) => (
              <div 
                key={user.id}
                className="group flex items-center gap-4 p-3 rounded-xl transition-all duration-200
                         hover:bg-neutral-800 cursor-pointer"
              >
                <div className="relative flex-shrink-0">
                  <img 
                    src="/api/placeholder/48/48"
                    alt="" 
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-neutral-700 
                             group-hover:ring-indigo-500/50 transition-all duration-200"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full 
                                border-2 border-neutral-900"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium group-hover:text-indigo-400 
                               transition-colors duration-200 truncate">
                    {user.name}
                  </h3>
                  <p className="text-sm text-neutral-500 truncate">Online</p>
                </div>

                <button onClick={handleModalOpen} className="opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg 
                                 bg-indigo-600 text-white text-sm font-medium flex-shrink-0
                                 hover:bg-indigo-700 transition-all duration-200">
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isOpenModal &&(
        <AddUserModal
        isOpen={isOpenModal}
        onClose={()=>setIsOpenModal(false)}
        />
      )}
    </div>
  );
};

export default AddUser;