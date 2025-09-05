console.log("Arquivo JS carregado com sucesso!");

// Funções auxiliares
const calcularPresenca = (aulas, faltas) => ((aulas - faltas) / aulas) * 100;
const calcularMedia = (p1, p2) => (p1 + p2) / 2;

// Função principal
function calcular() {
  const aulas = parseInt(document.getElementById("numAulas").value);
  const faltas = parseInt(document.getElementById("faltas").value);
  const p1 = parseFloat(document.getElementById("p1").value);
  const p2 = parseFloat(document.getElementById("p2").value);
  const recInput = document.getElementById("recuperacao");
  const recBox = document.getElementById("recuperacao-box");

  if (isNaN(aulas) || isNaN(faltas) || isNaN(p1) || isNaN(p2)) {
    alert("Por favor, preencha todos os campos antes de calcular.");
    return;
  }

  const presenca = calcularPresenca(aulas, faltas);
  let media = calcularMedia(p1, p2);
  let situacao = "";
  let notaRec = null;

  if (presenca < 75) {
    situacao = "Reprovado por falta";
    recBox.style.display = "none";
  } else {
    if (media >= 7) {
      situacao = "Aprovado";
      recBox.style.display = "none";
    } else if (media >= 5) {
      recBox.style.display = "block";
      notaRec = parseFloat(recInput.value);
      if (!isNaN(notaRec)) {
        const mediaFinal = (media + notaRec) / 2;
        situacao = mediaFinal >= 5 ? "Aprovado após recuperação" : "Reprovado após recuperação";
      } else {
        situacao = "Necessita fazer a prova de recuperação";
      }
    } else {
      situacao = "Reprovado por nota";
      recBox.style.display = "none";
    }
  }

  document.getElementById("resultado").innerHTML = `
    <strong>Número de aulas do semestre:</strong> ${aulas}<br>
    <strong>Número de faltas do aluno:</strong> ${faltas}<br>
    <strong>Percentual de presença do aluno:</strong> ${presenca.toFixed(2)}%<br>
    <strong>A primeira nota:</strong> ${p1}<br>
    <strong>A segunda nota:</strong> ${p2}<br>
    ${notaRec !== null ? `<strong>Nota complementar (recuperação):</strong> ${notaRec}<br>` : ""}
    <strong>Situação final do aluno:</strong> ${situacao}
  `;
}

// Função para limpar os campos
function limpar() {
  document.getElementById("numAulas").value = "";
  document.getElementById("faltas").value = "";
  document.getElementById("p1").value = "";
  document.getElementById("p2").value = "";
  document.getElementById("recuperacao").value = "";
  document.getElementById("recuperacao-box").style.display = "none";
  document.getElementById("resultado").innerHTML = "";
}