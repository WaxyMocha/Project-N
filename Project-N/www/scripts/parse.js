// aby sparsować plan lekcji wywołaj
// 'zaladujPlan(URL)'
// URL, to lokalna ścieżka do pliku HTML,
// NIE MOŻNA wpływać na zawartość ramki, jeśli plik html nie jest przechowywany lokalnie.
// Po zakończeniu parsowania ramka jest usuwana, a plan jest dostępny w zmiennej "plan"

// Tworzy ramkę i ładuje plan do niej
function zaladujPlan(url) {
  let iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.id = 'tPlan';
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  iframe.addEventListener('load', parsujPlan);
}

let plan;
let klasa;

let getClass = function (ifr) {
  klasa = ifr.contentWindow.document.querySelector('.tytulnapis').innerHTML;
};

function parsujPlan() {
  const iframe = document.getElementById('tPlan');
  let tabela = iframe.contentWindow.document.querySelector('.tabela'); //wczytanie tabelki z ramki
  getClass(iframe);
  let arr = [];

  let rows = tabela.children[0].children; //pobranie wierszy tabelki

  for (i = 0; i < rows.length; i++) { // dodanie pojedyńczych elementów do arr
    let tempArr = [];
    for (j = 0; j < rows[i].children.length; j++) {

      if (rows[i].children[j].innerHTML != '&nbsp;') {
        tempArr.push(rows[i].children[j].innerHTML);
      } else {
        tempArr.push('');
      }
    }

    arr.push(tempArr);
  }

  let tempArr = new Array(arr[0].length); //przygotowanie tabeli do przegrupowania elementów
  for (var i = 0; i < tempArr.length; i++) {
    tempArr[i] = new Array(arr.length);
  }

  for (i = 0; i < arr.length; i++) { //grupowanie elementów kolumnami, zamiast wierszami
    for (j = 0; j < arr[i].length; j++) {
      if (arr[i][j] != '&nbsp;') {
        tempArr[j][i] = arr[i][j];
      } else {
        tempArr[j][i] = '';
      }

    }
  }

  arr = tempArr;
  plan = arr;
  iframe.parentNode.removeChild(iframe); //usunięcie ramki

  //pokaż odpowiedni dzień tygodnia
  showDzien();
  return arr;
}
