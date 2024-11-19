import ChatAreaNav from "./ChatAreaNav"
import ChatInput from "./ChatInput";
import MessageArea from "./MessageArea";

const ChatArea = ({user}) => {
  if(!user){
    return <div className="flex-grow bg-neutral-900 min-h-screen ml-[rem] w-[calc(100%-20rem)] text-white text-3xl flex font-semibold justify-center items-center">Select a user to chat with</div>
  }
  return (
      <div className="flex-grow bg-neutral-900 min-h-screen w-[calc(100%-20rem)]">
        <ChatAreaNav user={user}/>
        <div className="text-white p-4">
          <MessageArea user={user}/>
        </div>
        <div className="">
          <ChatInput/>
        </div>
      </div>
    );
}

export default ChatArea