import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { AuthContext } from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';

function Login() {

    const navigate = useNavigate()

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin)

    // Desestruturação para pegar apenas que preciso dentro da 'AuthContext'
    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })  
    }

    // Redireciona para a tela inicial ('home'), se usuario e senha for válida (gerando o token)
    useEffect(() => {
        if (usuario.token !== '') {
            navigate('/home')            
        }
    }, [usuario])

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    console.log(JSON.stringify(usuarioLogin))    

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-gradient-to-r from-black via-gray-600 to-white">
                <form
                    className="flex justify-center items-center flex-col w-1/2 gap-4"
                    onSubmit={login}
                >
                    <h2 className="text-white text-5xl">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label className='text-gray-300' htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-gray-400 bg-gray-900 text-white rounded p-2"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className='text-gray-300' htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-gray-400 bg-gray-900 text-white rounded p-2"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button 
                        type='submit' 
                        className="rounded flex justify-center bg-gray-700 hover:bg-gray-500 text-white w-1/2 py-2">
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
                            <span>Entrar</span>
                            }
                    </button>

                    {/* Divisória na estilização */}
                    <hr className="border-gray-400 w-full" />

                    <p
                        className='text-gray-300'>
                            Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-gray-300 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div className="fundoLogin hidden lg:block"></div>
            </div>
        </>
    );
}

export default Login;