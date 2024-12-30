import { CircleX, Loader2, Pencil, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../states/redux/store/store';
import Axios from '../../api/axios/axios';
import { USERDETAILS_ENDPOINTS } from '../../api/endpoints/userDetailsEndpoints';
import { toast } from 'sonner';
import { updateName, updateUserName } from '../../states/redux/slice/userSlice';
import { AUTH_ENDPOINTS } from '../../api/endpoints/authEndpoints';
import { useDebonce } from '../../customHooks/useDebounce';

const UserAccount = () => {
  const username = useSelector((state: RootState) => state.UserAuth.userName);
  const Name = useSelector((state: RootState) => state.UserAuth.name);
  const userEmail = useSelector((state: RootState) => state.UserAuth.email);
  const userAvatar = useSelector((state: RootState) => state.UserAuth.avatar);
  const userId = useSelector((state:RootState)=>state.UserAuth.id)

  const [openName, setOpenName] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openUserName, setOpenUserName] = useState(false);
  const [userName, setUserName] = useState<string>(username || '');
  const [name, setName] = useState<string>(Name || '');
  const [email, setEmail] = useState<string>(userEmail || '');
  const [selectedImage, setSelectedImage] = useState<File | string | null>(userAvatar || null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [userNameError, setUserNameError] = useState<string>('')
  const [isVaildUserName, setIsValidUserName] = useState<boolean>(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const useDebounceName = useDebonce(userName, 1000)

  const dispatch = useDispatch()

  //update image
  const handleImageClick = () => {
    setIsEditingImage(true); 
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileUrl = URL.createObjectURL(file)
      setSelectedImage(fileUrl);
    }
  };

  const handleSendImage = () => {
    setIsEditingImage(false);
    console.log("New image selected:", selectedImage);
  };

//update email
  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setOpenEmail(false);
    }
  };


//update userName

useEffect(()=>{
  if(!useDebounceName.trim() || useDebounceName === username) return

  const checkUserName= async()=>{
    try {
      setIsCheckingUsername(true)
      const response = await Axios.post(AUTH_ENDPOINTS.CHECKUSERNAME,{userName: useDebounceName})
      console.log(response);
      
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

  const handleUpdateUsername=async()=>{
    if(!isVaildUserName)return
    try {
      const response = await Axios.post(`${USERDETAILS_ENDPOINTS.updateUserName}/${userId}`, {userName})
      if(response.status==200){
        setOpenUserName(false);
        setUserName(response.data.data)
        dispatch(updateUserName(response.data.data))
        toast.success("userName updated successfully !")
      }
    } catch (error:any) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message || "something went wrong!");
        } else {
          toast.error("An error occurred while changing userName. Please try again.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  }


  const handleUserNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdateUsername()
    }
  };


//Update name
  const handleUpdateName= async ()=>{
    try {
      const response = await Axios.post(`${USERDETAILS_ENDPOINTS.updateName}/${userId}`, {name})
      if(response.status==200){
        setOpenName(false);
        setName(response.data.data)
        dispatch(updateName(response.data.data))
        toast.success("Name updated successfully !")
      }
     } catch (error:any) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message || "something went wrong!");
        } else {
          toast.error("An error occurred while changing name. Please try again.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  }

  const handleNameKeyDown = async(e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdateName()
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
              src={typeof selectedImage === 'string' ? selectedImage : ''}
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
              {isEditingImage ? (
                <Send
                  onClick={handleSendImage}
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
          <label className="text-slate-400 text-sm mb-2 block">userName</label>
          {!openUserName ? (
            <div className="flex items-center justify-between bg-neutral-700/50 p-3 rounded-lg">
              <span className="text-slate-200 text-lg">{userName}</span>
              <Pencil
                onClick={() => setOpenUserName(true)}
                className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors duration-200 cursor-pointer"
              />
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                onKeyDown={handleUserNameKeyDown}
                className={`flex-1 px-3 py-2 bg-neutral-700 text-slate-200 rounded-lg focus:outline-none transition-colors duration-200 ${
                  userName.trim()
                    ? isVaildUserName
                      ? 'border-2 border-green-500 focus:border-green-500'
                      : userNameError && username && userName
                      ? 'border-2 border-red-500 focus:border-red-500'
                      : 'border-2 border-gray-600 focus:border-indigo-500'
                    : 'border-2 border-gray-600 focus:border-indigo-500'
                }`}
                
              />
              {!isCheckingUsername && userName.trim()&& (
        <Send
          onClick={handleUpdateUsername}
          className="w-10 h-10 p-2 bg-slate-700 text-slate-200 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors duration-200"
        />
      )}
      {userName.trim() && isCheckingUsername && (
        <div className="flex justify-center items-center text-center">
          <Loader2 className="w-4 h-4 animate-spin text-yellow-200" />
        </div>
      )}
    <CircleX
    onClick={()=>setOpenUserName(false)}
      className="w-10 h-10 p-2 bg-slate-700 text-slate-200 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors duration-200"/>
    </div>
  )}
          {userNameError&&(<div className='text-red-500'>{userNameError}</div>)}
          

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
                onChange={(e)=>setName(e.target.value)}
                onKeyDown={handleNameKeyDown}
                className="flex-1 px-3 py-2 bg-neutral-700 text-slate-200 border-2 border-slate-600 rounded-lg focus:outline-none focus:border-slate-500 transition-colors duration-200"
              />
              <Send
                onClick={handleUpdateName}
                className="w-10 h-10 p-2 bg-slate-700 text-slate-200 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors duration-200"
              />
            <CircleX
    onClick={()=>setOpenName(false)}
      className="w-10 h-10 p-2 bg-slate-700 text-slate-200 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors duration-200"/>
    </div>
          )}
        </div>

        <div>
          <label className="text-slate-400 text-sm mb-2 block">Email</label>
          {!openEmail ? (
            <div className="flex items-center justify-between bg-neutral-700/50 p-3 rounded-lg">
              <span className="text-slate-200 text-lg">{email}</span>
              <Pencil
                onClick={() => setOpenEmail(true)}
                className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors duration-200 cursor-pointer"
              />
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleEmailKeyDown}
                className="flex-1 px-3 py-2 bg-neutral-700 text-slate-200 border-2 border-slate-600 rounded-lg focus:outline-none focus:border-slate-500 transition-colors duration-200"
              />
              <Send
                onClick={() => setOpenEmail(false)}
                className="w-10 h-10 p-2 bg-slate-700 text-slate-200 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors duration-200"
              />
           <CircleX
    onClick={()=>setOpenEmail(false)}
      className="w-10 h-10 p-2 bg-slate-700 text-slate-200 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors duration-200"/>
    </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
