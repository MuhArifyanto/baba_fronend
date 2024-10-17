// src/components/ModalLogin.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import RefreshIcon from '@mui/icons-material/Refresh';
import '../../assets/style.css';

interface ModalLoginProps {
  isOpen: boolean;
  toggle: () => void;
}

const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const ModalLogin: React.FC<ModalLoginProps> = ({ isOpen, toggle }) => {
  const [captchaText, setCaptchaText] = useState(generateRandomString(6));
  const [captchaInput, setCaptchaInput] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 120;
        canvas.height = 60;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Membuat latar belakang dengan noise
        for (let i = 0; i < canvas.width; i++) {
          for (let j = 0; j < canvas.height; j++) {
            const gray = Math.floor(Math.random() * 255);
            ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, 0.95)`;
            ctx.fillRect(i, j, 1, 1);
          }
        }

        ctx.filter = 'blur(10000px)';
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.filter = 'none';
        ctx.font = '26px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const x = canvas.width / 2;
        const y = canvas.height / 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * 0.1 - 0.05);
        ctx.scale(1, 1.1);
        ctx.fillText(text, 0, 0);
        ctx.restore();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => drawCaptcha(captchaText), 100);
    }
  }, [isOpen, captchaText]);

  const refreshCaptcha = () => {
    const newCaptcha = generateRandomString(6);
    setCaptchaText(newCaptcha);
    setCaptchaInput('');
    Swal.fire({
      icon: 'info',
      title: 'Captcha telah di-refresh!',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      customClass: {
        popup: 'my-swal-toast',
      },
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput !== captchaText) {
      Swal.fire({
        icon: 'error',
        title: 'Captcha tidak valid!',
        text: 'Silakan coba lagi.',
        confirmButtonText: 'OK',
      });
      return;
    }
    Swal.fire({
      icon: 'success',
      title: 'Login berhasil!',
      text: 'Anda berhasil login.',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      customClass: {
        popup: 'my-swal-toast',
      },
    });
  };

  return (
    <Modal backdrop="static" keyboard={true} isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Login</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" id="username" placeholder="Enter your username" required />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" id="password" placeholder="Enter your password" required />
          </FormGroup>
          <FormGroup>
            <Label for="captcha">Captcha</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <canvas
                ref={canvasRef}
                style={{ display: 'block', border: '1px solid #ccc' }}
              />
              <Button type="button" color="success" onClick={refreshCaptcha} size='sm'>
                <RefreshIcon />
              </Button>
            </div>
            <Input
              type="text"
              id="captcha"
              placeholder="Masukkan captcha di atas"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              required
              style={{ marginTop: '10px' }}
            />
          </FormGroup>
          <Button type="submit" color="primary" block style={{ marginTop: '15px' }}>
            Login
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalLogin;
