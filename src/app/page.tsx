"use client";
import { FormEvent, useState } from 'react';
import './home.css'; // Importando o arquivo CSS
import LoginModal from './modals/page';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false); // Estado para controlar a visibilidade do modal de login

  // Função para lidar com a submissão do formulário de pesquisa
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
    console.log('Selected option:', selectedOption);
  };

  // Função para abrir o modal de login
  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  // Função para fechar o modal de login
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Immec Library</div>
        <button className="px-4 py-2 bg-white text-blue-500 rounded-lg shadow hover:bg-blue-200" onClick={handleShowLoginModal}>
          Login
        </button>
      </nav>

      {/* Título */}
      <h1 className='titulo'>Seja Bem Vindo(a) Biblioteca de Conteúdos da Immec Church</h1>

      {/* Pesquisa */}
      <section className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row md:items-center md:space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite sua pesquisa..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-2 md:mb-0 md:flex-1"
          />
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 md:w-auto"
          >
            <option value="">Selecione...</option>
            <option value="option1">Estudo Célula</option>
            <option value="option2">Estudo EBD</option>
            <option value="option3">Pregação</option>
            <option value="option4">Palavra</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 mt-2 md:mt-0 md:ml-2"
          >
            Pesquisar
          </button>
        </form>
      </section>

      {/* Componente de Modal de Login */}
      {showLoginModal && <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />}

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4">
        © {new Date().getFullYear()} Desenvolvido pelo Departamento de Mídia da Immec Church
      </footer>
    </div>
  );
};

export default Home;
