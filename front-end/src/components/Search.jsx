import React, { useState } from "react";
import Avatar from "../img/default-avatar.png";

const Search = ({ currentUserId }) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [latestMessage, setLatestMessage] = useState(null);

  const handleSearch = async () => {
    try {
      console.log("Searching for:", username);

      const res = await fetch(`http://localhost:5000/api/users/find/${username}`);
      if (!res.ok) throw new Error("User not found");

      const data = await res.json();
      console.log("User found:", data);
      setUser(data);
      setErr(false);

      // Check if currentUserId and user ID exist before fetching latest message
      if (!currentUserId || !data._id) {
        console.warn("Missing user IDs for message fetch.");
        return;
      }

      const msgRes = await fetch(`http://localhost:5000/api/messages/latest/${currentUserId}/${data._id}`);
      if (!msgRes.ok) {
        console.warn("No latest message found.");
        setLatestMessage(null);
        return;
      }

      const msgData = await msgRes.json();
      setLatestMessage(msgData.content || null);
    } catch (err) {
      console.error("Search error:", err);
      setErr(true);
      setUser(null);
      setLatestMessage(null);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") handleSearch();
  };

  const handleSelect = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/conversations/findOrCreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: currentUserId,
          receiverId: user._id,
        }),
      });

      const convo = await res.json();
      console.log("Chat ready:", convo);

      setUser(null);
      setUsername("");
      setLatestMessage(null);
    } catch (err) {
      console.error("Error creating or finding chat:", err);
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>

      {err && <span>User not found!</span>}

      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL || Avatar} alt={user.username} />
          <div className="userChatInfo">
            <span>{user.username}</span>
            <p>{latestMessage || "Create chat"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
