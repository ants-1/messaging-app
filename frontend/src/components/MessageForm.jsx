import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "./AuthContext";

function MessageForm({ currentChatId }) {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const payload = {
        sender: user.userId,
        content: data.content,
        is_seen: false,
      };

      const response = await fetch(
        `http://localhost:3000/chats/${currentChatId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Message created successfully", result);
        reset();
      } else {
        console.error("Error while creating message", result);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <form
      className="h-[8vh] w-full bg-gray-800 flex items-center justify-center gap-5 p-5 border-t border-gray-600"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        id="content"
        className="h-9 rounded-lg w-full max-w-96 bg-gray-700 border border-gray-600 text-gray-400 px-1"
        {...register("content", { required: true })}
      />
      <button
        className="py-1 px-3 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-700"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}

export default MessageForm;
