import { PhoneCall, Video } from 'lucide-react';
import avatar from '../../../public/images/9286c820b0386e71f0ad7fec5f59c7c4.jpg';

const ChatAreaNav = () => {
  return (
    <div className="flex bg-neutral-600 items-center justify-between p-4 border-b">
      <div className="group flex items-center space-x-4">
        <img 
          src={avatar} 
          alt="User Avatar" 
          className="w-12 h-12 rounded-full object-cover cursor-pointer"
        />
        <div>
          <h2 className="font-semibold text-lg group-hover:font-bold cursor-pointer">Sreehari E K</h2>
          <p className="text-sm text-green-600 group-hover:font-semibold cursor-pointer">Online</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="group p-2 hover:bg-gray-100 rounded-full">
          <PhoneCall className="text-gray-200 group-hover:text-gray-900" size={24} />
        </button>
        <button className="group p-2 hover:bg-gray-100 rounded-full">
          <Video className="text-gray-200 group-hover:text-gray-900" size={24} />
        </button>
      </div>
    </div>
  );
}

export default ChatAreaNav;