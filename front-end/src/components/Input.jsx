import React, { useContext, useState } from 'react';
import Photo from '../img/photo.png';
import Attach from '../img/attach.png';
import AuthContext from '../context/auth-context';
import { ChatContext } from '../context/chat-context';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('senderId', currentUser.userId);
    formData.append('receiverId', data.user._id);
    if (img) formData.append('img', img);

    try {
      await fetch(`http://localhost:5000/api/messages/send`, {
        method: 'POST',
        body: formData,
      });

      setText('');
      setImg(null);
    } catch (err) {
      console.error('Send failed:', err);
    }
  };

  return (
    <div className="input">
      <input
  type="text"
  placeholder="Type..."
  onChange={(e) => setText(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && handleSend()}
  value={text}
/>

      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{ display: 'none' }} id="file" onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={Photo} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
