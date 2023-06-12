const addBtn = document.querySelector("#addBtn");
const produto = document.querySelector("#product");
const quantidade = document.querySelector("#quantity");
const preço = document.querySelector("#price");
const lista = document.querySelector(".productsList");
const valorTotal = document.querySelector("#totalPrice");
const clearBtn = document.querySelector("#clearBtn");

const compras = [];

function checkChar(e) {
  const char = String.fromCharCode(e.keyCode);

  const pattern = "[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]";

  if (char.match(pattern)) {
    console.log(char);
    return true;
  }
}

function novaCompra() {
  const compra = {};

  compra.produto = produto.value;
  compra.quantidade = quantidade.value;
  compra.preço = preço.value;

  compras.push(compra);

  listarCompras();
  produto.value = "";
  quantidade.value = "";
  preço.value = "";
}

function listarCompras() {
  let novaLi = "";
  let preçoTotal = 0;

  compras.forEach((item, posicao) => {
    novaLi += `<li class="produtoUnidade">
    <h3>${item.produto}</h3>
    <h3>Quantidade: ${item.quantidade}</h3>
    <h3 >Valor (R$): ${(item.preço * item.quantidade).toFixed(
      2
    )}</h3><button id="clearBtn" onclick="deletarCompra(${posicao})">Remover</button></li>`;

    preçoTotal += item.preço * item.quantidade;
    valorTotal.textContent = `Valor total (R$): ${preçoTotal.toFixed(2)}`;
    valorTotal.classList.add("totalPrice");
  });

  lista.innerHTML = novaLi;

  showClearBtn();
}

function deletarCompra(posicao) {
  compras.splice(posicao, 1);
  if (compras.length === 0) {
    valorTotal.textContent = "";
  }

  listarCompras();
}

function clearData() {
  while (compras.length !== 0) {
    deletarCompra();
  }
}

function showClearBtn() {
  if (compras.length === 0) {
    clearBtn.classList.add("remove");
  } else {
    clearBtn.classList.remove("remove");
  }
}

produto.addEventListener("keypress", function (e) {
  if (!checkChar(e)) {
    e.preventDefault();
  }
});

showClearBtn();
addBtn.addEventListener("click", novaCompra);
clearBtn.addEventListener("click", clearData);
