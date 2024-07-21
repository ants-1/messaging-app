function ChatCard({ chat, onClick }) {
  return (
    <div
      className="p-4 border-b border-gray-600 hover:bg-gray-600 hover:cursor-pointer"
      onClick={() => {
        onClick();
      }}
    >
      <h4 className="text-white">{chat.name}</h4>
      <p className="text-gray-400">
        {chat.is_group ? "Group Chat" : "Private Chat"}
      </p>
      <p className="text-gray-400">Users: {chat.users.length}</p>
    </div>
  );
}

export default ChatCard;
