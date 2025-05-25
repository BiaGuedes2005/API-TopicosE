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
                    <button class="play-btn">▶</button>
                </div>
            `;
            listaTopMusicas.appendChild(li);
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
            newLi.innerText = 'ID: ' + musica.id + ' Música: ' + musica.nome + ' - Artista: ' + musica.artista + ' - Album: ' + musica.album + ' - Duração: ' + musica.duracao;
            listaMusicas.appendChild(newLi);

        } catch (error) {
            console.log(error.message);
            listaMusicas.innerText = error.message;
            alert(error.message);
         }
}

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
                Duracao: duracaoFormatada
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
/*btnGetTodos.addEventListener('click', (event) => {
    event.preventDefault();
    getMusicas();
});*/

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