import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens"

function Home() {

    return (
        <>
            <div className="flex justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-[#3B5BB5]">
                <div className='container grid grid-cols-2 text-gray-100'>
                    <div className="flex flex-col items-center justify-center gap-4 py-4">
                        <h2 className='text-5xl max-sm:text-2xl font-bold'>
							Bem Vindo(a)!
                        </h2>
                        <p className='text-xl'>
							Expresse aqui seus pensamentos e opiniões 📝
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className='rounded border-white border-solid border-2 py-2 px-4 text-white'
                                >
                                Nova Postagem
                            </div>
                        </div>
                    </div>

                    <div id="imagem" className="flex justify-center">
                        <img
                            src="./src/assets/home.svg"
                            alt="Imagem da Página Home"
                            className="w-2/3"
                        />
                    </div>
                </div>
            </div>
            <ListaPostagens />
        </>
    )
}

export default Home