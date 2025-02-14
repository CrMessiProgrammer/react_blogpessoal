import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"

// Single Page Application (SPA - Aplicativo de Página Única)
// Componente Funcional: Uma função JS ou TS que retornará uma aplicação renderizada no seu navegador.
// React trabalha com o Virtual DOM - faz uma cópia do DOM principal

// O react não recarrega a página toda (F5) igual o JavaScript, ele apenas atualiza o quê foi modificado
function App() {
  return (
    // Obrigatório fazer um <></> vazio, ou uma <div></div>
    <>
      {/* Componentes 'Navbar', 'Home' e 'Footer' */}
      <Navbar />
      <Home />
      <Footer />
    </>
  )
}

export default App
