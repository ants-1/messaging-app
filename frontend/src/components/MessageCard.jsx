import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function MessageCard({ message, currentChatId }) {
  const { user } = useContext(AuthContext);

  function handleDeleteMessage(chatId, messageId) {
    if (user && user.userId == message.sender._id) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/chats/${chatId}/messages/${messageId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const result = await response.json();
          if (response.ok) {
            console.log(result);
          }
        } catch (error) {
          console.log("Error fetching data", error);
        }
      };
      fetchData();
    }
  }

  return (
    <div className=" flex flex-col justify-center p-5 gap-5 max-w-96 w-fit bg-gray-700 mb-5 rounded-lg border border-gray-500">
      <p>{message.content}</p>
      <div className="flex gap-5 justify-between">
        <p className="text-sm font-thin">- {message.sender.username}</p>
        {user.userId === message.sender._id && (
          <img
            src="./delete-icon.png"
            className="w-5 h-5 cursor-pointer"
            alt="Delete icon"
            onClick={() => handleDeleteMessage(currentChatId, message._id)}
          />
        )}
      </div>
    </div>
  );
}

export default MessageCard;
