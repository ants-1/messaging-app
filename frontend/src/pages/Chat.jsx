import ChatList from "../components/ChatList";
import Sidebar from "../components/Sidebar";
import ChatScreen from "../components/ChatScreen";

function Chat() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex h-screen text-white w-full">
        <ChatList />
        <ChatScreen />
      </div>
    </div>
  );
}

export default Chat;
