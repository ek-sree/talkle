import { useEffect, useRef, useState } from "react"
import { AUTH_ENDPOINTS } from "../../api/endpoints/authEndpoints";
import { useNavigate } from "react-router-dom";
import { IEmailVerify } from "../../interface/IEmailVerify";
import { Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import Axios from "../../api/axios/axios";

const Otp = () => {
    const [otp, setOtp] = useState<string[]>(Array(4).fill(""))
    const [timer,setTimer] = useState(60)
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const inputRef = useRef<(HTMLInputElement | null)[]>([]); 

    const navigate = useNavigate();

    
    useEffect(()=>{
        inputRef.current[0]?.focus()
    },[])

    useEffect(()=>{
        setTimeout(() => {
            if(timer>0)
            setTimer((prev)=>prev-1)
        }, 1000);
    },[timer])


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const currentValue = e.target.value;
            if (/^[0-9]$/.test(currentValue)) {
            const newOtp = [...otp];
            newOtp[index] = currentValue;
            setOtp(newOtp);
                if (currentValue && index < inputRef.current.length - 1) {
                inputRef.current[index + 1]?.focus();
            }
        } else {
            e.target.value = "";
        }
    };
    

    const handleBackSpace=(e:React.KeyboardEvent<HTMLInputElement>, index:number)=>{
        if(e.key=='ArrowLeft'){
            inputRef.current[index-1]?.focus()
        }
        if(e.key == 'ArrowRight'){
            inputRef.current[index+1]?.focus()
        }
        if(e.key =='Backspace' && index >0){
            const currentInput = inputRef.current[index]
            if(currentInput?.value){
                currentInput.value ='';
            }else if(index > 0){
                inputRef.current[index-1]?.focus()
            }
        }
        
    }

    const handleSubmit= async()=>{
      setLoading(true);
        try {
          const otpValue = otp.join('');
          console.log(otpValue);
          
          const response = await Axios.post(AUTH_ENDPOINTS.OTPVERIFY,{otp:otpValue});
          console.log(response);
          
          switch(response.data.data.verifyType){
            case IEmailVerify.Register:
              localStorage.setItem("flowAction","verifyed")
              localStorage.setItem("email",response.data.data.email);
              navigate('/profile-create')
              break;

            case IEmailVerify.ForgotPassword:
              localStorage.setItem("email",response.data.data.email);
              navigate('/login')
              break;
              
            case IEmailVerify.NewPassword:
              localStorage.setItem("email",response.data.data.email);
              navigate('/settings')
              break;

            case IEmailVerify.EmailChange:
              localStorage.setItem("email",response.data.data.email);
              navigate('/settings')  
              break;

              default:
                setError(response.data.message)
                break;
          }
        } catch (error: any) {
          if (error.response) {
            if (error.response.status === 400) {
              toast.error(error.response.data.message || "Entered otp is wrong");
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

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
            <Toaster position="top-center" expand={false} richColors/>
      <div className="bg-gray-800 w-[27rem] p-8 rounded-xl">
        <p className="text-center font-bold text-white text-2xl mb-5 bg-gradient-to-t from-violet-600 to-rose-500 bg-clip-text text-transparent">
          Talkle
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-between w-full max-w-xs gap-2">
        {Array.from({length:4}).map((_,index)=>(
            <input
            key={index}
              type="text"
              id="otp"
              ref={(el) => (inputRef.current[index] = el)}
              maxLength={1}
              onChange={(e)=>handleInputChange(e,index)}
              onKeyDown={(e)=>handleBackSpace(e, index)}
              className="py-2 px-4 w-14 text-center rounded-xl border-2 border-slate-400 bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        ))}
        {error &&(
          <div className="text-red-500">{error}</div>
        )}
          </div>
        {timer>0 &&(<span className="text-slate-300">Resend otp in {timer}</span>)}
        {timer > 0 ? (
                        <button 
                            onClick={handleSubmit} 
                            disabled={loading}
                            className={`py-2 w-full bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-xl mt-4 hover:from-blue-600 hover:to-indigo-600 mb-5 flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                "Confirm"
                            )}
                        </button>
                    ) : (
                        <button 
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`py-2 w-full bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-xl mt-4 hover:from-blue-600 hover:to-indigo-600 mb-5 flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Sending...</span>
                                </>
                            ) : (
                                "Resend OTP"
                            )}
                        </button>
                    )}
        </div>
        
      </div>
    </div>
  )
}

export default Otp