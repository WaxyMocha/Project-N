// jscs:disable maximumLineLength
// Aby obejrzeć wprowadzenie do pustego szablonu, zobacz następującą dokumentację:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Aby debugować kod ładowania strony w narzędziu cordova-simulate, na urządzeniach z systemem Android lub w emulatorach systemu Android: uruchom aplikację, ustaw punkty przerwania,
// a następnie uruchom polecenie „window.location.reload()” w konsoli języka JavaScript.

let temp = {
  pliki: undefined,
};

let info = {
  modifDate: '2018-04-27T20:16:09.528Z',
};

document.addEventListener('deviceready', onDeviceReady.bind(this), false);

function onDeviceReady() {
  // Obsługa zdarzeń wstrzymywania i wznawiania działania oprogramowania Cordova
  document.addEventListener('pause', onPause.bind(this), false);
  document.addEventListener('resume', onResume.bind(this), false);
  navigator.splashscreen.hide();

  //window.plugins.headerColor.tint("#149b07"); //kolor w widoku otwartych apek
  //zainicjuj panel nawigacyjny (menu z lewej)
  initNav();
  initP();
  loadConfig();

  zaladujPlan(`./scripts/plan/o${config.klasa}.html`);

  //initDzien(); // tu się buguje, przeniesiono do genPlan();

};

function onPause() {
  // TODO: Ta aplikacja została zawieszona, Zapisz tutaj stan aplikacji. (np. powrót do ekranu głównego)
};

function onResume() {
  // TODO: Ta aplikacja została ponownie aktywowana. Przywróć tutaj stan aplikacji.
};

/*
do zmiennej pliki zwraca zawartość folderu, jako tablica zawierająca "FileEntries" i "DirectoryEntries"
zawierają one między innymi, ścieżkę i nazwę pliku/katalogu
*/

function listDir(path) {
  window.resolveLocalFileSystemURL(path,
    function (fileSystem) {
      var reader = fileSystem.createReader();
      reader.readEntries(
        function (entries) {
          // console.log(entries);
          temp.pliki = entries;
          console.log(entries);
          let r = entries;
          return r;
        },

        function (err) {
          //console.log(err);
          return error;
        }
      );
    }, function (err) {

      //console.log(err);
      return error;
    }
  );
}

function planCache() {
  listDir(config.pathToPlan);
  while (temp.pliki == undefined) true;

  zaladujPlan(config.pathToPlan + '/' + temp.pliki[0].name, 'data');
  while (temp.modifDate == undefined) true;

  if (info.modifDate <= temp.modifDate)
  temp.pliki = undefined;
}

function sleep(ms) {
  let st = new Date().getTime();
  while ((new Date().getTime() - st) < ms) true;
  return;
}
