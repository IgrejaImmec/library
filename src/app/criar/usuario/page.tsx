"use client";

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

interface Usuario {
    id: string;
    email: string;
    senha: string;
    nome: string;
}

const CadastroUsuario = () => {
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha, nome })
            });

            if (response.ok) {
                router.push('/'); // Redirect to home page or any other page after successful submission
            } else {
                console.error('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }

        setIsLoading(false);

     
    };
    const handlerDeslog = () => {
        // setIsAuthenticated(false);
         router.push("/")
    }
    const handleReturn = () => {
        router.back(); // Retorna para a página anterior
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Navbar or Header */}
            <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
                <div className="text-xl font-bold">Immec Library</div>
                <button 
                    className="px-4 py-2 bg-white text-blue-500 rounded-lg shadow hover:bg-blue-200" 
                    onClick={handlerDeslog}
                >
                    Deslogar
                </button>
           </nav>

            {/* Formulário de Cadastro de Usuário */}
            <Form className='max-w-md w-full mx-auto pt-10 px-4' onSubmit={handleSubmit}>
            <Form.Group controlId='formNome'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Digite seu nome'
                        value={nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='formEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Digite seu email'
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='formSenha'>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Digite sua senha'
                        value={senha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
                    />
                </Form.Group>
                
                <Button variant='primary' type='submit' disabled={isLoading} className='mt-3 mr-1'>
                    {isLoading ? <Spinner animation='border' size='sm' /> : 'Cadastrar Usuario'}
                </Button>
                <Button variant='danger' type='button' disabled={isLoading} className='mt-3' onClick={handleReturn}>
                    {isLoading ? <Spinner animation='border' size='sm' /> : 'Retornar'}
                </Button>
            </Form>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
                © {new Date().getFullYear()} Desenvolvido pelo Departamento de Mídia da Immec Church
            </footer>
        </div>
    );
};

export default CadastroUsuario;
