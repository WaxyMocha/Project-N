// jscs:disable maximumLineLength
// Aby obejrzeć wprowadzenie do pustego szablonu, zobacz następującą dokumentację:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Aby debugować kod ładowania strony w narzędziu cordova-simulate, na urządzeniach z systemem Android lub w emulatorach systemu Android: uruchom aplikację, ustaw punkty przerwania,
// a następnie uruchom polecenie „window.location.reload()” w konsoli języka JavaScript.

declare var require: (modules: string[], ready: Function, errback: Function) => void;
declare var navigator:any;
declare var window:any;

import {Parse} from "./parse";
import {Interface} from "./interface"
import {Config} from "./config";

let pliki;

document.addEventListener('deviceready', onDeviceReady.bind(this), false);

function onDeviceReady() {
	// Obsługa zdarzeń wstrzymywania i wznawiania działania oprogramowania Cordova
	document.addEventListener('pause', onPause.bind(this), false);
	document.addEventListener('resume', onResume.bind(this), false);
	navigator.splashscreen.hide();

	let config = new Config();
	let parse = new Parse(config);
	let interface_ = new Interface(parse, config);

	//zainicjuj panel nawigacyjny (menu z lewej)
	interface_.initNav();
	interface_.initPlan();
	config.loadConfig();

	parse.zaladujPlan(`./scripts/plan/o${config.config.klasa}.html`);
	//while(parse.getPlan() !== ["test"]);
	interface_.showDzien();

}

function onPause() {
	// TODO: Ta aplikacja została zawieszona, Zapisz tutaj stan aplikacji. (np. powrót do ekranu głównego)
}

function onResume() {
	// TODO: Ta aplikacja została ponownie aktywowana. Przywróć tutaj stan aplikacji.
}

function listDir(path) {
	window.resolveLocalFileSystemURL(path,

		function (fileSystem) {
			let reader = fileSystem.createReader();
			reader.readEntries(

				function (entries) {
					console.log(entries[0].lastModifiedDate);
					pliki = entries;
				},

				function (err) {
					return err;
				}
			);
		}, function (err) {
			return err;
		}
	);
}
