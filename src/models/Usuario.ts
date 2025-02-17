import Postagem from "./Postagem";

// Quando não terá código HTML e CSS, podemos criar o arquivo em '.ts'
export default interface Usuario{
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    postagem?: Postagem | null; // A "?" serve para dizer que é opcional
}