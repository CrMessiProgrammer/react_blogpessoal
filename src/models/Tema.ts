import Postagem from "./Postagem";

// Quando não terá código HTML e CSS, podemos criar o arquivo em '.ts'
export default interface Tema{
    id: number;
    descricao: string;
    postagem?: Postagem | null; // "?" = Opcional
}