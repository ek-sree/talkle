import { useState, useRef, useCallback, useEffect } from 'react';
import { Loader2, Mail, X } from 'lucide-react';
import { AUTH_ENDPOINTS } from '../../api/endpoints/authEndpoints';
import { useNavigate } from 'react-router-dom';
import  { setUser } from '../../states/redux/slice/userSlice';
import { useDispatch } from 'react-redux';
import Axios from '../../api/axios/axios';
import { useDebonce } from '../../customHooks/useDebounce';
import { toast, Toaster } from 'sonner';


const CreateProfile = () => {
  const [isImage, setIsImage] = useState(false);
  const [selectedColor, setSelectedColor] = useState('bg-rose-500');
  const [name, setName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string | null>('');
  const [userNameError, setUserNameError] = useState<string>('')
  const [isVaildUserName, setIsValidUserName] = useState<boolean>(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const useDebounceName = useDebonce(userName, 1000)

  const colors = [
    { name: 'Rose', class: 'bg-rose-500' },
    { name: 'Green', class: 'bg-green-500' },
    { name: 'Yellow', class: 'bg-yellow-500' },
    { name: 'Purple', class: 'bg-purple-500' },
  ];


  const tailwindToHex = (colorClass: string): string => {
    switch (colorClass) {
      case 'bg-rose-500':
        return '#f43f5e';
      case 'bg-green-500':
        return '#22c55e';
      case 'bg-yellow-500':
        return '#eab308';
      case 'bg-purple-500':
        return '#a855f7';
      default:
        return '#f43f5e'; 
    }
  };

  const generateLetterAvatar = useCallback(
    (letter: string, backgroundColor: string): Promise<Blob> => {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
  
        if (ctx) {
          // Convert Tailwind class to hex color
          const hexColor = tailwindToHex(backgroundColor);
          
          // Fill background with hex color
          ctx.fillStyle = hexColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
  
          // Calculate brightness of background color for contrast
          const hex = hexColor.replace('#', '');
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          
          // Set text color based on background brightness
          ctx.fillStyle = brightness > 125 ? '#000000' : '#FFFFFF';
          
          // Draw the letter
          ctx.font = 'bold 120px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(letter.toUpperCase(), canvas.width / 2, canvas.height / 2);
  
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create avatar blob.'));
            }
          }, 'image/png');
        } else {
          reject(new Error('Canvas context is not available.'));
        }
      });
    },
    []
  );
  

  useEffect(()=>{
    if(!useDebounceName.trim()) return

    const checkUserName= async()=>{
      try {
        setIsCheckingUsername(true)
        const response = await Axios.post(AUTH_ENDPOINTS.CHECKUSERNAME,{userName: useDebounceName})
        
        if(response.status==200){
          setIsValidUserName(true)
          setUserNameError('')
        }
      } catch (error:any) {
        if (error.response) {
          if (error.response.status === 400) {
            setUserNameError(error.response.data.message)
          } else {
            toast.error("An error occurred. Please try again.");
          }
        } else {
          toast.error("Network error. Please check your connection.");
        }
      }finally{
        setIsCheckingUsername(false);
      }
    }
    checkUserName()
  },[useDebounceName])

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    setEmail(userEmail);
  }, []);

  useEffect(() => {
    if (name.trim()) setError('');
  }, [name]);


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

  const handleSubmit = async () => {
    try {
      if (!isVaildUserName) {
        setUserNameError('Please provide a valid username before submitting.');
        return;
      }
      if (!name.trim()) {
        setError('Name required!');
        return;
      }
      const formData = new FormData();
      if (!imagePreview) {
        const image = await generateLetterAvatar(name.charAt(0), selectedColor);
        formData.append('avatar', image, 'avatar.png');
      } else {
        try {
          const response = await fetch(imagePreview);
          const blob = await response.blob();
          formData.append('avatar', blob, 'avatar.png');
        } catch (err) {
          setError('Error processing image.');
          console.error(err);
          return;
        }
      }

      formData.append('name', name);
      formData.append('userName', userName);
      if (email) {
        formData.append('email', email);
      }
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      setLoading(true);
      const response = await Axios.post(AUTH_ENDPOINTS.CREATEPROFILE, formData, {
        headers: {
          'Content-Type': '',
        },
      });
      console.log('Response', response);
      if (response.status === 200) {
        localStorage.removeItem('flowAction');
        sessionStorage.setItem('accessToken', response.data.accessToken);
        dispatch(setUser({
          id: response.data.data._id,
          avatar:response.data.data.avatar,
          name: response.data.data.name,
          email: response.data.data.email,
          userName: response.data.data.userName
        }))
        navigate('/');
      }
    }catch (error:any) {
      if (error.response) {
        if (error.response.status === 404) {
          setUserNameError(error.response.data.message)
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <Toaster expand={false} position='top-center' richColors/>
      <div className="bg-gray-800 p-8 rounded-xl w-80 flex flex-col items-center">
        {email && (
          <span className="text-neutral-400 mb-4 flex gap-2">
            <Mail />
            {email}
          </span>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
        />

        <div className="relative">
          <div
            className={`w-32 h-32 rounded-full border-4 border-gray-700 ${
              !isImage ? selectedColor : ''
            } flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/50`}
          >
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
          disabled={loading}
        >
          {isImage ? 'Change Image' : 'Upload Photo'}
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
            disabled={loading}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-indigo-500 focus:outline-none transition-colors duration-200"
          />
          {error && <div className="text-red-500 text-center mt-3">{error}</div>}
        </div>

        <div className="mt-6 w-full relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter a username"
              disabled={loading}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={`w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-2 transition-colors duration-200 focus:outline-none ${
                userName.trim()
                  ? isVaildUserName
                    ? 'border-green-500 focus:border-green-500'
                    : userNameError
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-600 focus:border-indigo-500'
                  : 'border-gray-600 focus:border-indigo-500'
              } pr-10`}
            />
            {userName.trim() && isCheckingUsername && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Loader2 className="w-4 h-4 animate-spin text-yellow-200" />
              </div>
            )}
          </div>
          {userNameError && <div className="text-red-500 text-sm mt-1">{userNameError}</div>}
        </div>

        <button
  onClick={handleSubmit}
  disabled={loading}
  className="mt-6 w-full py-2 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-lg hover:from-indigo-500 hover:to-indigo-300 transition-all duration-300 font-medium shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
>
  {loading ? (
    <>
      <Loader2 className="w-5 h-5 animate-spin" />
      <span>Saving...</span>
    </>
  ) : (
    "Save Changes"
  )}
</button>
      </div>
    </div>
  );
};

export default CreateProfile;
