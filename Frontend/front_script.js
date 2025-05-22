const lista = document.getElementById('lista-musicas');
const apiUrl = 'https://localhost:5001/musicas';

const buscarProdutos = async () => {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar as musicas');
        }

        const musicas = await response.json();

        musicas.forEach(musica => {

            const newLi = document.createElement('li');
            newLi.innerHTML = `<strong>Nome:</strong> ${musica.nome} | <strong>Artista:</strong> ${musica.artista} | <strong>Album:</strong> ${musica.album} | <strong>Duração:</strong> ${musica.duracao}`;
            lista.appendChild(newLi);
        });

    } catch (error) {
        console.error(error);
        lista.innerText = `${error.message}`;
    }
}

buscarProdutos();
