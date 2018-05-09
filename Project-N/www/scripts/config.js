let config = {
  klasa: 2,
  darkTheme: false,
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

};
