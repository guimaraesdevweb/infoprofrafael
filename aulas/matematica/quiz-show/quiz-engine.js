/* ==========================================================================
   MOTOR DO QUIZ INTERATIVO - SHOW DO MILHÃO
   Criado para o Prof. Rafael Guimarães
   ========================================================================== */

// --- 1. CONFIGURAÇÕES E ÁUDIOS ---
const CONFIG = {
  modoInfantil: true, // true = esconde a nota (ex: 3/5) no final, foca no incentivo. false = mostra a nota.
  tempoSuspense: 2000 // Tempo de suspense em milissegundos (2000 = 2 segundos) antes de revelar a resposta
};

// Objeto para armazenar os áudios (Você precisará colocar os arquivos MP3 na pasta assets/audio)
const audios = {
  suspense: new Audio('assets/audio/suspense.mp3'),
  certo: new Audio('assets/audio/certo.mp3'),
  errado: new Audio('assets/audio/errado.mp3'),
  tesoura: new Audio('assets/audio/tesoura.mp3')
};

// --- 2. BANCO DE PERGUNTAS ---
// Edite isso aqui antes de cada aula!
const questions = [
  {
    text: "Se você tem 3 maçãs e ganha mais 4, com quantas maçãs você fica?",
    image: "", // Se não tiver imagem, deixe as aspas vazias. Se tiver: "assets/img/macas.png"
    options: ["6", "7", "8", "9"],
    correct: 1 // O índice da resposta correta (0 = A, 1 = B, 2 = C, 3 = D)
  },
  {
    text: "Qual é o segundo sucessor de 5?",
    image: "", 
    options: ["06", "15", "07", "08"],
    correct: 2
  },
  {
    text: "Qual figura geométrica tem 3 lados?",
    image: "", 
    options: ["Quadrado", "Círculo", "Triângulo", "Retângulo"],
    correct: 2
  },
  {
    text: "Qual figura geométrica tem 4 lados de igual comprimento?",
    image: "", 
    options: ["Quadrado", "Círculo", "Triângulo", "Retângulo"],
    correct: 0
  }
];

// --- 3. VARIÁVEIS DE ESTADO ---
let currentQuestionIndex = 0;
let score = 0;
let isWaiting = false; 
let tesouraUsada = false;
let alternativaSelecionada = null;
let botaoSelecionado = null;
let faseJogo = 0; // 0 = Escolhendo, 1 = Suspense, 2 = Revelado

// Elementos do DOM
const elCounter = document.getElementById('question-counter');
const elQuestionText = document.getElementById('question-text');
const elQuestionImage = document.getElementById('question-image');
const elOptionsContainer = document.getElementById('options-container');
const btnTesoura = document.getElementById('btn-tesoura');
const btnAvancar = document.getElementById('btn-avancar');

// --- 4. FUNÇÕES DO JOGO ---
window.onload = () => {
  loadQuestion();
  const modoTexto = document.querySelector('#game-screen div span:nth-child(2) strong');
  if(modoTexto) {
    modoTexto.innerText = CONFIG.modoInfantil ? "ATIVADO" : "DESATIVADO";
    modoTexto.style.color = CONFIG.modoInfantil ? "var(--success)" : "var(--danger)";
  }
};

