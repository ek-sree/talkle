import { Pencil, Send } from 'lucide-react';
import avatar from '../../../public/images/9286c820b0386e71f0ad7fec5f59c7c4.jpg';
import { useRef, useState } from 'react';

const UserAccount = () => {
  const [openName, setOpenName] = useState(false); 
  const [openPhone, setOpenPhone] = useState(false); 
  const [name, setName] = useState<string>('sreehari'); 
  const [phone, setPhone] = useState<number>(9562605265); 
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendName = () => {
    setOpenName(false);
  };

  const handleSendPhone = () => {
    setOpenPhone(false);
  };

  const handleImageClick = () => {
    if (selectedImage) {
      setSelectedImage(null);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendName();
    }
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendPhone();
    }
  };


  return (
    <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 min-h-screen flex flex-col items-center min-w-full">
      <h1 className="text-slate-300 text-2xl font-semibold mt-8 mb-12 border-b-2 border-slate-600 pb-2">
        Your Account
      </h1>

      <div className="bg-neutral-800/50 p-8 rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="relative w-fit mx-auto mb-8">
          <div className="relative group">
            <img 
              src={selectedImage ? URL.createObjectURL(selectedImage) : avatar} 
              alt="User Avatar" 
              className="w-36 h-36 rounded-full object-cover ring-4 ring-slate-600 shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute -right-2 bottom-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {selectedImage ? (
                <Send
                  onClick={handleImageClick}
                  className="w-8 h-8 p-1.5 bg-green-700 text-slate-200 rounded-full cursor-pointer hover:bg-slate-600 transition-colors duration-200 shadow-lg"
                />
              ) : (
                <Pencil
                  onClick={handleImageClick}
                  className="w-8 h-8 p-1.5 bg-slate-700 text-slate-200 rounded-full cursor-pointer hover:bg-slate-600 transition-colors duration-200 shadow-lg"
                />
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-slate-400 text-sm mb-2 block">Name</label>
          {!openName ? (
            <div className="flex items-center justify-between bg-neutral-700/50 p-3 rounded-lg">
              <span className="text-slate-200 text-lg">{name}</span>
              <Pencil
                onClick={() => setOpenName(true)} 
                className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors duration-200 cursor-pointer"
              />
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={name} 
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleNameKeyDown}
                className="flex-1 px-3 py-2 bg-neutral-700 text-slate-200 border-2 border-slate-600 rounded-lg focus:outline-none focus:border-slate-500 transition-colors duration-200"
              />
              <Send
                onClick={handleSendName}
                className="w-10 h-10 p-2 bg-slate-700 text-slate-200 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors duration-200"
              />
            </div>
          )}
        </div>

        <div>
          <label className="text-slate-400 text-sm mb-2 block">Phone</label>
          {!openPhone ? (
            <div className="flex items-center justify-between bg-neutral-700/50 p-3 rounded-lg">
              <span className="text-slate-200 text-lg">{phone}</span>
              <Pencil
                onClick={() => setOpenPhone(true)} 
                className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors duration-200 cursor-pointer"
              />
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="number"
                value={phone} 
                onChange={(e) => setPhone(Number(e.target.value))}
                onKeyDown={handlePhoneKeyDown}
                className="flex-1 px-3 py-2 bg-neutral-700 text-slate-200 border-2 border-slate-600 rounded-lg focus:outline-none focus:border-slate-500 transition-colors duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <Send
                onClick={handleSendPhone} 
                className="w-10 h-10 p-2 bg-slate-700 text-slate-200 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors duration-200"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;