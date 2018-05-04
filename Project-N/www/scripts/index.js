// Aby obejrzeć wprowadzenie do pustego szablonu, zobacz następującą dokumentację:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Aby debugować kod ładowania strony w narzędziu cordova-simulate, na urządzeniach z systemem Android lub w emulatorach systemu Android: uruchom aplikację, ustaw punkty przerwania,
// a następnie uruchom polecenie „window.location.reload()” w konsoli języka JavaScript.

document.addEventListener('deviceready', onDeviceReady.bind(this), false);

function onDeviceReady() {
  // Obsługa zdarzeń wstrzymywania i wznawiania działania oprogramowania Cordova
  document.addEventListener('pause', onPause.bind(this), false);
  document.addEventListener('resume', onResume.bind(this), false);
  // statusbarTransparent.enable();
  navigator.splashscreen.hide();
  //window.plugins.headerColor.tint("#149b07"); //kolor w widoku otwartych apek
  //zainicjuj panel nawigacyjny (menu z lewej)
  initNav();
  initDzien();
  initP();

    downloadPlans();
    zaladujPlan(cordova.file.dataDirectory + `plan/o6.html`);
    

};

function downloadPlans() {
    downloader.init({folder: "plan", fileSystem:cordova.file.dataDirectory , delete: false});
    downloader.getMultipleFiles([{url:"http://www.zse.zary.pl/plan/plany/o1.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o2.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o3.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o4.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o5.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o6.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o7.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o8.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o9.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o10.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o11.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o12.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o13.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o14.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o15.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o16.html"},
                                {url:"http://www.zse.zary.pl/plan/plany/o17.html"}]);
}

function onPause() {
  // TODO: Ta aplikacja została zawieszona, Zapisz tutaj stan aplikacji. (np. powrót do ekranu głównego)
};

function onResume() {
  // TODO: Ta aplikacja została ponownie aktywowana. Przywróć tutaj stan aplikacji.
};
