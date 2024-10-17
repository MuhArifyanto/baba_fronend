// src/components/HelpdeskButton.tsx
import React from 'react';
import Swal from 'sweetalert2';
import '../../assets/style.css'; // Import file CSS untuk animasi

const HelpdeskButton: React.FC = () => {
  const handleClick = () => {
    Swal.fire({
      title: 'Anda membutuhkan layanan helpdesk?',
      text: 'Klik Ok untuk chat bersama kami di WhatsApp.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Replace 'your-whatsapp-number' with the actual WhatsApp number
        window.open('https://wa.me/+6281313131967', '_blank');
      }
    });
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
