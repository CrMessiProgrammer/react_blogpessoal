import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

function Navbar() {

	const navigate = useNavigate()

	const { handleLogout } = useContext(AuthContext)

	function logout() {
		handleLogout()		
		alert('O Usuário foi desconectado com sucesso!')
		navigate('/')
	}

	return (
		<>
			<div className="flex justify-center w-full p-4 text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
				<div className="container flex justify-between text-lg">
					<Link to="/home" className="text-2xl font-bold">
						Blog Pessoal
					</Link>
					<div className="flex gap-4">
						<Link to='/postagens' className='hover:underline'>Postagens</Link>
						<Link to='/temas' className='hover:underline'>Temas</Link>
						<Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
						<Link to='/perfil' className='hover:underline'>Perfil</Link>
						<Link to='' onClick={logout} className="hover:underline">Sair</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar