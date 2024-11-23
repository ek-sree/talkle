import { useState } from 'react';
import { Blend, Bolt, MessageSquareDot, Phone } from "lucide-react";
import avatar from '../../../public/images/9286c820b0386e71f0ad7fec5f59c7c4.jpg'

const SideBar = ({onSectionChange}) => {
  const [activeIcon, setActiveIcon] = useState('chats');

  const handleClick = (id) => {
    setActiveIcon(id);
    onSectionChange(id);
  };

  const NavButton = ({ id, icon: Icon, isProfile = false }) => (
    <button
      onClick={() => handleClick(id)}
      className={`
        relative flex items-center justify-center
        hover:bg-neutral-800 transition-colors duration-200
        md:w-14 md:h-14
        w-full h-12
        ${activeIcon === id ? 'bg-neutral-800' : ''}
      `}
    >
      {isProfile ? (
        <img
          src={avatar}
          alt="profile-pic"
          className={`
            rounded-full
            md:h-8 md:w-8
            h-6 w-6
            ${activeIcon === id ? 'ring-2 ring-indigo-500' : ''}
            transition-all duration-200
          `}
        />
      ) : (
        <Icon
          className={`
            md:w-6 md:h-6
            w-5 h-5
            ${activeIcon === id ? 'text-indigo-500' : 'text-gray-400'}
            transition-colors duration-200
          `}
        />
      )}
      {activeIcon === id && (
        <div 
          className={`
            absolute bg-indigo-500 
            md:right-0 md:h-14 md:w-1 
            bottom-0 h-1 w-full
            rounded-t md:rounded-l md:rounded-t-none
          `} 
        />
      )}
    </button>
  );

  return (
    <div 
      className={`
        bg-neutral-900 
        fixed z-50
        md:min-h-screen md:w-14 md:left-0 md:top-0
        bottom-0 left-0 right-0 h-16
        flex md:flex-col justify-between
        border-t md:border-t-0 border-neutral-800
      `}
    >
      <div className="flex md:flex-col flex-1 justify-around md:justify-start">
        <NavButton id="chats" icon={MessageSquareDot} />
        <NavButton id="phone" icon={Phone} />
        <NavButton id="status" icon={Blend} />
      </div>

      <div className="flex md:flex-col md:mb-4 flex-1 justify-around md:justify-end">
        <NavButton id="settings" icon={Bolt} />
        <NavButton id="profile" isProfile={true} icon={undefined} />
      </div>
    </div>
  );
};

export default SideBar;