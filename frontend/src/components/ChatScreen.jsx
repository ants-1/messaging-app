import MessageCard from "./MessageCard";
import MessageForm from "./MessageForm";

function ChatScreen({ currentChatId, messages }) {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-[92vh] flex flex-col p-10 items-end overflow-auto">
        {messages.map((message) => (
          <MessageCard message={message} key={message._id} />
        ))}
      </div>
      <MessageForm currentChatId={currentChatId}/>
    </div>
  );
}

export default ChatScreen;
