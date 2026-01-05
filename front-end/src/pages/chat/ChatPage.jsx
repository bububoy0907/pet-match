import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import Header from "../../components/Header";
import shopLogo1 from "../../assets/shops/pet-shop1-logo.jpg";
import shopLogo2 from "../../assets/shops/pet-shop2-logo.jpg";
import photoIcon from "../../assets/shops/photo.png";

import "./ChatPage.css";

function nowHHMM() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Shared demo messages (for syncing both sides)
const initialMessages = [
  { fromMe: false, text: "Hi there!", time: nowHHMM() },
  { fromMe: true, text: "Hello, how can I help?", time: nowHHMM() },
];

export default function ChatPage() {
  const { isLoggedIn, username, accountType } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("Please login to use chat.");
      navigate("/account");
    }
  }, [isLoggedIn, navigate]);

  // Define contacts for customer and business views
  const demoBusinessContacts = [
    {
      id: "shop1",
      name: "Golden Tails Pet Shop",
      logo: shopLogo1,
      last: { text: initialMessages[1].text, time: initialMessages[1].time },
      msgs: [...initialMessages],
    },
    {
      id: "shop2",
      name: "Happy Paws",
      logo: shopLogo2,
      last: { text: "Thanks for your message!", time: "Yesterday" },
      msgs: [{ fromMe: false, text: "Thanks for your message!", time: "Yesterday" }],
    },
  ];

  const demoCustomerContacts = [
    {
      id: "johnDoe",
      name: "John Doe",
      logo: "https://i.pravatar.cc/100?u=johnDoe",
      last: { text: initialMessages[1].text, time: initialMessages[1].time },
      msgs: [...initialMessages],
    },
    {
      id: "janeSmith",
      name: "Jane Smith",
      logo: "https://i.pravatar.cc/100?u=janeSmith",
      last: { text: "Hi there, do you have Golden Retrievers?", time: nowHHMM() },
      msgs: [{ fromMe: false, text: "Hi there, do you have Golden Retrievers?", time: nowHHMM() }],
    },
    {
      id: "bobbyLee",
      name: "Bobby Lee",
      logo: "https://i.pravatar.cc/100?u=bobbyLee",
      last: { text: "Is this puppy still available?", time: "Yesterday" },
      msgs: [{ fromMe: false, text: "Is this puppy still available?", time: "Yesterday" }],
    },
  ];

  const [contacts, setContacts] = useState(
    accountType === "business" ? demoCustomerContacts : demoBusinessContacts
  );
  const [activeId, setActiveId] = useState(
    (accountType === "business" ? demoCustomerContacts[0] : demoBusinessContacts[0]).id
  );
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  const active = contacts.find((c) => c.id === activeId);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [contacts, activeId]);

  const appendMessage = (msgObj) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              msgs: [...c.msgs, msgObj],
              last: { text: msgObj.text ?? "📷 Image", time: msgObj.time },
            }
          : c
      )
    );
  };

  const handleSend = () => {
    if (!input.trim()) return;
    appendMessage({ fromMe: true, text: input.trim(), time: nowHHMM() });
    setInput("");
  };

  return (
    <>
      <Header />
      <div className="chatpage">
        {/* CONTACT LIST */}
        <aside className="contact-list">
          <h2 className="list-title">Contact List</h2>
          <div className="search-box">
            <input placeholder={accountType === "business" ? "Search customer…" : "Search pet shop…"} />
          </div>
          <div className="contacts-scroll">
            {contacts.map((c) => (
              <div
                key={c.id}
                className={`contact ${c.id === activeId ? "active" : ""}`}
                onClick={() => setActiveId(c.id)}
              >
                <img src={c.logo} alt="" />
                <div className="c-info">
                  <span className="c-name">{c.name}</span>
                  <span className="c-last">{c.last.text}</span>
                </div>
                <span className="c-time">{c.last.time}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* CHAT BOX */}
        <section className="chat-box">
          <div className="chat-head">
            <h3>{active.name}</h3>
          </div>
          <div className="chat-body">
            {active.msgs.map((m, i) => (
              <div key={i} className={`msg ${m.fromMe ? "me" : "them"}`}>
                {m.img ? <img src={m.img} alt="upload" /> : <p>{m.text}</p>}
                <span className="msg-time">{m.time}</span>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="chat-input">
            <label>
              <img src={photoIcon} alt="add" />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    appendMessage({ fromMe: true, img: url, time: nowHHMM() });
                  }
                }}
              />
            </label>
            <input
              className="type-box"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </section>
      </div>
    </>
  );
}
