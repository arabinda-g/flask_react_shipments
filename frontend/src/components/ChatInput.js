import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function ChatInput({ onSendMessage, sendingMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== '' && !sendingMessage) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        autoFocus
        disabled={sendingMessage}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="submit" disabled={sendingMessage}>Submit</button>
      </div>
    </form>
  );
}

export default ChatInput;
