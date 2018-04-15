// Aby obejrzeć wprowadzenie do pustego szablonu, zobacz następującą dokumentację:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Aby debugować kod ładowania strony w narzędziu cordova-simulate, na urządzeniach z systemem Android lub w emulatorach systemu Android: uruchom aplikację, ustaw punkty przerwania, 
// a następnie uruchom polecenie „window.location.reload()” w konsoli języka JavaScript.


document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

function onDeviceReady() {
    // Obsługa zdarzeń wstrzymywania i wznawiania działania oprogramowania Cordova
    document.addEventListener( 'pause', onPause.bind( this ), false );
    document.addEventListener( 'resume', onResume.bind( this ), false );
    statusbarTransparent.enable(); 
    // TODO: Załadowano oprogramowanie Cordova. Wykonaj tutaj wszystkie wymagane kroki inicjowania tego oprogramowania.
  
};

function onPause() {
    // TODO: Ta aplikacja została zawieszona, Zapisz tutaj stan aplikacji.
};

function onResume() {
    // TODO: Ta aplikacja została ponownie aktywowana. Przywróć tutaj stan aplikacji.
};
