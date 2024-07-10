function MessageCard({ message }) {
  return (
    <div className=" flex flex-col justify-center p-5 gap-5 max-w-full w-fit bg-gray-700 mb-5 rounded-lg border border-gray-500">
      <div>{message.content}</div>
      <p className="text-sm font-thin">- {message.sender}</p>
    </div>
  );
}

export default MessageCard;
