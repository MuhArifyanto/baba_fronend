// src/pages/ChatHelpdesk.tsx
import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import '../../assets/style.css';

interface Message {
  sender: 'user' | 'helpdesk';
  text: string;
}

const ChatHelpdesk: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: Message = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);
    setInput('');

    // Mock helpdesk response
    setTimeout(() => {
      const helpdeskResponse: Message = { sender: 'helpdesk', text: 'Terima kasih, kami akan segera membantu!' };
      setMessages((prevMessages) => [...prevMessages, helpdeskResponse]);
    }, 1000);
  };

  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h2 className="text-center">Helpdesk Chat</h2>
      <ListGroup className="chat-box">
        {messages.map((msg, index) => (
          <ListGroup.Item
            key={index}
            className={msg.sender === 'user' ? 'user-message' : 'helpdesk-message'}
          >
            {msg.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <InputGroup className="chat-input">
        <FormControl
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnterKey}
        />
        <Button variant="primary" onClick={handleSendMessage}>
          Kirim
        </Button>
      </InputGroup>
    </div>
  );
};

export default ChatHelpdesk;
