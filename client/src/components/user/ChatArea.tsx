import ChatAreaNav from "./ChatAreaNav"
import ChatInput from "./ChatInput";
import MessageArea from "./MessageArea";

const ChatArea = () => {
  return (
      <div className="flex-grow bg-neutral-900 min-h-screen ml-[rem] w-[calc(100%-20rem)]">
        <ChatAreaNav/>
        <div className="text-white p-4">
          <MessageArea/>
        </div>
        <div className="">
          <ChatInput/>
        </div>
      </div>
    );
}

export default ChatArea