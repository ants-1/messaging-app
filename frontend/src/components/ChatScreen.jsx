import MessageCard from "./MessageCard";

function ChatScreen() {
  const dummyMessages = [
    {
      _id: 1,
      sender: "Max", 
      content: "Hello, how are you?",
      chat: "60d0fe4f5311236168a109cb", 
      is_seen: false,
      timestamp: new Date(), 
    },
    {
      _id: 2,
      sender: "Jim", 
      content: "Hey, did you finish the report?",
      chat: "60d0fe4f5311236168a109ce", 
      is_seen: true,
      timestamp: new Date("2023-07-09T12:34:56Z"), 
    },
    {
      _id: 3,
      sender: "Pam", 
      content: "Let's meet at the cafe at 5.",
      chat: "60d0fe4f5311236168a109d0",
      is_seen: false,
      timestamp: new Date("2023-07-10T08:22:33Z"), 
    },
    {
      _id: 4,
      sender: "Dwight", 
      content: "Can you send me the document?",
      chat: "60d0fe4f5311236168a109d2",
      is_seen: true,
      timestamp: new Date("2023-07-11T15:45:00Z"), 
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-[92vh] flex flex-col p-10 items-end">
        {dummyMessages.map((message) => (
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
