import { useNavigate } from 'react-router-dom'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import Usuario from '../../models/Usuario'
import { atualizar, buscar } from '../../services/Service'
import { RotatingLines } from 'react-loader-spinner'
import { AuthContext } from '../../contexts/AuthContext'

function EditarPerfil() {

  // Gerencia o histórico da sua navegação, e trabalha com as rotas dessa navegação (hook)
  const navigate = useNavigate()

  // Gerenciar o 'load' de carregamento da tela
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [confirmarSenha, setConfirmarSenha] = useState<string>("")

  const { usuario, handleLogout } = useContext(AuthContext)

  const token = usuario.token

  const id: string = usuario.id.toString()

  const [user, setUser] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  })

  async function buscarUsuarioPorId(id: string) {
    try {
      await buscar(`/usuarios/${id}`, setUser, {
        headers: {
          Authorization: token
        },
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarUsuarioPorId(id)
    }
  }, [id])

  function retornar() {
    navigate('/perfil')  // Rota para voltar para a tela de 'perfil'
  }

  function sucesso() {
    handleLogout()
    navigate('/') // Rota para voltar para a tela de 'login' pós editar perfil (p/ atualizar)
  }

  // Vai receber os 'onChange' dos input (irá guardar/atualizar os valores dentro do estado Usuario)
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUser({
      ...user, // '...' permanece os dados que já tem, e só altera os modificados
      [e.target.name]: e.target.value // 'e' input que retornou o change, o 'target' direciona os dados para nome do input (nome, usuario, foto, etc...)
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
  }

  async function atualizarUsuario(e: FormEvent<HTMLFormElement>) {
    // Impede que o formulário seja enviado assim que clicar no botão
    e.preventDefault()

    if (confirmarSenha === user.senha && user.senha.length >= 8) {

      setIsLoading(true) // Carregar a animação do 'loading'

      try {
        await atualizar(`/usuarios/atualizar`, user, setUser, {
                    headers: {
                      Authorization: token,
                    },
                })
        alert('Usuário Atualizado com Sucesso!')
        sucesso()
      } catch (error) {
        alert('Erro ao Atualizar o Usuário!')
        retornar()
      }
    } else {
      alert('Dados do Usuário inconsistentes! Verifique as informações e tente novamente.')
      setConfirmarSenha('') // Limpa a 'confirmarSenha' para o usuário digitar novamente
    }

    setIsLoading(false)
  }

  console.log(JSON.stringify(user))
  console.log(confirmarSenha)

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form
          className='flex justify-center items-center flex-col w-2/3 gap-3'
          onSubmit={atualizarUsuario} // Fará o envio
        >
          <h2 className='text-slate-900 text-5xl'>Editando Perfil🖋️</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value={user.nome} // chamar o nome exato que está descrito, nesse caso 'nome'
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value={user.usuario} // chamar o nome exato que está descrito, nesse caso 'usuario'
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value={user.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={user.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            {/* Reseta e volta para a tela de Login */}
            <button type='reset'
              className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
              onClick={retornar}
            >
              Cancelar
            </button>
            <button 
                type='submit'
                className='rounded text-white bg-indigo-400 
                           hover:bg-indigo-900 w-1/2 py-2
                           flex justify-center' 
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
                  <span>Salvar</span>
                  }
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditarPerfil