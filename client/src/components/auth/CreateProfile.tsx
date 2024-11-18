import { useState, useRef } from 'react';
import { X } from 'lucide-react';

const CreateProfile = () => {
  const [isImage, setIsImage] = useState(false);
  const [selectedColor, setSelectedColor] = useState('bg-rose-500');
  const [name, setName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const colors = [
    { name: 'Rose', class: 'bg-rose-500' },
    { name: 'Green', class: 'bg-green-500' },
    { name: 'Yellow', class: 'bg-yellow-500' },
    { name: 'Purple', class: 'bg-purple-500' }
  ];

  const handleUploadAvatar = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setImagePreview(result);
          setIsImage(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setIsImage(false);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl w-80 flex flex-col items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
        />

        <div className="relative">
          <div className={`w-32 h-32 rounded-full border-4 border-gray-700 ${!isImage ? selectedColor : ''} flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/50`}>
            {isImage ? (
              <>
                <img 
                  src={imagePreview || ''}
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 group"
                  title="Remove image"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </>
            ) : (
              <span className="text-6xl font-bold text-white">
                {name.charAt(0).toUpperCase() || ' '}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleUploadAvatar}
          className="mt-4 px-6 py-2 bg-gray-700 text-sm text-white rounded-full hover:bg-gray-600 transition-colors duration-200 w-fit"
        >
          {isImage ? "Change Image" : "Upload Photo"}
        </button>

        <div className="mt-6 flex gap-2 justify-center">
          {colors.map((color) => (
            <button
              key={color.class}
              onClick={() => setSelectedColor(color.class)}
              className={`w-8 h-8 rounded-full ${color.class} transition-transform duration-200 hover:scale-110 ${
                selectedColor === color.class ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-800' : ''
              }`}
              title={color.name}
            />
          ))}
        </div>

        <div className="mt-6 w-full">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-indigo-500 focus:outline-none transition-colors duration-200"
          />
        </div>

        <button className="mt-6 w-full py-2 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-lg hover:from-indigo-500 hover:to-indigo-300 transition-all duration-300 font-medium shadow-lg shadow-indigo-600/30">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CreateProfile;