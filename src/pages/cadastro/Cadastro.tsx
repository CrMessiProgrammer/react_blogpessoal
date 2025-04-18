import { useNavigate } from 'react-router-dom'
import './Cadastro.css'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service'
import { RotatingLines } from 'react-loader-spinner'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Cadastro() {

  // Gerencia o histórico da sua navegação, e trabalha com as rotas dessa navegação (hook)
  const navigate = useNavigate()

  // Gerenciar o 'load' de carregamento da tela
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [confirmarSenha, setConfirmarSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  })

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar()      
    }
  }, [usuario])

  function retornar() {
    navigate('/login')  // Rota para voltar para a tela de 'login'
  }

  // Vai receber os 'onChange' dos input (irá guardar/atualizar os valores dentro do estado Usuario)
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario, // '...' permanece os dados que já tem, e só altera os modificados
      [e.target.name]: e.target.value // 'e' input que retornou o change, o 'target' direciona os dados para nome do input (nome, usuario, foto, etc...)
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    // Impedi que o formulário seja enviado assim que clicar no botão
    e.preventDefault()

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {

      setIsLoading(true) // Carregar a animação do 'loading'

      try {
        await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario)
        ToastAlerta('Usuário Cadastrado com Sucesso!', 'sucesso')
      } catch (error) {
        ToastAlerta('Erro ao Cadastrar o Usuário!', 'erro')
      }
    } else {
      ToastAlerta('Dados do Usuário inconsistentes! Verifique as informações e tente novamente.', 'erro')
      setUsuario({...usuario, senha: ''}) // Limpa a 'senha' para o usuário digitar novamente
      setConfirmarSenha('') // Limpa a 'confirmarSenha' para o usuário digitar novamente
    }

    setIsLoading(false)
  }

  console.log(JSON.stringify(usuario))
  console.log(confirmarSenha)

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold bg-gradient-to-l from-black via-gray-600 to-white">
        <div className="fundoCadastro hidden lg:block"></div>
        <form
          className='flex justify-center items-center flex-col w-2/3 gap-3 bg-gray-800 p-10 rounded-xl shadow-xl'
          onSubmit={cadastrarNovoUsuario} // Fará o envio
        >
          <h2 className='text-white text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full text-gray-300">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-gray-400 bg-gray-900 text-white rounded p-2"
              value={usuario.nome} // chamar o nome exato que está descrito acima, nesse caso 'nome'
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full text-gray-300">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-gray-400 bg-gray-900 text-white rounded p-2"
              value={usuario.usuario} // chamar o nome exato que está descrito acima, nesse caso 'usuario'
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full text-gray-300">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-gray-400 bg-gray-900 text-white rounded p-2"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full text-gray-300">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-gray-400 bg-gray-900 text-white rounded p-2"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full text-gray-300">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-gray-400 bg-gray-900 text-white rounded p-2"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            {/* Reseta e volta para a tela de Login */}
            <button
              type='reset'
              className='rounded text-white bg-gray-600 hover:bg-gray-700 w-1/2 py-2'
              onClick={retornar}
            >
              Cancelar
            </button>
            <button 
                type='submit'
                className='rounded text-white bg-gray-600 hover:bg-gray-700 w-1/2 py-2 flex justify-center'
                >
                  {/* Operador Ternário */}
                  {isLoading ?
                  // Configurações da animação de 'loading'
                  <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}/>
                  :
                  <span>Cadastrar</span>
                  }
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro