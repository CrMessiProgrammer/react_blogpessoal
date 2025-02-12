function Home() {
    return (
        <div
            style={{
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div>
                <div
                    style={{
                        width: '80vw',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: '#0d0c1d',
                        color: '#FFFFFF',
                        borderBottomLeftRadius: '20px',
                        borderBottomRightRadius: '20px',
                    }}
                >
                    <h2>Seja Bem Vindo(a)!</h2>
                    <p>
                        Expresse aqui seus pensamentos e opiniões📝
                    </p>
                </div>
 
                <div
                    style={{
                        width: '80vw',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src="https://i.imgur.com/VpwApCU.png"
                        alt="Imagem da Página Home"
                        width="400px"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
