import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'

// Single Page Application (SPA - Aplicativo de Página Única)
// Componente Funcional: Uma função JS ou TS que retornará uma aplicação renderizada no seu navegador.
// React trabalha com o Virtual DOM - faz uma cópia do DOM principal

// O react não recarrega a página toda (F5) igual o JavaScript, ele apenas atualiza o quê foi modificado
function App() {
	return (
		// Obrigatório fazer um <></> vazio, ou uma <div></div>
		<>
			<BrowserRouter>
			{/* Componentes 'Navbar', 'Home', 'Footer' e 'Login' */}
				<Navbar />
				<div className="min-h-[80vh]">
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/home" element={<Home />} />
						<Route path="/cadastro" element={<Cadastro />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</>
  	)
}

export default App