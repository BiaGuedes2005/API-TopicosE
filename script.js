const listaMusicas = document.getElementById('lista-musicas');

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

const getMusicas = async () => {
    listaMusicas.innerHTML = '';
    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar musicas");
        }
        const musicas = await response.json();
        musicas.forEach(musica => {
            const newLi = document.createElement('Li');
            newLi.innerText = 'Música: ' + musica.nome + ' - Artista: ' + musica.artista + ' - Album: ' + musica.album + ' - Duração: ' + musica.duracao;
            newLi.id = musica.nome;
            newLi.className = 'musicas';
            listaMusicas.appendChild(newLi);
         });
            
         } catch (error) {
            console.log(error.message);
            listaMusicas.innerText = '${error.message}';
            
         }
}

const getMusicasById = async (id) => {
    listaMusicas.innerHTML = '';
    try {
        const response = await fetch('${apiURL}/${id}', {
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
            newLi.innerText = 'ID: ' + musica.id + 'Música: ' + musica.nome + ' - Artista: ' + musica.artista + ' - Album: ' + musica.album + ' - Duração: ' + musica.duracao;
            listaMusicas.appendChild(newLi);

        } catch (error) {
            console.log(error.message);
            listaMusicas.innerText = '${error.message}';
            alert(error.message);
         }
}

const postMusica = async (novaMusica) => {
    listaMusicas.innerHTML = '';
    try {
        const response = await fetch('${apiURL}/${id}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novaMusica)
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar musicas");
        }

        const musicaAdicionada = await response.json();
        alert('Musica ${musicaAdicionada.nome} foi adicionado com sucesso!');

        } catch (error) {
            console.log(error.message);
            listaMusicas.innerText = '${error.message}';
            alert(error.message);
         }
}

const putMusica = async () => {
    const id = document.getElementById('input-id-update').value;
    const nome = document.getElementById('input-nome-novo');
    const artista = document.getElementById('input-artista-novo').value;
    const album = document.getElementById('input-album-novo').value;
    const duracao = document.getElementById('input-duracao-novo').value;
    listaProdutos.innerHTML = '';

    try {
        const response = await fetch('${apiURL}/${id}', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome.value,
                artista: artista.value,
                album: album.value,
                duracao: duracao.value
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar musica");
        }

        const musicaAtualizada = await response.json();
        alert('Musica ${musicaAtualizada.nome} foi atualizada com sucesso!');

        } catch (error) {
            console.log(error.message);
            listaMusicas.innerText = '${error.message}';
            alert(error.message);
         }
}

const deleteMusica = async () => {
    const id = document.getElementById('input-id-delete').value;
    listaMusicas.innerHTML = '';
    try {
        const response = await fetch('${apiURL}/${id}', {
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
            listaMusicas.innerText = '${error.message}';
            alert(error.message);
         }
}
btnGetTodos.addEventListener('click', (event) => {
    event.preventDefault();
    getMusicas();
});

formId.addEventListener('submit', (event) => {
    event.preventDefault();
    getMusicasById(inputId.value);
});

formPost.addEventListener('submit', (event) => {
    event.preventDefault();
    postMusica({
        nome: '${inputNome.value}',
        artista: '${inputArtista.value}',
        album: '${inputAlbum.value}',
        duracao: '${inputDuracao.value}',
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