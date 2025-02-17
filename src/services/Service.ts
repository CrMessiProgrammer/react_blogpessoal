import axios from "axios";

// Quando não terá código HTML e CSS, podemos criar o arquivo em '.ts'

// Estamos criando uma conexão do front end com o back end
const api = axios.create({
    baseURL: 'https://blogpessoal-bfqu.onrender.com/'
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