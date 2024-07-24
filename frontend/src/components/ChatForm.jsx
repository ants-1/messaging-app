import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "./AuthContext";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function ChatForm() {
  const { register, handleSubmit, control } = useForm();
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [chatUsers, setChatUsers] = useState([user.userId]);
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3000/users");
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.log("Error while fetching data", error);
        }
      };
      fetchData();
    }
  }, [user]);

  const handleAddUser = () => {
    if (selectedUser && !chatUsers.includes(selectedUser)) {
      setChatUsers([...chatUsers, selectedUser]);
    }
  };

  const onSubmit = async (data) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const newChatData = {
        name: data.name,
        is_group: chatUsers.length > 2,
        users: chatUsers,
        messages: [],
      };

      const response = await fetch(
        `http://localhost:3000/users/${user.userId}/chats`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(newChatData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("New Chat created", result);
        navigate("/chats");
      }
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="chat-name" className="text-white">
            Chat Name:
          </label>
          <input
            type="text"
            id="chat-name"
            {...register("name", { required: true })}
            className="h-9 rounded-lg w-full max-w-96 bg-gray-700 border border-gray-600 text-gray-400 px-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="new-user" className="text-white">
            Add User:
          </label>
          <Controller
            name="newUser"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                id="new-user"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="h-9 rounded-lg w-full max-w-96 bg-gray-700 border border-gray-600 text-gray-400 px-1"
              >
                <option value="">Select a user</option>
                {users.map((u) => (
                  <option value={u._id} key={u._id}>
                    {u.username}
                  </option>
                ))}
              </select>
            )}
          />
          <button
            type="button"
            onClick={handleAddUser}
            className="py-1 px-3 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white mt-2"
          >
            Add User
          </button>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="py-1 px-3 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Create Chat
          </button>
        </div>
        <div>
          <h3 className="text-white">Selected Users:</h3>
          <ul className="text-white">
            {chatUsers.map((userId) => (
              <li key={userId}>
                {users.find((user) => user._id === userId)?.username}
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default ChatForm;
