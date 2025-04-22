const carros = [  ];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("carros-container");
  const modal = document.getElementById("modal");
  const modalInfo = document.getElementById("modal-info");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("form-locacao");
  const selectCarro = form.carroSelecionado;

  carros.forEach(carro => {
    const card = document.createElement("div");
    card.className = "car-card";
    card.innerHTML = `
      <h3>${carro.modelo}</h3>
      <img src="assets/${carro.imagem}" alt="${carro.modelo}">
      <p>Diária: R$${carro.valor_diaria.toFixed(2)}</p>
      <button onclick="mostrarDetalhes(${carro.id})">Ver Detalhes</button>
    `;
    container.appendChild(card);


    const option = document.createElement("option");
    option.value = carro.id;
    option.textContent = `${carro.modelo} - R$${carro.valor_diaria.toFixed(2)}`;
    selectCarro.appendChild(option);
  });

  closeBtn.onclick = () => (modal.classList.add("hidden"));
  window.onclick = e => { if (e.target === modal) modal.classList.add("hidden") };


  form.addEventListener("submit", e => {
    e.preventDefault();
    const nome = form.nome.value;
    const cpf = form.cpf.value;
    const dataInicio = form.dataInicio.value;
    const dataFim = form.dataFim.value;
    const carroId = parseInt(form.carroSelecionado.value);

    if (!/^\d{11}$/.test(cpf)) {
      alert("CPF deve conter exatamente 11 dígitos numéricos.");
      return;
    }

    const locacoes = JSON.parse(localStorage.getItem("locacoes")) || [];
    locacoes.push({ nome, cpf, dataInicio, dataFim, carroId });
    localStorage.setItem("locacoes", JSON.stringify(locacoes));

    alert("Locação registrada com sucesso!");
    form.reset();
  });
});

function mostrarDetalhes(id) {
  const carro = carros.find(c => c.id === id);
  const modal = document.getElementById("modal");
  const modalInfo = document.getElementById("modal-info");

  modalInfo.innerHTML = `
    <h2>${carro.modelo}</h2>
    <img src="assets/${carro.imagem}" alt="${carro.modelo}" style="width: 100%;">
    <p>Marca: ${carro.marca}</p>
    <p>Ano: ${carro.ano}</p>
    <p>Combustível: ${carro.combustivel}</p>
    <p>Portas: ${carro.portas}</p>
    <p>Transmissão: ${carro.transmissao}</p>
    <p><strong>R$${carro.valor_diaria.toFixed(2)} por dia</strong></p>
  `;
  modal.classList.remove("hidden");
}
card.innerHTML = `
  <h3>${carro.modelo}</h3>
  <img src="assets/${carro.imagem}" alt="${carro.modelo}">
  <p><strong>Marca:</strong> ${carro.marca}</p>
  <p><strong>Ano:</strong> ${carro.ano}</p>
  <p><strong>Combustível:</strong> ${carro.combustivel}</p>
  <p><strong>Transmissão:</strong> ${carro.transmissao}</p>
  <p><strong>Diária:</strong> R$${carro.valor_diaria.toFixed(2)}</p>
  <button onclick="mostrarDetalhes(${carro.id})">Ver Detalhes</button>
`;
