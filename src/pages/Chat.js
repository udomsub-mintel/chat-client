import React from 'react';
import { Input } from 'antd';

const Chat = props => {
  return (
    <div className="chat-container">
      <div className="chat-messages"></div>
      <div className="chat-inputbox">
        <Input placeholder="Typing here..." className="chat-input" />
        <button>Send</button>
      </div>
    </div>
  )
};

export default Chat;
