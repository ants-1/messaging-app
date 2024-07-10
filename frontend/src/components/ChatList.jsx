import ChatCard from "./ChatCard";

function ChatList() {
  const dummyChatUsers = [
    {
      _id: 1,
      username: "Max",
      status: true,
      avater_url: "./default-avater.png",
    },
    {
      _id: 2,
      username: "Jim",
      status: false,
      avater_url: "./default-avater.png",
    },
    {
      _id: 1,
      username: "Dwight",
      status: false,
      avater_url: "./default-avater.png",
    },
  ];

  return (
    <div className="sm:w-96 w-72 bg-gray-700 h-screen border-r border-gray-600">
      <div className="flex items-center justify-between p-3 border-b h-[6vh] min-h-10">
        <h3 className="text-white">Chats</h3>
        <img
          src="./new-msg-icon.png"
          alt=""
          className="h-6 w-6 hover:cursor-pointer"
        />
      </div>
      <div className="flex flex-col w-full max-h-[94vh] overflow-y-scroll">
        {dummyChatUsers.map(user => (
            <ChatCard user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
