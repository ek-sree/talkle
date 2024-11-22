import { useState } from 'react';
import avatar from '../../../public/images/9286c820b0386e71f0ad7fec5f59c7c4.jpg';
import { Blend, Bolt, MessageSquareDot, Phone } from "lucide-react";

const SideBar = ({onSectionChange}) => {
  const [activeIcon, setActiveIcon] = useState('chats');

  const handleClick = (id: string) => {
    setActiveIcon(id);
    onSectionChange(id)
  };


  return (
    <div className="bg-neutral-900 min-h-screen w-14 flex flex-col justify-between fixed left-0 top-0">
      <div className="flex flex-col">
      <button
      onClick={() => handleClick('chats')}
      className={`
        relative w-full h-14 flex items-center justify-center
        hover:bg-neutral-800 transition-colors duration-200
        ${activeIcon === 'chats' ? 'bg-neutral-800' : ''}
      `}
    >
      <MessageSquareDot
        color="white"
        className={`w-6 h-6 
          ${activeIcon === 'chats' ? 'text-indigo-500' : 'text-gray-400'}
          transition-colors duration-200
        `}
      />
      {activeIcon === 'chats' && (
        <div className="absolute right-0 h-14 w-1 bg-indigo-500 rounded-l" />
      )}
    </button>


    <button
      onClick={() => handleClick('phone')}
      className={`
        relative w-full h-14 flex items-center justify-center
        hover:bg-neutral-800 transition-colors duration-200
        ${activeIcon === 'phone' ? 'bg-neutral-800' : ''}
      `}
    >
      <Phone
        color="white"
        className={`w-6 h-6 
          ${activeIcon === 'phone' ? 'text-indigo-500' : 'text-gray-400'}
          transition-colors duration-200
        `}
      />
      {activeIcon === 'phone' && (
        <div className="absolute right-0 h-14 w-1 bg-indigo-500 rounded-l" />
      )}
    </button>


    <button
      onClick={() => handleClick('status')}
      className={`
        relative w-full h-14 flex items-center justify-center
        hover:bg-neutral-800 transition-colors duration-200
        ${activeIcon === 'status' ? 'bg-neutral-800' : ''}
      `}
    >
      <Blend
        color="white"
        className={`w-6 h-6 
          ${activeIcon === 'status' ? 'text-indigo-500' : 'text-gray-400'}
          transition-colors duration-200
        `}
      />
      {activeIcon === 'status' && (
        <div className="absolute right-0 h-14 w-1 bg-indigo-500 rounded-l" />
      )}
    </button>
      </div>




      <div className="flex flex-col mb-4">
      <button
      onClick={() => handleClick('settings')}
      className={`
        relative w-full h-14 flex items-center justify-center
        hover:bg-neutral-800 transition-colors duration-200
        ${activeIcon === 'settings' ? 'bg-neutral-800' : ''}
      `}
    >
      <Bolt
        color="white"
        className={`w-6 h-6 
          ${activeIcon === 'settings' ? 'text-indigo-500' : 'text-gray-400'}
          transition-colors duration-200
        `}
      />
      {activeIcon === 'settings' && (
        <div className="absolute right-0 h-14 w-1 bg-indigo-500 rounded-l" />
      )}
    </button>
        
        <button
          onClick={() => handleClick('profile')}
          className={`
            relative w-full h-14 flex items-center justify-center
            hover:bg-neutral-800 transition-colors duration-200
            ${activeIcon === 'profile' ? 'bg-neutral-800 ' : ''}
          `}
        >
          <img
            src={avatar}
            alt="profile-pic"
            className={`
              rounded-full h-8 w-8
              ${activeIcon === 'profile' ? 'ring-2 ring-indigo-500' : ''}
              transition-all duration-200
            `}
          />
          {activeIcon === 'profile' && (
            <div className="absolute right-0 h-14 w-1 bg-indigo-500 rounded-l" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
