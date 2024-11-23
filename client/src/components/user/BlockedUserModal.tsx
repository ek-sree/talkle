import avatar from '../../../public/images/9286c820b0386e71f0ad7fec5f59c7c4.jpg'
import { X } from 'lucide-react'

const BlockedUserModal = ({isOpen, onClose}) => {
    if(!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className='relative w-96 h-[600px] bg-neutral-800 rounded-xl'>
                {/* Sticky header container */}
                <div className="sticky top-0 z-10 bg-neutral-800 pt-3 pb-2">
                    <button>
                        <X 
                            size={48} 
                            onClick={onClose} 
                            className='absolute top-4 right-4 z-10 bg-black/70 p-4 text-white rounded-full hover:bg-black/20'
                        />
                    </button>
                    <div className='text-xl text-slate-300 text-center'>
                        BlockedUsers
                    </div>
                </div>

                {/* Scrollable content container */}
                <div className='h-[calc(600px-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-slate-600'>
                    <div className='flex gap-4 justify-evenly border-b-2 py-2 rounded-lg border-neutral-600 hover:bg-neutral-700 mb-3'>
                        <img src={avatar} alt="" className='w-14 h-14 rounded-full'/>
                        <span className='items-center flex text-lg text-neutral-300'>Sreehari</span>
                        <button className='bg-gradient-to-t from-red-500 to-red-600 h-7 px-4 rounded-lg mt-4 cursor-pointer'>unblock</button>
                    </div>

                    <div className='flex gap-4 justify-evenly border-b-2 py-2 rounded-lg border-neutral-600 hover:bg-neutral-700'>
                        <img src={avatar} alt="" className='w-14 h-14 rounded-full'/>
                        <span className='items-center flex text-lg text-neutral-300'>Sreehari</span>
                        <button className='bg-gradient-to-t from-red-500 to-red-600 h-7 px-4 rounded-lg mt-4 cursor-pointer'>unblock</button>
                    </div>

                    <div className='flex gap-4 justify-evenly border-b-2 py-2 rounded-lg border-neutral-600 hover:bg-neutral-700'>
                        <img src={avatar} alt="" className='w-14 h-14 rounded-full'/>
                        <span className='items-center flex text-lg text-neutral-300'>Sreehari</span>
                        <button className='bg-gradient-to-t from-red-500 to-red-600 h-7 px-4 rounded-lg mt-4 cursor-pointer'>unblock</button>
                    </div>

                    <div className='flex gap-4 justify-evenly border-b-2 py-2 rounded-lg border-neutral-600 hover:bg-neutral-700'>
                        <img src={avatar} alt="" className='w-14 h-14 rounded-full'/>
                        <span className='items-center flex text-lg text-neutral-300'>Sreehari</span>
                        <button className='bg-gradient-to-t from-red-500 to-red-600 h-7 px-4 rounded-lg mt-4 cursor-pointer'>unblock</button>
                    </div>

                    <div className='flex gap-4 justify-evenly border-b-2 py-2 rounded-lg border-neutral-600 hover:bg-neutral-700'>
                        <img src={avatar} alt="" className='w-14 h-14 rounded-full'/>
                        <span className='items-center flex text-lg text-neutral-300'>Sreehari</span>
                        <button className='bg-gradient-to-t from-red-500 to-red-600 h-7 px-4 rounded-lg mt-4 cursor-pointer'>unblock</button>
                    </div>

                    <div className='flex gap-4 justify-evenly border-b-2 py-2 rounded-lg border-neutral-600 hover:bg-neutral-700'>
                        <img src={avatar} alt="" className='w-14 h-14 rounded-full'/>
                        <span className='items-center flex text-lg text-neutral-300'>Sreehari</span>
                        <button className='bg-gradient-to-t from-red-500 to-red-600 h-7 px-4 rounded-lg mt-4 cursor-pointer'>unblock</button>
                    </div>

                    <div className='flex gap-4 justify-evenly border-b-2 py-2 rounded-lg border-neutral-600 hover:bg-neutral-700'>
                        <img src={avatar} alt="" className='w-14 h-14 rounded-full'/>
                        <span className='items-center flex text-lg text-neutral-300'>Sreehari</span>
                        <button className='bg-gradient-to-t from-red-500 to-red-600 h-7 px-4 rounded-lg mt-4 cursor-pointer'>unblock</button>
                    </div>

                    <div className='flex gap-4 justify-evenly border-b-2 py-2 rounded-lg border-neutral-600 hover:bg-neutral-700'>
                        <img src={avatar} alt="" className='w-14 h-14 rounded-full'/>
                        <span className='items-center flex text-lg text-neutral-300'>Sreehari</span>
                        <button className='bg-gradient-to-t from-red-500 to-red-600 h-7 px-4 rounded-lg mt-4 cursor-pointer'>unblock</button>
                    </div>

                    <div className='flex gap-4 justify-evenly border-b-2 py-2 rounded-lg border-neutral-600 hover:bg-neutral-700'>
                        <img src={avatar} alt="" className='w-14 h-14 rounded-full'/>
                        <span className='items-center flex text-lg text-neutral-300'>Sreehari</span>
                        <button className='bg-gradient-to-t from-red-500 to-red-600 h-7 px-4 rounded-lg mt-4 cursor-pointer'>unblock</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlockedUserModal
