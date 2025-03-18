import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Perfil() {

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta('Você precisa estar logado', 'info')
            navigate("/")
        }
    }, [usuario.token])

    return (
        <div className='container mx-auto m-4 rounded-2xl overflow-hidden'>
            <img
                className="w-full h-80 object-cover border-b-8 border-white"
                src="https://ik.imagekit.io/m1iwfxqae/top-view-desk-concept-with-copy-space.jpg?updatedAt=1742080487395"
                alt="Capa do Perfil"
			/>

            <img 
                className='rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10' 
                src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`}
            />

            <div 
                className="relative mt-[-6rem] h-80 flex flex-col border-b border-white bg-gradient-to-t from-gray-950 via-gray-800 to-gray-600 text-white text-2xl items-center justify-center"
            >
                <p>Nome: {usuario.nome} </p>
                <p>Email: {usuario.usuario}</p>

                <div className="flex justify-around w-full gap-8">
                    <Link to={`/editarperfil/${usuario.id}`} className='mt-2 hover:bg-gray-700 w-2/8 py-2 flex justify-center border-2 border-gray-400 bg-gray-900 text-white rounded p-2'>
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