let projetos = [];
fetch('carros.json')
  .then(res => res.json())
  .then(data => {
    projetos = data;
    renderizarPortfolio();
  })
  .catch(err => console.error("Erro ao carregar carros:", err));

const portfolioContainer = document.getElementById("portfolio");
const detalhes = document.getElementById("detalhes");

// Detecta se é mobile
const isMobile = window.innerWidth <= 768;

function renderizarPortfolio() {
  portfolioContainer.innerHTML = "";
  projetos.forEach((proj, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${proj.imagens[0]}" alt="${proj.titulo}">
      <h3>${proj.titulo}</h3>
      <div class="preco">${proj.preco}</div>
    `;
    card.onclick = () => abrirProjeto(i);
    portfolioContainer.appendChild(card);
  });
}

function abrirProjeto(i) {
  const p = projetos[i];

  // Se for mobile, redireciona para página de detalhes
  if (isMobile) {
    window.location.href = `detalhes.html?id=${i}`;
    return;
  }

  // Modo desktop → carrega dentro da mesma página
  document.getElementById("projetoTitulo").textContent = p.titulo;
  document.getElementById("projetoDescricao").textContent = p.descricao;
  document.getElementById("projetoPreco").textContent = p.preco;
  document.getElementById("projetoArea").textContent = p.area;
  document.getElementById("projetoTempo").textContent = p.tempo;
  document.getElementById("projetoAutor").textContent = p.autor;

  const lista = document.getElementById("projetoServicos");
  lista.innerHTML = "";
  p.servicos.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    lista.appendChild(li);
  });

  const imagens = document.getElementById("carouselImages");
  imagens.innerHTML = "";
  p.imagens.forEach(img => {
    const el = document.createElement("img");
    el.src = img;
    imagens.appendChild(el);
  });

  portfolioContainer.style.display = "none";
  detalhes.style.display = "flex";
  iniciarCarrossel();
}

function voltar() {
  detalhes.style.display = "none";
  portfolioContainer.style.display = "flex";
}

function iniciarCarrossel() {
  const images = document.querySelector(".carousel-images");
  const imgCount = images.children.length;
  let index = 0;
  function showImage(i) {
    images.style.transform = `translateX(${-i * 100}%)`;
  }
  document.querySelector(".prev").onclick = () => {
    index = (index > 0) ? index - 1 : imgCount - 1;
    showImage(index);
  };
  document.querySelector(".next").onclick = () => {
    index = (index < imgCount - 1) ? index + 1 : 0;
    showImage(index);
  };
  showImage(0);
}
