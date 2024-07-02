/* eslint-disable @next/next/no-img-element */
"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import logo from '../assets/logo.png';
import './private.css';

const PrivatePage: React.FC = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const router = useRouter();

  const handlerDeslog = () => {
    setIsAuthenticated(false);
    router.push("/")
  }
  const handleCadastro = () =>{
    router.push("/criar")
  }
  const handleCadastroUsu = () =>{
    router.push("/criar/usuario")
  }

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

        {/* Título */}
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className='text-2xl font-semibold mb-4 text-center'>
            <Image src={logo} alt="Immec Library Logo" className='imagem' />
          </h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-white text-blue-500 rounded-lg shadow hover:bg-blue-200" 
             onClick={handleCadastro}
            >
              Cadastrar Estudo
            </button>
            <button className="px-4 py-2 bg-white text-blue-500 rounded-lg shadow hover:bg-blue-200"
              onClick={handleCadastroUsu}
            >
              Cadastrar Usuário
            </button>
          </div>
        </div>

        <footer className="bg-gray-900 text-white text-center py-4">
          © {new Date().getFullYear()} Desenvolvido pelo Departamento de Mídia da Immec Church
        </footer>
      </div>
    
  );
};

export default PrivatePage;
