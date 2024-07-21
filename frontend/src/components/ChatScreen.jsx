import MessageCard from "./MessageCard";

function ChatScreen({ messages }) {
  console.log("Rendering messages:", messages);
  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-[92vh] flex flex-col p-10 items-end">
        {messages.map((message) => (
          <MessageCard message={message} key={message._id} />
        ))}
      </div>
      <div className="h-[8vh] w-full bg-gray-800 flex items-center justify-center gap-5 p-5 border-t border-gray-600">
        <input
          type="text"
          name="message"
          id="message"
          className="h-9 rounded-lg w-full max-w-96 bg-gray-700 border border-gray-600  text-gray-400 px-1"
        />
        <button className="py-1 px-3 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-700">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatScreen;
