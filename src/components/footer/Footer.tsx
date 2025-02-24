import { LinkedinLogo, GithubLogo, EnvelopeSimple } from '@phosphor-icons/react'
import { ReactNode, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {
	let data = new Date().getFullYear()

	const { usuario } = useContext(AuthContext)

	// Qualquer componente do tipo 'React'
	let componente: ReactNode;

	// Footer só vai mostrar se usuário estiver logado
	if (usuario.token !== '') {
		
		componente = (
			<div className="flex justify-center text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
				<div className="container flex flex-col items-center py-4">
					<p className="text-xl font-bold">
						Blog Pessoal CrMessiProgrammer | Copyright:{' '}
						{data}
					</p>
					<p className="text-lg">
						Acesse nossas redes sociais
					</p>
					<div className='flex gap-2'>
                        <a href="https://www.linkedin.com/in/carlos-h-dev/" target="_blank">
                            <LinkedinLogo size={48} weight='bold' />
                        </a>
                        <a href="https://github.com/CrMessiProgrammer" target="_blank">
                            <GithubLogo size={48} weight='bold' />
                        </a>
                        <a href="https://crmessiprogrammer.github.io/portfolio_tjs06/" target="_blank">
                            <EnvelopeSimple size={48} weight='bold' />
                        </a>
                    </div>
				</div>
			</div>
		)
	}

	return (
		<>
			{/* Chama a variável de lá de cima */}
			{componente}
		</>
	)
}

export default Footer