import { ArrowDownNarrowWide, Search, UserRoundPlus } from "lucide-react" 
import avatar from '../../../public/images/9286c820b0386e71f0ad7fec5f59c7c4.jpg'
 
const UserList = () => { 
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
            <button className="hover:bg-neutral-700 p-2 rounded-full transition-colors">
                <UserRoundPlus color="white" className="w-6 h-6"/> 
            </button>
            <button className="hover:bg-neutral-700 p-2 rounded-full transition-colors">
                <ArrowDownNarrowWide color="white" className="w-6 h-6"/> 
            </button>
        </div> 
        <div className="overflow-y-auto max-h-[calc(100vh-14vh)] pr-2">
            {[...Array(12)].map((_, index) => (
                <div 
                    key={index} 
                    className="mt-6 ml-2 flex border-b border-neutral-700 pb-4 last:border-b-0"
                >
                    <img 
                        src={avatar} 
                        alt="profile-dp" 
                        className="w-12 h-12 rounded-full"
                    />
                    <div className="flex flex-col flex-grow ml-4">
                        <span className="text-white">Sreehari E K</span>
                        <span className="text-slate-400 text-sm">Call me when u are free</span>
                    </div>
                    <span className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center font-mono ml-4">3</span>
                </div>
            ))}
        </div>
    </div> 
  ) 
} 
 
export default UserList