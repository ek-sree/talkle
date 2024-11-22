import { Search } from "lucide-react"
import dummyUserCall from '../../constant/dummyUserCall.json'

const PhoneList = ({onSelectUserCall}) => {
    return ( 
        <div className="bg-neutral-800 min-h-screen w-96 ml-[3rem] p-4"> 
            <div className="flex items-center gap-4 mb-6"> 
                <div className="relative flex-grow"> 
                    <input 
                        type="text" 
                        placeholder="Search users" 
                        className="w-full pl-10 pr-4 py-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-none"
                    /> 
                    <Search 
                        color="gray" 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    /> 
                </div>
              {/* // */}
            </div> 
            <div className="overflow-y-auto max-h-[calc(100vh-14vh)] pr-2">
                {dummyUserCall.map((user) => (
                    <div
                    onClick={()=>onSelectUserCall(user)} 
                        key={user.id} 
                        className="mt-6 ml-2 flex border-b border-neutral-700 pb-4 last:border-b-0 cursor-pointer hover:bg-slate-800"
                    >
                        <img 
                            src={user.avatar} 
                            alt="profile-dp" 
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="flex flex-col flex-grow ml-4">
                            <span className="text-white">{user.name}</span>
                            <span className="text-slate-400 text-sm">{user.date}</span>
                            <span className="text-slate-400 text-sm">{user.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div> 
      ) 
    } 
     

export default PhoneList