function loadQuestion() {
  isWaiting = false;
  faseJogo = 0;
  alternativaSelecionada = null;
  botaoSelecionado = null;
  
  const q = questions[currentQuestionIndex];
  elCounter.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
  elQuestionText.innerText = q.text;

  if (q.image && q.image !== "") {
    elQuestionImage.src = q.image;
    elQuestionImage.style.display = "block";
  } else {
    elQuestionImage.style.display = "none";
  }

  elOptionsContainer.innerHTML = '';
  const labels = ["A) ", "B) ", "C) ", "D) "];
  
  q.options.forEach((optText, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<strong>${labels[index]}</strong> ${optText}`;
    btn.onclick = () => selectOption(index, btn);
    elOptionsContainer.appendChild(btn);
  });

  // Configura botões de controle
  btnAvancar.classList.add('hidden');
  btnAvancar.innerText = "Revelar Resposta";

  if (tesouraUsada) {
    btnTesoura.disabled = true;
    btnTesoura.style.opacity = "0.5";
    btnTesoura.innerText = "✂️ Tesoura já utilizada";
  } else {
    btnTesoura.disabled = false;
    btnTesoura.style.opacity = "1";
    btnTesoura.innerText = "✂️ Cortar 2 Erradas";
  }
}

function selectOption(selectedIndex, btnElement) {
  if (isWaiting || faseJogo !== 0) return;
  isWaiting = true;
  faseJogo = 1;
  btnTesoura.disabled = true;
  
  alternativaSelecionada = selectedIndex;
  botaoSelecionado = btnElement;

  audios.suspense.currentTime = 0;
  audios.suspense.play().catch(e => console.log("Áudio bloqueado."));
  btnElement.classList.add('selected');

  // Mostra o botão para o professor revelar
  btnAvancar.classList.remove('hidden');
}

// Nova função acionada pelo botão "Avançar"
function acaoAvancar() {
  if (faseJogo === 1) {
    // Fase 1: Parar suspense e revelar se está certo ou errado
    audios.suspense.pause();
    revelarResposta();
    faseJogo = 2;
    btnAvancar.innerText = "Próxima Pergunta ➔";
  } else if (faseJogo === 2) {
    // Fase 2: Avançar para a próxima pergunta
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }
}

function revelarResposta() {
  const q = questions[currentQuestionIndex];
  const botoes = elOptionsContainer.querySelectorAll('.option-btn');

  botaoSelecionado.classList.remove('selected');

  if (alternativaSelecionada === q.correct) {
    audios.certo.currentTime = 0;
    audios.certo.play().catch(e => {});
    botaoSelecionado.classList.add('correct');
    score++;
  } else {
    audios.errado.currentTime = 0;
    audios.errado.play().catch(e => {});
    botaoSelecionado.classList.add('wrong');
    botoes[q.correct].classList.add('correct');
  }
}

// O Poder da Tesoura
function usarTesoura() {
  if (faseJogo !== 0 || tesouraUsada) return;
  
  tesouraUsada = true;
  btnTesoura.disabled = true;
  
  audios.tesoura.currentTime = 0;
  audios.tesoura.play().catch(e => {});

  const q = questions[currentQuestionIndex];
  const botoes = elOptionsContainer.querySelectorAll('.option-btn');
  
  let indicesIncorretos = [0, 1, 2, 3].filter(i => i !== q.correct);
  indicesIncorretos.sort(() => Math.random() - 0.5);
  const paraEliminar = [indicesIncorretos[0], indicesIncorretos[1]];

  paraEliminar.forEach(idx => {
    botoes[idx].classList.add('eliminated');
  });
}

function showResults() {
  document.getElementById('game-screen').classList.add('hidden');
  const telaResultado = document.getElementById('result-screen');
  telaResultado.classList.remove('hidden');

  const resultTitle = document.getElementById('result-title');
  const resultMessage = document.getElementById('result-message');
  const scoreDisplay = document.getElementById('score-display');
  const scoreCount = document.getElementById('score-count');

  if (CONFIG.modoInfantil) {
    scoreDisplay.classList.add('hidden');
    if (score === questions.length) {
      resultTitle.innerText = "Você arrasou demais! 🏆🌟";
      resultMessage.innerText = "Gênio da matemática! Acertou tudo perfeitamente!";
    } else if (score > 0) {
      resultTitle.innerText = "Muito bem! 🎈✨";
      resultMessage.innerText = "Você se esforçou e foi super bem! Vamos continuar treinando juntos!";
    } else {
      resultTitle.innerText = "Quase lá! 💪🧠";
      resultMessage.innerText = "O importante é aprender! Na próxima aula você vai brilhar ainda mais!";
    }
  } else {
    scoreDisplay.classList.remove('hidden');
    scoreCount.innerText = score;
    resultTitle.innerText = "Fim de Jogo! 🏁";
    resultMessage.innerText = "Veja o seu desempenho abaixo:";
  }
}

