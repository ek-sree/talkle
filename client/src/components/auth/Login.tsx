import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_ENDPOINTS } from "../../api/endpoints/authEndpoints";
import { useDispatch } from "react-redux";
import { setUser } from "../../states/redux/slice/userSlice";
import { Toaster, toast } from 'sonner'
import Axios from "../../api/axios/axios";
import { Eye, EyeClosed, Loader2, Lock, Mail } from "lucide-react";


const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError]= useState({emailError:'', passwordError:''});
  const [viewPass, setViewPass] = useState<boolean>(false)
  
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleViewPass=()=>{
    setViewPass((prev)=>!prev)
  }

  const handleSubmit= async()=>{
    let valid=true;
    if(!email.trim()){
      setError((prev)=>({...prev, emailError:"Email cant be empty"}))
      valid=false;
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())){
      setError((prev)=>({...prev, emailError:"Invalid Email"}))
      valid=false;
    }else{
      setError((prev)=>({...prev, emailError:""}))
    }

    if(!password.trim()){
      setError((prev)=>({...prev, passwordError:"Password cant be empty"}))
      valid=false
    }else if(password.trim().length < 3){
      setError((prev)=>({...prev, passwordError:"wrong Password"}))
      valid=false
    }else{
      setError((prev)=>({...prev, passwordError:""}))
    }
    if(valid){
      try {
        setLoading(true)
        const response = await Axios.post(AUTH_ENDPOINTS.LOGIN, {email, password})
        console.log(response);
          if (response.status === 200) {
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
            } catch (error: any) {
              if (error.response) {
                if (error.response.status === 404) {
                  toast.error(error.response.data.message || "Email or password incorrect");
                } else {
                  toast.error("An error occurred while logging in. Please try again.");
                }
              } else {
                toast.error("Network error. Please check your connection.");
              }
            }finally{
              setLoading(false)
            }
          }
        };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <Toaster position="top-center" expand={false} richColors/>
      <div className="bg-gray-800 w-[25rem] p-8 rounded-xl">
        <p className="text-center font-bold text-2xl mb-2 bg-gradient-to-t from-violet-600 to-rose-500 bg-clip-text text-transparent">
          Talkle
        </p>
        <p className="text-center font-bold text-xl mb-4 bg-gradient-to-t from-violet-200 to-indigo-500 bg-clip-text text-transparent">
          Welcome back buddy!
        </p>
        <p className="mb-3 text-xl text-neutral-400 text-center">Login in.!</p>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col w-full max-w-xs">
            <div className="relative top-8 left-72">

          <Mail className="text-slate-400"/>
            </div>
            <input
            value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Email"
              className="py-2 px-4 rounded-xl mb-4 border-2 border-slate-400 bg-slate-600"
            />
            {error.emailError &&( <div className="text-red-500">{error.emailError}</div> )}
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <div onClick={handleViewPass} className="relative top-8 left-72 cursor-pointer">
            {!password?(<Lock className="text-slate-400"/>):(
              viewPass==false?(
                <EyeClosed className="text-slate-400 hover:text-slate-700"/>
              ):(
            <Eye className="text-slate-400 hover:text-slate-700"/>))}
            </div>
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
              type={viewPass? 'text': 'password'}
              name="password"
              id="password"
              className="py-2 px-4 mb-4 rounded-xl border-2 border-slate-400 bg-slate-600"
              placeholder="Password"
            />
            {error.passwordError &&( <div className="text-red-500">{error.passwordError}</div> )}
            <div className="flex items-center space-x-2 cursor-pointer">
             <p className="text-neutral-400 hover:text-neutral-300">forgot password ?</p>
            </div>
          </div>

          <button 
  onClick={handleSubmit} 
  disabled={loading} 
  className="py-2 w-full bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-xl mt-4 hover:from-blue-600 hover:to-indigo-600 mb-5 flex items-center justify-center gap-2"
>
  {loading ? (
    <>
      <Loader2 className="w-5 h-5 animate-spin" />
      <span>Login...</span>
    </>
  ) : (
    "Login"
  )}
</button>
        </div>
        <Link to='/signup' className="flex justify-center"><span className="text-slate-300 hover:text-slate-200 cursor-pointer">Don't have an account in <span className="bg-gradient-to-t from-violet-600 to-rose-500 bg-clip-text text-transparent">Talkle</span> ?</span></Link>
      </div>
    </div>
  );
};

export default Login;
