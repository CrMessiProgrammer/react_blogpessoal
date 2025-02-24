import axios from "axios";

// Quando não terá código HTML e CSS, podemos criar o arquivo em '.ts'

// Estamos criando uma conexão do front end com o back end
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// 'Object' significa que ele pode receber obetos de qualquer lugar
// 'Object' terá todos os dados sem o 'id'
// 'Function' significa que ele pode receber funções de qualquer lugar
export const cadastrarUsuario = async(url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data) // Atualiza o estado com os dados + o 'id'
}

export const login = async(url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data) // Atualiza o estado com os dados + o 'id'
}

export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}