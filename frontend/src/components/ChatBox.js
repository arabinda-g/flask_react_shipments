import React, { useEffect, useRef } from 'react';

function ChatBox({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-messages" style={{ maxHeight: '100%', overflowY: 'auto' }}>
      {messages.map((msg, index) => (
        <div key={index} className={`d-flex justify-content-${msg.sender === 'User' ? 'end' : 'start'}`}>
          <div className={`card text-white bg-${msg.sender === 'User' ? 'primary' : 'secondary'} mb-3`}>
            <div className="card-body">
              <p className="card-text">{msg.message}</p>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />  {}
    </div>
  );
}

export default ChatBox;
