import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { IUserInput } from "../../interface/IUserInput"
import authAxios from "../../api/axios/authAxios"
import { AUTH_ENDPOINTS } from "../../api/endpoints/authEndpoints"
import { Loader2 } from "lucide-react"

const Signup = () => {

  const [formData, setFormData]= useState<IUserInput>({email:'', password:''})
  const [error,setError] = useState<{email?:string; password?:string}>({})
  const [loading,setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6 && /\d/.test(password);
  };


  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if(error[name as keyof IUserInput]){
      setError((prev)=>({...prev, [name]:undefined}))
    }
  }


  
  const handleSubmit= async()=>{   
    const errors :{email?: string; password?:string} ={}
    
    if(!formData.email){
      errors.email = "Email required"
    }else if(!validateEmail(formData.email)){
      errors.email="Enter a valid email"
    }

    if(!formData.password){
      errors.password="Password required"
    }else if(!validatePassword(formData.password)){
      errors.password="Password must be at least 6 characters and include a number"
    }
    setError(errors)
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true)
        const response = await authAxios.post(AUTH_ENDPOINTS.REGISTER, formData);
        if(response.status==200){
          navigate('/otp')
        }
      } catch (error) {
        console.error("Error signup", error);
      }finally{
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 w-[25rem] p-8 rounded-xl">
        <p className="text-center font-bold  text-2xl mb-2 bg-gradient-to-t from-violet-600 to-rose-500 bg-clip-text text-transparent">
          Talkle
        </p>
        <p className="text-center font-bold text-xl mb-4 bg-gradient-to-t from-violet-200 to-indigo-500 bg-clip-text text-transparent">
          Chat with random peoples.!
        </p>
        <p className="mb-3 text-xl text-neutral-400 text-center">Sign up Now.!</p>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col w-full max-w-xs">
            <input
             value={formData.email}
             onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={`py-2 px-4 rounded-xl mb-4 border-2 ${error.email ? "border-red-500" : "border-slate-400"} bg-slate-600`}
              />
              {error.email &&( <div className="text-red-500">{error.email}</div>) }
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <input
             value={formData.password}
             onChange={handleChange}
              type="password"
              name="password"
              id="password"
              className={`py-2 px-4 mb-4 rounded-xl border-2 ${error.password ? "border-red-500" : "border-slate-400"} bg-slate-600`}
              placeholder="Password"
            />
              {error.password && (<div className="text-red-500">{error.password}</div>)}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="save-pass"
                id="save-pass"
                className="text-center accent-slate-500"
              />
              <label htmlFor="save-pass" className="text-slate-400">
                Save password
              </label>
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
      <span>Signing up...</span>
    </>
  ) : (
    "Sign Up"
  )}
</button>
        </div>
        <Link to='/login' className="flex justify-center"><span className="text-slate-300 hover:text-slate-200 cursor-pointer">Already have an account in <span className="bg-gradient-to-t from-violet-600 to-rose-500 bg-clip-text text-transparent">Talkle</span> ?</span></Link>
      </div>
    </div>
  )
}

export default Signup