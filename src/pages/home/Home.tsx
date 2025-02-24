import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem"

function Home() {
    return (
        <>
            <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-[#3B5BB5] flex justify-center">
                <div className='container grid grid-cols-2 text-gray-100'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
							Bem Vindo(a)!
                        </h2>
                        <p className='text-xl'>
							Expresse aqui seus pensamentos e opiniões 📝
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className="flex justify-around gap-4">
                                <ModalPostagem />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src="https://ik.imagekit.io/m1iwfxqae/home.svg?updatedAt=1740433535395"
                            alt="Imagem Página Home"
                            className='w-2/3'
                        />
                    </div>
                </div>
            </div>

            <ListaPostagens />
        </>
    )
}

export default Home