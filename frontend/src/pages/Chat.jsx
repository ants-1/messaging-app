import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import ChatList from "../components/ChatList";
import Sidebar from "../components/Sidebar";
import ChatScreen from "../components/ChatScreen";

function Chat() {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  function handleGetMessages(chatId) {
    console.log("Clicked");
    if (user) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/chats/${chatId}/messages`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const data = await response.json();
          console.log(data);
          setMessages(data);
        } catch (error) {
          console.log("Error fetching data", error);
        }
      };
      fetchData();
    }
  }

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/users/${user.userId}/chats`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const data = await response.json();
          setChats(data);
        } catch (error) {
          console.log("Error fetching data", error);
        }
      };
      fetchData();
    }
  }, [user]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex h-screen text-white w-full">
        <ChatList chats={chats} handleGetMessages={handleGetMessages}/>
        <ChatScreen messages={messages} />
      </div>
    </div>
  );
}

export default Chat;
