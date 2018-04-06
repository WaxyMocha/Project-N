const iframe = document.getElementById('tPlan'); //pobranie ramki

function parsujPlan() {
  let tabela = iframe.contentWindow.document.querySelector('.tabela');
  console.log(tabela);
  console.log(tabela.children);

}

parsujPlan();
