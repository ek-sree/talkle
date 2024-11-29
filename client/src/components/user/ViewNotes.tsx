import { X } from "lucide-react"

const ViewNotes = ({isOpen, onClose}) => {

    if(!isOpen) return null

  return (
    <div className="bg-black/70 inset-0 fixed z-50 flex justify-center items-center">
          <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
      >
        <X size={40} />
      </button>
        <div className="bg-neutral-800/70 py-4 rounded-md px-4">
        <h1 className="text-slate-400 justify-center flex mb-5 font-normal text-lg">ViewNotes</h1>
        <div className="flex flex-col">
        <span className="text-neutral-300 text-lg bg-neutral-800 py-2 px-3 rounded-lg border-slate-800">Hello I am Robert we seen in today at park.</span>
        
        <button className="bg-indigo-500 rounded-lg mt-3 text-slate-200 py-1 hover:bg-indigo-600">Add</button>
        <button className="bg-red-500 rounded-lg mt-3 text-slate-200 py-1 hover:bg-red-600">Block</button>
        </div>
        </div>
    </div>
  )
}

export default ViewNotes