// jscs:disable maximumLineLength
// Aby obejrzeć wprowadzenie do pustego szablonu, zobacz następującą dokumentację:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Aby debugować kod ładowania strony w narzędziu cordova-simulate, na urządzeniach z systemem Android lub w emulatorach systemu Android: uruchom aplikację, ustaw punkty przerwania,
// a następnie uruchom polecenie „window.location.reload()” w konsoli języka JavaScript.

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

  zaladujPlan(`./scripts/plan/o${config.defaultClass}.html`);

  //initDzien(); // tu się buguje, przeniesiono do genPlan();

};

function onPause() {
  // TODO: Ta aplikacja została zawieszona, Zapisz tutaj stan aplikacji. (np. powrót do ekranu głównego)
};

function onResume() {
  // TODO: Ta aplikacja została ponownie aktywowana. Przywróć tutaj stan aplikacji.
};
