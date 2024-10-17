// src/components/HelpdeskButton.tsx
import React from 'react';
import '../../assets/style.css'; // Import file CSS untuk animasi

const HelpdeskButton: React.FC = () => {
  const handleClick = () => {
    alert('Welcome to Helpdesk! How can we assist you?');
  };

  return (
    <div className="helpdesk-button" onClick={handleClick}>
      <img
        src="/logo/helpdesk.png"
        alt="Helpdesk"
        className="helpdesk-icon"
      />
    </div>
  );
};

export default HelpdeskButton;
