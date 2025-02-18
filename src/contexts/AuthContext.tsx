import { createContext, ReactNode, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

interface AuthContextProps{
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps{
    // Qualquer componente (React) pode consumir meu provedor
    children: ReactNode
}

// Criando o contexto e disponibiliza tudo que tem dentro dessa interface
export const AuthContext = createContext({} as AuthContextProps)

// Criando um componente que vai envolver todos os filhos (componentes) React
export function AuthProvider({ children }: AuthProviderProps){

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)
        
        try {
            await login('/usuarios/logar', usuarioLogin, setUsuario)
            alert('O Usuário foi autenticado com sucesso!')
        } catch (error) {
            alert('Os Dados do Usuário estão inconsistentes!')
        }

        setIsLoading(false)
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        })
    }

    return (
        // Compartilhar todos esses elementos com todfa a aplicvação
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}