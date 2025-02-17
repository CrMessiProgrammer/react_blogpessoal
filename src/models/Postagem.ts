import Tema from "./Tema";
import Usuario from "./Usuario";

// Quando não terá código HTML e CSS, podemos criar o arquivo em '.ts'
export default interface Postagem{
    id: number;
    titulo: string;
    texto: string;
    data: string;   // String porque 
    tema: Tema | null;
    usuario: Usuario | null;
}