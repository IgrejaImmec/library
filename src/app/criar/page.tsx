"use client";
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

interface User {
    id: string;
    email: string;
    nome: string;
}

const Page = () => {
    const [tipo, setTipo] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [pdf, setPdf] = useState<string | ArrayBuffer | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPdf(reader.result);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        await fetch('/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tipo,
                content,
                pdf,
                usuarioId: selectedUser
            })
        }).then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log(e);
        });

        setIsLoading(false);
        router.push('/');
    };

    const handlerDeslog = () => {
        router.push("/");
    };
  
    const handleReturn = () => {
        router.back(); // Retorna para a página anterior
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
                <div className="text-xl font-bold">Immec Library</div>
                <button 
                    className="px-4 py-2 bg-white text-blue-500 rounded-lg shadow hover:bg-blue-200" 
                    onClick={handlerDeslog}
                >
                    Deslogar
                </button>
            </nav>
            <Form className='max-w-md w-full mx-auto pt-10 px-4' onSubmit={handleSubmit}>
                <Form.Group controlId='formTipo'>
                    <Form.Label>Selecione o Tipo</Form.Label>
                    <Form.Control
                        as='select'
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value="Estudo Célula">Estudo Célula</option>
                        <option value="Estudo EBD">Estudo EBD</option>
                        <option value="Pregação">Pregação</option>
                        <option value="Palavra">Palavra</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='formUser'>
                    <Form.Label>Selecione um Usuário</Form.Label>
                    <Form.Control
                        as='select'
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value="">Selecione um Usuario</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.nome}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='formContent'>
                    <Form.Label>Comentário</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={10}
                        placeholder='Insira um comentário sobre o estudo'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='formPdf'>
                    <Form.Label>Upload PDF</Form.Label>
                    <Form.Control
                        type='file'
                        accept='application/pdf'
                        onChange={handleFileChange}
                    />
                </Form.Group>
                <Button variant='primary' type='submit' disabled={isLoading} className='mt-3 mr-1'>
                    {isLoading ? <Spinner animation='border' size='sm' /> : 'Cadastrar Estudo'}
                </Button>
                <Button variant='danger' type='button' disabled={isLoading} className='mt-3' onClick={handleReturn}>
                    {isLoading ? <Spinner animation='border' size='sm' /> : 'Retornar'}
                </Button>
            </Form>
            <br/>
            <br/>
            <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
                © {new Date().getFullYear()} Desenvolvido pelo Departamento de Mídia da Immec Church
            </footer>
        </div>
    );
};

export default Page;
