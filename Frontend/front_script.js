const lista = document.getElementById('lista-produtos');
const apiUrl = 'https://localhost:5001';

const buscarProdutos = async () => {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar os produtos');
        }

        const produtos = await response.json();

        produtos.forEach(produto => {

            const newLi = document.createElement('li');
            newLi.innerHTML = `<strong>Nome:</strong> ${produto.nome} | <strong>Preço:</strong> ${pokemon.preco}`;
            lista.appendChild(newLi);
        });

    } catch (error) {
        console.error(error);
        lista.innerText = `${error.message}`;
    }
}

buscarProdutos();
