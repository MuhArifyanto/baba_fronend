import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import RefreshIcon from '@mui/icons-material/Refresh';
import '../../assets/style.css';
import DOMPurify from 'dompurify';
import CaptchaCanvas from '../main/CaptchaCanvas';

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

function ModalLogin(props: ModalLoginProps) {
  const { isOpen, toggle } = props; // Destructuring dilakukan di sini

  const [captchaText, setCaptchaText] = useState(generateRandomString(6));
  const [captchaInput, setCaptchaInput] = useState('');

  const refreshCaptcha = () => {
    const newCaptcha = generateRandomString(6);
    setCaptchaText(newCaptcha);
    setCaptchaInput('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedCaptchaInput = DOMPurify.sanitize(captchaInput);
    const usernameInput = DOMPurify.sanitize((document.getElementById('username') as HTMLInputElement).value);
    const passwordInput = DOMPurify.sanitize((document.getElementById('password') as HTMLInputElement).value);

    if (sanitizedCaptchaInput !== captchaText) {
      Swal.fire({
        icon: 'error',
        title: 'Captcha tidak valid!',
        text: 'Silakan coba lagi.',
        confirmButtonText: 'OK',
      });
      refreshCaptcha();
      return;
    }

    document.cookie = `authToken=${generateRandomString(30)}; path=/;`;

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
              <CaptchaCanvas text={captchaText} />
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
}

export default ModalLogin;