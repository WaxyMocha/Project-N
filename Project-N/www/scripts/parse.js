// aby sparsować plan lekcji wywołaj
// 'zaladujPlan(URL)'
// URL, to lokalna ścieżka do pliku HTML,
// NIE MOŻNA wpływać na zawartość ramki, jeśli plik html nie jest przechowywany lokalnie.
// Po zakończeniu parsowania ramka jest usuwana, a plan jest dostępny w zmiennej "plan"

// Tworzy ramkę i ładuje plan do niej
function zaladujPlan(url, mode, id) {
  document.getElementById('plan1').innerHTML = config.klasa;
  let iframe = document.createElement('iframe');
  iframe.src = url;
  if (id == undefined) {
    iframe.id = 'tPlan';
  } else {
    iframe.id = id;
  }

  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  if (mode == 'plan' || mode == undefined) {
    iframe.addEventListener('load', parsujPlan);
  } else if (mode == 'data') {
    iframe.addEventListener('load', checkPlan);
  } else if (mode == 'klasa') {
    iframe.addEventListener('load', sprawdzKlase);
  }

}

let plan;
let plany = [];
let klasa;
let data;
let pap = false;

let klasaPlik = [];

let getClass = function (ifr) {
  klasa = ifr.contentWindow.document.querySelector('.tytulnapis').innerHTML;
};

function parsujPlan() {
  const iframe = document.getElementById('tPlan');
  let tabela = iframe.contentWindow.document.querySelector('.tabela'); //wczytanie tabelki z ramki
  let arr = [];
  getClass(iframe);
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
  if (pap) {
    plany.push(plan);
    plan = undefined;
    return;
  }

  showDzien();
  return arr;
}

function sprawdzDate() {
  const ifr = document.getElementById('tPlan');
  let t = ifr.contentWindow.document.querySelectorAll('img')[1].parentNode.parentNode.children[0];
  let stringi = t
    .textContent
    .replace(/[^\d.-]/g, '');

  let data = new Date(
    Number(stringi.slice(stringi.lastIndexOf('.') + 1)),
    Number(stringi.slice(stringi.indexOf('.') + 1, stringi.lastIndexOf('.'))) - 1,
    Number(stringi.slice(0, stringi.indexOf('.')))
  );

  ifr.parentNode.removeChild(ifr);
  temp.modifDate = data;
  return data;
};

function sprawdzKlase() {
  const ifr = document.getElementById('tPlan');
  klasa = ifr.contentWindow.document.querySelector('.tytulnapis').innerHTML;
  ifr.parentNode.removeChild(ifr);
  return klasa;
};

function checkPlan() {
  listDir(config.pathToPlan);
  console.log(temp.pliki);
  let data = sprawdzDate();
  console.log(data);
  let data2 = new Date(info.modifDate);
  console.log(data2);
  if (data > data2) {
    pAllPlans();
  }

  while (plany.length != temp.pliki.length) console.log('a');
  console.log('DONE!');
}

function pAllPlans() {

  temp.pliki = undefined;
  listDir(config.pathToPlan);
  setTimeout(() => {
    for (var i = 0; i < temp.pliki.length; i++) {
      let iframe = document.createElement('iframe');
      iframe.id = 'tPlan' + i;
      iframe.style.display = 'none';
      iframe.src = temp.pliki[i].nativeURL;
      document.body.appendChild(iframe);
      iframe.addEventListener('load', pp);
    }
  }, 1000);

}

function pp(e) {
  const iframe = e.path[0];
  let tabela = iframe.contentWindow.document.querySelector('.tabela'); //wczytanie tabelki z ramki
  let arr = [];
  klasa = iframe.contentWindow.document.querySelector('.tytulnapis').innerHTML;
  let plan;
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
  plan = { klasa: klasa, plan: arr, };
  iframe.parentNode.removeChild(iframe); //usunięcie ramki

  //pokaż odpowiedni dzień tygodnia

  plany.push(plan);
  return arr;
}
