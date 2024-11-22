import { CalendarArrowUp, Clock1, PhoneCall, Timer, Video } from "lucide-react";
import calls from '../../constant/call.json'

const PhoneArea = ({userCall}) => {
console.log(userCall);


    if(!userCall)return <div className="flex-grow bg-neutral-900 min-h-screen ml-[rem] w-[calc(100%-20rem)] text-white text-3xl flex font-semibold justify-center items-center">Select a user to view call details 📞</div>
  return (
    <div className="flex-grow bg-neutral-900 min-h-screen ml-[rem] w-[calc(100%-20rem)] text-white text-3xl font-semibold">
        <div className="justify-end mt-6 gap-8 flex mr-9">
        <button className="bg-slate-800 py-3 px-5 rounded-xl hover:bg-slate-700">
        <PhoneCall className="text-gray-200 group-hover:text-gray-900" size={24} />
        </button>
        <button className="bg-slate-800 py-3 px-5 rounded-xl hover:bg-slate-700">
        <Video className="text-gray-200 group-hover:text-gray-900" size={24} />
        </button>
        </div>
        {calls.map((call)=>(<div className="flex gap-3 mt-6 ml-10 bg-slate-900  p-4 justify-evenly hover:bg-slate-700">
          <div className="text-lg text-slate-400"><Timer />{call.duriation} min</div>
          <div className="text-lg text-slate-400"> <CalendarArrowUp />{call.date}</div>
          <div className="text-lg text-slate-400"><Clock1 /> {call.time}</div>
        </div>))}
    </div>
  )
}

export default PhoneArea