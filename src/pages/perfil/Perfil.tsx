import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

function Perfil() {

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            alert('Você precisa estar logado')
            navigate("/")
        }
    }, [usuario.token])

    return (
        <div className='container mx-auto m-4 rounded-2xl overflow-hidden'>

            <div 
                className="relative mt-[-6rem] h-94 flex flex-col border-b-8 border-white bg-gradient-to-b from-gray-900 via-gray-800 to-[#3B5BB5] text-white text-2xl items-center justify-center" >
            </div>

            <img 
                className='rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10' 
                src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />

            <div 
                className="relative mt-[-6rem] h-80 flex flex-col border-b border-white bg-gradient-to-b from-gray-900 via-gray-800 to-[#3B5BB5] text-white text-2xl items-center justify-center"
            >
                <p>Nome: {usuario.nome} </p>
                <p>Email: {usuario.usuario}</p>

                <div className="flex justify-around w-full gap-8">
                    <Link to={`/editarperfil/${usuario.id}`} className='rounded text-black bg-white mt-2 hover:bg-gray-400 w-2/8 py-2 flex justify-center'>
                        <button>
                            Editar Perfil
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Perfil