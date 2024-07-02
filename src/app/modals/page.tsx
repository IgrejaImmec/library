"use client";
import { useRouter } from 'next/navigation';
import { Button, Form, Modal } from 'react-bootstrap';

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
}

export default function LoginModal({ show, handleClose }: LoginModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    handleClose();
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
