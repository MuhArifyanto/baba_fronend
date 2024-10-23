// src/pages/ChatHelpdesk.tsx
import React, { useState } from 'react';
import { Button, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import Layout from '../../main/Layout';
import '../../../assets/style.css';

interface Message {
  sender: 'user' | 'helpdesk';
  text: string;
}

// Data dummy untuk FAQ
const faqData = [
  {
    topic: 'Layanan Pembuatan Web',
    qna: [
      {
        question: 'Layanan aplikasi terdiri dari apa?',
        answer: '1. Pengajuan Pembuatan web 2. Pengajuan Pembaruan web 3. Laporan Kendala'
      },
      {
        question: 'Bagaimana cara pengajuan Pembuatan web?',
        answer: '1. Login baba dengan bisma lalu pilih ajukan dan pilih kategori layanan aplikasi dan pilih sub kategori pengajuan pembuatan web'
      }
    ]
  },
  {
    topic: 'Layanan Subdomain',
    qna: [
      {
        question: 'Apa itu layanan subdomain?',
        answer: 'Layanan subdomain memungkinkan Anda untuk memiliki subdomain kustom untuk situs Anda, seperti support.domainanda.com.'
      },
      {
        question: 'Bagaimana cara mendaftarkan subdomain?',
        answer: 'Hubungi tim IT kami dengan memberikan nama subdomain yang diinginkan dan detail lainnya.'
      }
    ]
  }
];

const ChatHelpdesk = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [faqSelected, setFaqSelected] = useState(false);
  const [isQASession, setIsQASession] = useState(false);
  const [faqTopic, setFaqTopic] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: Message = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);
    setInput('');

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

  const handleSelectFAQ = (faqTopic: string) => {
    setFaqSelected(true);
    setIsQASession(true);
    setFaqTopic(faqTopic);

    const initialMessage: Message = {
      sender: 'helpdesk',
      text: `Anda memilih topik: ${faqTopic}. Berikut adalah beberapa informasi terkait:`
    };
    setMessages([initialMessage]);

    // Tampilkan Q&A dengan data dummy tanpa jeda
    displayQA(faqTopic);
  };

  const displayQA = (faqTopic: string) => {
    const topicData = faqData.find((topic) => topic.topic === faqTopic);

    if (topicData) {
      const newMessages: Message[] = topicData.qna.flatMap((qa) => [
        { sender: 'helpdesk', text: `Q: ${qa.question}` },
        { sender: 'helpdesk', text: `A: ${qa.answer}` }
      ]);

      // Tambahkan semua Q&A sekaligus
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);

      // Tambahkan pesan untuk memulai sesi chat setelah semua Q&A ditampilkan
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'helpdesk', text: 'Sekarang Anda bisa memulai sesi chat dengan kami. Silakan ketik pesan Anda.' }
      ]);

      // Setelah semua Q&A selesai, ubah isQASession menjadi false untuk melanjutkan sesi chat
      setIsQASession(false);
    }
  };

  const handleGoBack = () => {
    // Mengatur ulang state untuk kembali ke pemilihan FAQ
    setFaqSelected(false);
    setIsQASession(false);
    setFaqTopic('');
    setMessages([]);
  };

  return (
    <Layout>
      <div className="chat-container">
        <h2 className="text-center">Helpdesk Chat</h2>
        
        {/* Tampilkan FAQ jika belum ada yang dipilih */}
        {!faqSelected ? (
          <div className="faq-container">
            <h3>Pilih Topik FAQ:</h3>
            {faqData.map((item, index) => (
              <Button
                key={index}
                variant="outline-primary"
                className="faq-button"
                onClick={() => handleSelectFAQ(item.topic)}
              >
                {item.topic}
              </Button>
            ))}
          </div>
        ) : (
          // Tampilkan Q&A dan sesi chat
          <>
            <div className="chat-actions">
              <Button variant="secondary" onClick={handleGoBack} className="mb-3">
                Kembali
              </Button>
            </div>
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default ChatHelpdesk;
