// jscs:disable maximumLineLength
/*
  aby dodać opcję:
  -dodaj właściwość w obiekcie 'config'
  -dodaj w 'prefsWrapper' sekcję '.prefsOption' składającą się tytułu i elementu z którego do config zostanie przekazana wartość do obiektu config
  -dodaj do savePrefs() przekazywanie wartości do obiektu config
*/

import Parse from "./parse";

class Config {
	public config = {
		klasa: 2,
		darkTheme: false
	};

	saveConfig() {
		localStorage.setItem('config', JSON.stringify(this.config));
	}

	loadConfig() {
		if (localStorage.getItem('config') !== null) {
			this.config = JSON.parse(localStorage.getItem('config'));
		} else {
			this.saveConfig();
		}
	}

	savePrefs() {
		//zmień domyślnie ładowaną klasę
		this.config.klasa = Number((<HTMLInputElement>document.getElementById('prefKlasa')).value);

		let parse = new Parse();
		//przeładuj plan
		parse.zaladujPlan(`./scripts/plan/o${this.config.klasa}.html`);

		this.saveConfig();
	}
}

export {Config};