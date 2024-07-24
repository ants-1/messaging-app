/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ChatCard from "./ChatCard";

function ChatList({ chats, handleGetMessages }) {
  return (
    <div className="sm:w-96 w-72 bg-gray-700 h-screen border-r border-gray-600">
      <div className="flex items-center justify-between p-3 border-b h-[6vh] min-h-10">
        <h3 className="text-white">Chats</h3>
        <Link to="/add-chat">
          <img
            src="./new-msg-icon.png"
            alt=""
            className="h-6 w-6 hover:cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex flex-col w-full max-h-[94vh] overflow-y-scroll">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatCard
              chat={chat}
              key={chat._id}
              onClick={() => {
                handleGetMessages(chat._id);
              }}
            />
          ))
        ) : (
          <p className="text-white text-center mt-3 bg-gray-700">
            No chats available
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatList;
