import { useState } from 'react';
import avatar from '../../../public/images/9286c820b0386e71f0ad7fec5f59c7c4.jpg';
import { Blend, Bolt, MessageSquareDot, Phone } from "lucide-react";

const SideBar = () => {
  const [activeIcon, setActiveIcon] = useState('messages');

  const topMenuItems = [
    { id: 'messages', icon: MessageSquareDot, label: 'Messages' },
    { id: 'calls', icon: Phone, label: 'Calls' },
    { id: 'status', icon: Blend, label: 'Status' }
  ];

  const bottomMenuItems = [
    { id: 'settings', icon: Bolt, label: 'Settings' },
  ];

  const handleClick = (id: string) => {
    setActiveIcon(id);
  };

  const IconButton = ({ item }) => (
    <button
      onClick={() => handleClick(item.id)}
      className={`
        relative w-full h-14 flex items-center justify-center
        hover:bg-neutral-800 transition-colors duration-200
        ${activeIcon === item.id ? 'bg-neutral-800' : ''}
      `}
    >
      <item.icon
        color="white"
        className={`w-6 h-6 
          ${activeIcon === item.id ? 'text-indigo-500' : 'text-gray-400'}
          transition-colors duration-200
        `}
      />
      {activeIcon === item.id && (
        <div className="absolute right-0 h-14 w-1 bg-indigo-500 rounded-l" />
      )}
    </button>
  );

  return (
    <div className="bg-neutral-900 min-h-screen w-14 flex flex-col justify-between fixed left-0 top-0">
      <div className="flex flex-col">
        {topMenuItems.map((item) => (
          <IconButton key={item.id} item={item} />
        ))}
      </div>

      <div className="flex flex-col mb-4">
        {bottomMenuItems.map((item) => (
          <IconButton key={item.id} item={item} />
        ))}

        <button
          onClick={() => handleClick('profile')}
          className={`
            relative w-full h-14 flex items-center justify-center
            hover:bg-neutral-800 transition-colors duration-200
            ${activeIcon === 'profile' ? 'bg-neutral-800' : ''}
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
