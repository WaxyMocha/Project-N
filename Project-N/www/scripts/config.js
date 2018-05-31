// jscs:disable maximumLineLength
/*
  aby dodać opcję:
  -dodaj właściwość w obiekcie 'config'
  -dodaj w 'prefsWrapper' sekcję '.prefsOption' składającą się tytułu i elementu z którego do config zostanie przekazana wartość do obiektu config
  -dodaj do savePrefs() przekazywanie wartości do obiektu config
*/

let config = {
  klasa: 2,
  darkTheme: false,
  pathToPlan: 'file:///android_asset/www/scripts/plan',
};

let saveConfig = function () {
  localStorage.setItem('config', JSON.stringify(config));
};

let loadConfig = function () {
  if (localStorage.getItem('config') != null) {
    config = JSON.parse(localStorage.getItem('config'));
  } else {
    saveConfig();
  }
};

let savePrefs = function () {
  //zmień domyślnie ładowaną klasę
  config.klasa = Number(document.getElementById('prefKlasa').value);

  //przeładuj plan
  zaladujPlan(`./scripts/plan/o${config.klasa}.html`);

  saveConfig();

};
