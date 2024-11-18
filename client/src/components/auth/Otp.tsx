import { useEffect, useRef, useState } from "react"

const Otp = () => {
    const [otp, setOtp] = useState<string[]>(Array(4).fill(""))
    const [timer,setTimer] = useState(5)

    const inputRef = useRef<(HTMLInputElement | null)[]>([]); 

    
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

    const handleSubmit=()=>{
        console.log(otp);
        
    }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
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
          </div>
        <span className="text-slate-300">Resend otp in {timer}</span>
          {timer>0?(<button onClick={handleSubmit} className="py-2 w-full bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-xl mt-4 hover:from-blue-600 hover:to-indigo-600 mb-5">
            Confirm
          </button>):(
          <button onClick={handleSubmit} className="py-2 w-full bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-xl mt-4 hover:from-blue-600 hover:to-indigo-600 mb-5">
          Resend Otp
        </button>)}
        </div>
        
      </div>
    </div>
  )
}

export default Otp