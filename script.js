const listaProdutos = document.getElementById('lista-produtos');

const btnGetTodos = document.getElementById('btn-todos');
const inputId = document.getElementById('input-id-busca');
const formId = document.getElementById('form-busca-id');
const formPost = document.getElementById('form-post');
const formPut = document.getElementById('form-put');
const formDelete = document.getElementById('form-delete');

const inputNome = document.getElementById('input-nome-novo'); // mudar dps
const inputPreco = document.getElementById('input-preco-novo'); // mudar dps

const apiURL = "https://localhost:----/produtos"; // mudar a porta do servidor

const getProdutos = async () => {
    listaProdutos.innerHTML = '';
    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        const produto = await response.json();
         produtos.forEach(produto => {
            const newLi = document.createElement('Li');
            newLi.innerText = 'Produto: ' + produto.nome + ' - Preço: ' + produto.preco; // mudar dps
            newLi.id = produto.nome;
            newLi.className = 'produtos';
            listaProdutos.appendChild(newLi);
         });
            
         } catch (error) {
            console.log(error.message);
            listaProdutos.innerText = '${error.message}';
            
         }
}

const getProdutosById = async (id) => {
    listaProdutos.innerHTML = '';
    try {
        const response = await fetch('${apiURL}/${id}', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }
        const produto = await response.json();
            const newLi = document.createElement('Li');
            newLi.innerText = 'ID: ' + produto.id + 'Produto: ' + produto.nome + ' - Preço: ' + produto.preco; // mudar dps
            listaProdutos.appendChild(newLi);

        } catch (error) {
            console.log(error.message);
            listaProdutos.innerText = '${error.message}';
            alert(error.message);
         }
}

const postProduto = async (novoProduto) => {
    listaProdutos.innerHTML = '';
    try {
        const response = await fetch('${apiURL}/${id}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoProduto)
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }

        const produto = await response.json();
        alert('Produto ${novoProduto.nome} foi adicionado com sucesso!');

        } catch (error) {
            console.log(error.message);
            listaProdutos.innerText = '${error.message}';
            alert(error.message);
         }
}

const putProduto = async () => { // mudar dps
    const id = document.getElementById('input-id-update').value;
    const nome = document.getElementById('input-nome-update');
    const preco = document.getElementById('input-preco-update');
    listaProdutos.innerHTML = '';

    try {
        const response = await fetch('${apiURL}/${id}', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome.value,
                preco: preco.value
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar produtos");
        }

        const produto = await response.json();
        alert('Produto ${novoProduto.nome} foi atualizado com sucesso!');

        } catch (error) {
            console.log(error.message);
            listaProdutos.innerText = '${error.message}';
            alert(error.message);
         }
}

const deleteProduto = async () => {
    const id = document.getElementById('input-id-delete').value;
    listaProdutos.innerHTML = '';
    try {
        const response = await fetch('${apiURL}/${id}', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao deletar produto");
        }
        const resultado = await response.text();
        alert(resultado);

        } catch (error) {
            console.log(error.message);
            listaProdutos.innerText = '${error.message}';
            alert(error.message);
         }
}
btnGetTodos.addEventListener('click', (event) => {
    event.preventDefault();
    getProdutos();
});

formId.addEventListener('submit', (event) => {
    event.preventDefault();
    getProdutosPorId(inputId.value);
});

formPost.addEventListener('submit', (event) => { // mudar dps
    event.preventDefault();
    postProduto({
        nome: inputNome.value,
        preco: inputPreco.value
    });
});

formPut.addEventListener('submit', (event) => {
    event.preventDefault();
    putProduto();
});

formDelete.addEventListener('submit', (event) => {
    event.preventDefault();
    deleteProduto();
});