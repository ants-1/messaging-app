function ChatCard({ user }) {
  return (
    <div className="w-full h-20 bg-gray-700 hover:bg-gray-800 hover:cursor-pointer  p-4 flex items-center gap-2">
      <img src={user.avater_url} alt="" className="rounded-full w-12 h-12 bg-black p-1"/>
      <div className="">
        <p className="font-semibold">{user.username}</p>
        <div>
          {user.status ? (
            <p className="font-thin text-sm">Online</p>
          ): (
            <p className="font-thin text-sm">Offline</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatCard;
