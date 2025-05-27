const listaMusicas = document.getElementById('lista-musicas');
const listaTopMusicas = document.getElementById('lista-top-musicas');

const btnGetTodos = document.getElementById('btn-todos');
const inputId = document.getElementById('input-id-busca');
const formId = document.getElementById('form-busca-id');
const formPost = document.getElementById('form-post');
const formPut = document.getElementById('form-put');
const formDelete = document.getElementById('form-delete');

const inputNome = document.getElementById('input-nome-novo');
const inputArtista = document.getElementById('input-artista-novo');
const inputAlbum = document.getElementById('input-album-novo');
const inputDuracao = document.getElementById('input-duracao-novo');
const inputUrl = document.getElementById('input-url-novo');

const apiURL = "https://localhost:5001/musicas";

const renderTopMusicas = async () => {
    if (!listaTopMusicas) return;
    listaTopMusicas.innerHTML = '';
    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar músicas");
        }
        const musicas = await response.json();
        musicas.forEach((musica, idx) => {
            const li = document.createElement('li');         
            li.innerHTML = `
                <div class="song-item">
                    <div class="song-number">${idx + 1}</div>
                    <div class="song-info">
                        <div class="song-title">${musica.nome}</div>
                        <div class="song-artist">${musica.artista}</div>
                    </div>
                    <div class="song-duration">${musica.duracao}</div>
                    <button class="play-btn" data-url="${musica.url || ''}">▶</button>
                    <div class="embed-container"></div>
                </div>
            `;
            listaTopMusicas.appendChild(li);
            const playBtn = li.querySelector('.play-btn');
            const embedContainer = li.querySelector('.embed-container');
            
            playBtn.addEventListener('click', function() {

                if (embedContainer.innerHTML.trim() !== '') {
                    embedContainer.innerHTML = '';
                return;
                }
                
                const url = this.getAttribute('data-url');
                let embed = '';
                if (url && (url.includes('youtube.com') || url.includes('youtu.be'))) {
                    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
                    if (ytMatch) {
                    const videoId = ytMatch[1];
                    embed = `
                        <iframe width="480" height="130"
                            src="https://www.youtube.com/embed/${videoId}"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    `;
                }
            } else if (url) {
                embed = `<audio controls src="${url}"></audio>`;
            }
        embedContainer.innerHTML = embed;
});        
        });
    } catch (error) {
        listaTopMusicas.innerText = error.message;
    }
};

const getMusicasById = async (id) => {
    listaMusicas.innerHTML = '';
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar musica");
        }
        const musica = await response.json();
        const newLi = document.createElement('Li');
        let embed = '';

        if (
            musica.url &&
            (musica.url.includes('youtube.com') || musica.url.includes('youtu.be'))
        ) {
            const ytMatch = musica.url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
            if (ytMatch) {
                const videoId = ytMatch[1];
                embed = `
                    <iframe width="480" height="130"
                        src="https://www.youtube.com/embed/${videoId}"
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                `;
            }
        } else if (musica.url) {
            embed = `<audio controls src="${musica.url}"></audio>`;
        }

        newLi.innerHTML = `
            <strong>ID:</strong> ${musica.id} <strong>Música:</strong> ${musica.nome} - 
            <strong>Artista:</strong> ${musica.artista} - 
            <strong>Album:</strong> ${musica.album} - 
            <strong>Duração:</strong> ${musica.duracao}<br>
            ${embed}
        `;
        listaMusicas.appendChild(newLi);
        
        } catch (error) {
            console.log(error.message);
            listaMusicas.innerText = error.message;
            alert(error.message);
        }
}
const setMaxIdBusca = async () => {
    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) return;
        const musicas = await response.json();
        if (musicas.length > 0) {
            const maxId = Math.max(...musicas.map(m => m.id));
            inputId.max = maxId;
        }

        } catch (error) {
            console.log(error.message);
            listaMusicas.innerText = error.message;
            alert(error.message);
        }
};

const postMusica = async (novaMusica) => {
    listaMusicas.innerHTML = '';
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novaMusica)
        });

        if (!response.ok) {
            throw new Error("Erro ao adicionar musica");
        }

        const musicaAdicionada = await response.json();
        alert(`Musica ${musicaAdicionada.nome} foi adicionado com sucesso!`);

        } catch (error) {
            console.log(error.message);
            listaMusicas.innerText = error.message;
            alert(error.message);
         }
}

const putMusica = async () => {
    const id = document.getElementById('input-id-update').value;
    const nome = document.getElementById('input-nome-update').value;
    const artista = document.getElementById('input-artista-update').value;
    const album = document.getElementById('input-album-update').value;
    const duracao = document.getElementById('input-duracao-update').value;
    const duracaoFormatada = duracao.length === 5 ? "00:" + duracao : duracao;
    const url = document.getElementById('input-url-update').value;
    listaMusicas.innerHTML = '';

    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Nome: nome,
                Artista: artista,
                Album: album,
                Duracao: duracaoFormatada,
                Url: url
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar musica");
        }

        const musicaAtualizada = await response.json();
        alert('Musica ${musicaAtualizada.nome} foi atualizada com sucesso!');

        } catch (error) {
            console.log(error.message);
            listaMusicas.innerText = error.message;
            alert(error.message);
         }
}

const deleteMusica = async () => {
    const id = document.getElementById('input-id-delete').value;
    listaMusicas.innerHTML = '';
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao deletar musica");
        }
        const resultado = await response.text();
        alert(resultado);

        } catch (error) {
            console.log(error.message);
            listaMusicas.innerText = error.message;
            alert(error.message);
         }
}

formId.addEventListener('submit', (event) => {
    event.preventDefault();
    getMusicasById(inputId.value);
});

formPost.addEventListener('submit', (event) => {
    event.preventDefault();

    let duracao = inputDuracao.value;
    if (duracao.length === 5) duracao = "00:" + duracao;
    postMusica({
        Nome: inputNome.value,
        Artista: inputArtista.value,
        Album: inputAlbum.value,
        Duracao: duracao,
        Url: inputUrl.value
    });
});

formPut.addEventListener('submit', (event) => {
    event.preventDefault();
    putMusica();
});

formDelete.addEventListener('submit', (event) => {
    event.preventDefault();
    deleteMusica();
});

window.addEventListener('DOMContentLoaded', renderTopMusicas);
window.addEventListener('DOMContentLoaded', setMaxIdBusca);