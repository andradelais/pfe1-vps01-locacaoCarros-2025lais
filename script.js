const carros = [
  { id: 1, modelo: "Onix LT 1.0", marca: "Chevrolet", ano: 2022, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHpL426f2Qen9m83Dv4KbFUKn_OVMrxd9m6w&s", combustivel: "Flex", portas: 4, transmissao: "Manual", valor_diaria: 120.00 },
  { id: 2, modelo: "HB20 Vision", marca: "Hyundai", ano: 2023, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzn2zcAV7c-cLQhudToxPckMvBURoxsuixnw&s", combustivel: "Gasolina", portas: 4, transmissao: "Automático", valor_diaria: 210.00 },
  { id: 4, modelo: "Corolla XEi", marca: "Toyota", ano: 2022, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5Co09FVUi4KN0qDP7T4_n65cDVjNOccGug&s", combustivel: "Flex", portas: 4, transmissao: "Automático", valor_diaria: 250.00 },
  { id: 5, modelo: "Civic Touring", marca: "Honda", ano: 2021, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlYhy7gcY1NlK25NyAsz70sPeadAPdRsJt1w&s", combustivel: "Gasolina", portas: 4, transmissao: "Automático", valor_diaria: 230.00 },
  { id: 6, modelo: "Fiat Mobi Like", marca: "Fiat", ano: 2022, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR02MvtOIVsodtrNfKs65jEXYiKxgRrjNlnQ&s", combustivel: "Flex", portas: 4, transmissao: "Manual", valor_diaria: 90.00 },
  { id: 7, modelo: "Kwid Zen", marca: "Renault", ano: 2023, imagem: "https://exame.com/wp-content/uploads/2017/07/kwid_zen_6.jpg?quality=70&strip=info", combustivel: "Flex", portas: 4, transmissao: "Manual", valor_diaria: 95.00 },
  { id: 8, modelo: "Gol Trendline", marca: "Volkswagen", ano: 2021, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3UUqwBYvXkTsfodvi_SiWbBoivgs4441dog&s", combustivel: "Flex", portas: 4, transmissao: "Manual", valor_diaria: 100.00 },
  { id: 9, modelo: "Compass Limited", marca: "Jeep", ano: 2022, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_v8TO4dv43dHuNFXfCz27OQlybA6FhN9qUg&s", combustivel: "Diesel", portas: 4, transmissao: "Automático", valor_diaria: 270.00 },
  { id: 10, modelo: "Tracker Premier", marca: "Chevrolet", ano: 2023, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoXw9vBvF-824HyTUpf-u1yXp9nDLuddyEBw&s", combustivel: "Flex", portas: 4, transmissao: "Automático", valor_diaria: 220.00 }
];

const listaCarros = document.getElementById("lista-carros");
const selectCarro = document.getElementById("carro");
const modal = document.getElementById("modal-detalhes");
const detalhesCarro = document.getElementById("detalhes-carro");
const closeBtn = document.querySelector(".close-btn");


carros.forEach(carro => {
  const card = document.createElement("div");
  card.classList.add("carro-card");
  card.innerHTML = `
    <img src="${carro.imagem}" alt="${carro.modelo}">
    <h3>${carro.modelo}</h3>
    <p>Marca: ${carro.marca}</p>
    <p>Valor diária: R$${carro.valor_diaria.toFixed(2)}</p>
    <button data-id="${carro.id}">Ver Detalhes</button>
  `;
  listaCarros.appendChild(card);

  const option = document.createElement("option");
  option.value = carro.id;
  option.textContent = carro.modelo;
  selectCarro.appendChild(option);
});

listaCarros.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.dataset.id;
    const carro = carros.find(carro => carro.id === Number(id));
    detalhesCarro.innerHTML = `
      <h3>${carro.modelo}</h3>
      <p>Marca: ${carro.marca}</p>
      <p>Ano: ${carro.ano}</p>
      <p>Combustível: ${carro.combustivel}</p>
      <p>Portas: ${carro.portas}</p>
      <p>Transmissão: ${carro.transmissao}</p>
      <p>Valor diária: R$${carro.valor_diaria.toFixed(2)}</p>
    `;
    modal.style.display = "block";
  }
});


closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});


document.getElementById("locacao-form").addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const dataInicio = document.getElementById("data-inicio").value;
  const dataFim = document.getElementById("data-fim").value;
  const carroId = document.getElementById("carro").value;

  if (cpf.length !== 11 || isNaN(cpf)) {
    alert("CPF deve conter 11 dígitos numéricos.");
    return;
  }

  const locacao = { nome, cpf, dataInicio, dataFim, carroId };

  const locacoes = JSON.parse(localStorage.getItem("locacoes")) || [];
  locacoes.push(locacao);
  localStorage.setItem("locacoes", JSON.stringify(locacoes));

  alert("Locação cadastrada com sucesso!");
  e.target.reset();
});
