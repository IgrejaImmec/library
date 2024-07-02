"use client";
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ show, handleClose, onLoginSuccess }) => {
  const router = useRouter();

  const handleLogin = () => {
    // Aqui você pode adicionar lógica de autenticação antes de redirecionar
    onLoginSuccess();
    router.push('/private');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Digite seu email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Digite sua senha" />
          </Form.Group>
          <br />
          <Button variant="primary" onClick={handleLogin}>
            Entrar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
