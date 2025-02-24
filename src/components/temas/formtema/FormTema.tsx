import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {

    // Navegar entre as telas
    const navigate = useNavigate()

    const [ tema, setTema ] = useState<Tema>({} as Tema)

    // Gerenciar o 'load' de carregamento da tela
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    // Hook para receber um parâmetro do tipo string que estará na minha rota (caminho/url)
    const { id } = useParams<{ id: string }>()

    // Requisição para a Api
    async function buscarTemasPorId(id: string) {
        try {
            // Autorização no 'headers' via Axios igual fazíamos no Insomnia
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
    
        } catch (error: any) {
            // Erro '401' significa que o token é inválido ou que expirou
            if (error.toString().includes('401')) {
                handleLogout()  // Zera o token
            }            
        }                
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')   // Envia de volta para a tela de login
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarTemasPorId(id)
        }
    }, [id])

    // Vai receber os 'onChange' dos input (irá guardar/atualizar os valores dentro do estado Usuario)
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
        setTema({
            ...tema, // '...' permanece os dados que já tem, e só altera os modificados
            [e.target.name]: e.target.value, // 'e' input que retornou o change, o 'target' direciona os dados para nome do input (nome, usuario, foto, etc...)
        })
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
 
        if (id !== undefined) {
            try {
                await atualizar("/temas", tema, setTema, {
                    headers: { Authorization: token },
                })
 
                ToastAlerta("O Tema foi Atualizado com sucesso!", 'sucesso')
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao atualizar o tema!", 'erro')
                }
            }
        } else {
            try {
                await cadastrar("/temas", tema, setTema, {
                    headers: { Authorization: token },
                })
 
                ToastAlerta("O Tema foi Cadastrado com sucesso!", 'sucesso')
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao cadastrar o tema!", 'erro')
                }
            }
        }
 
        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/temas");
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {/* Operador Ternário */}
                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
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
                            // Operador Ternário
                            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormTema;