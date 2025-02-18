import { useNavigate } from "react-router-dom";
import CardTemas from "../cardtemas/CardTemas"
import Tema from "../../../models/Tema";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";

function ListaTemas() {

    const navigate = useNavigate()

    const [temas, setTemas] = useState<Tema[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    // Requisição para a Api
    async function buscarTemas() {
        try {

            // Autorização no 'headers' via Axios igual fazíamos no Insomnia
            await buscar('/temas', setTemas, {
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
            alert('Você precisa estar logado!')
            navigate('/')   // Envia de volta para a tela de login
        }
    }, [token])

    useEffect(() => {
        buscarTemas()
    }, [temas.length])

    return (
        <>
            {temas.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                        {
                            temas.map((tema: Tema) => (
                                <CardTemas key={tema.id} tema={tema}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaTemas;