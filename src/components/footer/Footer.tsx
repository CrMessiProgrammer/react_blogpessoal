import { LinkedinLogo, GithubLogo, EnvelopeSimple } from '@phosphor-icons/react'

function Footer() {

    let data = new Date().getFullYear()

  return (
    <footer>
        <div className="flex justify-center bg-indigo-900 text-white">
            <div className='container flex flex-col items-center py-4'>
                <p className='text-xl font-bold'>
                    Blog Pessoal Carlos Henrique Nunes | Copyright: {data}
                </p>

                <p className='text-lg'>
                    Acesse nossas redes sociais
                </p>
                <div className='flex gap-2'>
                    <LinkedinLogo size={48} weight='bold' />
                    <GithubLogo size={48} weight='bold' />
                    <EnvelopeSimple size={48} weight='bold' />
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer