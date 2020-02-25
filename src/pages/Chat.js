import React, { useEffect, useState } from 'react';
import { Input, Avatar, Button } from 'antd';
import axios from 'axios';
import firestore from '../firestore/firestore';

const Chat = ({ customer, ORG_ID, chatRoomId }) => {
  const [chats, setChats] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setChats([]);
    if (chatRoomId) {
      firestore.collection('chatRoom').doc(chatRoomId).collection('chats')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          const messages = [];
          snapshot.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));
          console.log(messages);
          setChats([...messages]);
        });
    }
  }, [chatRoomId]);

  const handlePostMessage = async (event) => {
    console.log(customer);
    try {
      event.preventDefault();
      const inputValue = inputText;
      setInputText('');
      if (inputValue) {
        const { data } = await axios.post(`http://localhost:3000/connectx/api/engagement/message`, {
          chatId: chatRoomId,
          messageDetail: {
            senderId: customer.customerId,
            messageType: 'text',
            message: inputValue,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = async (message) => {
    try {
      const { data } = await axios.post(`http://localhost:3000/connectx/api/engagement/message`, {
        chatId: chatRoomId,
        messageDetail: {
          senderId: customer.customerId,
          messageType: 'response',
          message,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessageComponent = (chat) => {
    if (chat.messageType === 'text') {
      return <div className="message-text">{chat.message}</div>;
    }
    if (chat.messageType === 'response') {
      return <div className="message-text">{chat.message}</div>;
    }
    if (chat.messageType === 'buttons') {
      const buttons = chat.message.map((item, index) => (
        <Button onClick={() => handleButtonClick(item.message)} key={index}>{item.message}</Button>
      ));
      return <div className="message-buttons">{buttons}</div>;
    }
  };

  const getImage = (senderId) => {
    switch (senderId) {
      case ORG_ID: return 'https://www.hoteljob.in.th/mm/9f8b2d231d36cf58903811aa08f635e220190930113721.png';
      case 'bot': return 'https://www.hoteljob.in.th/mm/9f8b2d231d36cf58903811aa08f635e220190930113721.png';
      default: return customer.customerImage;
    }
  };

  const messages = chats.map((chat) => {
    const image = getImage(chat.senderId);
    const isSender = chat.senderId === customer.customerId;
    const message = getMessageComponent(chat);
    const time = new Date(chat.timestamp).toTimeString().substr(0, 5);

    return (
      <div key={chat.id} style={{
        display: 'flex',
        margin: '5px 10px',
        flexFlow: isSender ? 'row-reverse' : 'row',
      }}>
        <Avatar
          size="large"
          src={image}
        />
        {message}
        <div style={{ marginTop: 'auto', fontSize: '12px' }}>{time}</div>
      </div>
    );
  });

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages}
      </div>
      <form className="chat-inputbox" onSubmit={handlePostMessage}>
        <Input placeholder="Typing here..." className="chat-input" value={inputText} onChange={(e) => setInputText(e.target.value)} />
        <button>Send</button>
      </form>
    </div>
  )
};

Chat.defaultProps = {
  customerId: {},
  ORG_ID: '',
  chatRoomId: '',
};

export default Chat;
