// jscs:disable maximumLineLength

declare var M:any;

import Parse from "./parse.js";
import {Config} from "./config";

class Interface {
	nav = null;
	navInstance = null;
	menuBtn = null;
	mainWrapper = document.getElementById('wrapper');
	planInstance = null;
	dzien = null;
	dzienInstance = null;
	p = null;
	d = null;
	pInstance = null;
	prefsSelects = null;
	day = 0; //dzień tygodnia

	config = new Config();
	parse = new Parse;

	initPlan() {
		this.p = document.getElementById('plan1');
		this.p.innerHTML = this.config.config.klasa;
		this.pInstance = M.Dropdown.init(this.p);
	}

	initDay() {
		this.dzien = document.getElementById('dzien1');
		this.dzienInstance = M.Tabs.init(this.dzien, {swipeable: true,});
		this.dzienInstance.select('d' + this.d);
	}

	initNav() {
		this.nav = document.querySelector('.sidenav');
		this.navInstance = M.Sidenav.init(this.nav);
		this.menuBtn = document.getElementById('menu-btn');
		this.menuBtn.addEventListener('click', function () {
			let interface_ = new Interface();
			interface_.navInstance.open();
		});
	}

	showPlan(day, element = undefined) {
		if (element === undefined) {
			element = document.getElementById('plan');
			this.genPlan();
			return;
		}

		this.planInstance = M.Collapsible.init(element);
		element.innerHTML = '';

		for (let i = 1; i < this.parse.plan[day + 2].length; i++) {
			let lesson = $.parseHTML(this.parse.plan[day + 2][i]);
			console.log(lesson);
			/*
			let HTMLElements = {
				li: document.createElement('li'),
				cHead: document.createElement('div'),
				cBody: document.createElement('div'),
				span: document.createElement('span')
			};
			let group = [{}];

			HTMLElements.cBody.innerHTML = this.parse.plan[0][i] + '. ';

			if (lesson.length === 0) { //okienko
				continue;
			} else if (lesson.length === 4 || lesson.length === 3) { //lessoncje dzielone grupami
				group[0] = {
					lesson: lesson[0].children[0].innerHTML.replace('-1/2', ''),
					teacher: lesson[0].children[1].innerHTML,
					classroom: lesson[0].children[2].innerHTML,
				};
				group[1] = {
					lesson: lesson[2].children[0].innerHTML.replace('-2/2', ''),
					teacher: lesson[2].children[1].innerHTML,
					classroom: lesson[2].children[2].innerHTML,
				};
				HTMLElements.cHead.innerHTML += `Grupa 1: ${group[0].lesson}. Grupa 2: ${group[1].lesson}`;
				HTMLElements.span.innerHTML = `Nauczyciel: ${group[0].teacher}/${group[1].teacher}<br>Gabinet: ${group[0].classroom}/${group[1].classroom}`;

			} else if (lesson.length === 2 || (lesson.length === 1 && (lesson.children || lesson[0].children))) { //okienko jednej z grup
				if (lesson[0].children[0].innerHTML.search('-1/2') !== -1) { //jeśli grupa 1
					group[0] = {
						lesson: lesson[0].children[0].innerHTML.replace('-1/2', ''),
						teacher: lesson[0].children[1].innerHTML,
						classroom: lesson[0].children[2].innerHTML,
					};
					HTMLElements.cHead.innerHTML += `Grupa 1: ${group[0].lesson}. Grupa 2: Wolne`;
					HTMLElements.span.innerHTML = `Nauczyciel: ${group[0].teacher}/--<br>Gabinet: ${group[0].classroom}/--`;

				} else if (lesson[0].children[0].innerHTML.search('-2/2') !== -1) { //jeśli grupa 2
					group[1] = {
						lesson: lesson[0].children[0].innerHTML.replace('-2/2', ''),
						teacher: lesson[0].children[1].innerHTML,
						classroom: lesson[0].children[2].innerHTML,
					};
					HTMLElements.cHead.innerHTML += `Grupa 1: Wolne. Grupa 2: ${group[1].lesson}`;
					HTMLElements.span.innerHTML = `Nauczyciel: --/${group[1].teacher}<br>Gabinet: --/${group[1].classroom}`;
				}
			} else if (lesson.length === 5 && (lesson[1].textContent === '-1/2 ' || lesson[1].textContent === '-2/2 ')) {
				if (lesson[1].textContent === '-1/2 ') {
					HTMLElements.cHead.innerHTML += `Grupa 1: ${lesson[0].innerHTML}. Grupa 2: Wolne`;
					HTMLElements.span.innerHTML = `Nauczyciel: ${lesson[2].innerHTML}/--<br>Gabinet: ${lesson[4].innerHTML}/--`;
				}
			} else if (lesson.length === 5 && (lesson[1].textContent !== '-1/2 ' || lesson[1].textContent !== '-2/2 ')) { //lekcja całą klasą
				let kl = {
					lesson: lesson[0].innerHTML,
					teacher: lesson[2].innerHTML,
					classroom: lesson[4].innerHTML,
				};
				HTMLElements.cHead.innerHTML += `${kl.lesson}`;
				HTMLElements.span.innerHTML = `Nauczyciel: ${kl.teacher}<br>Gabinet: ${kl.classroom}`;
			} else if (lesson.length === 1 && (!lesson.children || !lesson[0].children)) { //lessoncja całą klasą
				let kl = {};
				if (/\d/.test(lesson[0].textContent) === false) {
					kl = {
						lesson: lesson[0].textContent,
						teacher: '--',
						classroom: '--',
					};
				} else if (/\d/.test(lesson[0].textContent)) {
					let s = lesson[0].textContent;
					let l = s.length;
					if (!isNaN(Number(s[l - 3]))) {
						kl.classroom = s.slice(l - 3);
						s = s.slice(0, l - 4);
					} else {
						kl.classroom = s.slice(l - 2);
						s = s.slice(0, l - 3);
					}

					l = s.length;
					kl.teacher = s.slice(s.lastIndexOf(' ') + 1);
					kl.lesson = s.slice(0, s.lastIndexOf(' '));
				}

				HTMLElements.cHead.innerHTML += `${kl.lesson}`;
				HTMLElements.span.innerHTML = `Nauczyciel: ${kl.teacher}<br>Gabinet: ${kl.classroom}`;
			} else if (lesson.length === 7) { //wf... cause... fuck you
				if (lesson[0].children && lesson[0].children.length !== 0) {
					group[0] = {
						lesson: lesson[0].children[0].innerHTML.replace('-1/2', ''),
						teacher: lesson[0].children[1].innerHTML,
						classroom: lesson[0].children[2].innerHTML,
					};
					group[1] = {
						lesson: lesson[2].innerHTML,
						teacher: lesson[4].innerHTML,
						classroom: lesson[6].innerHTML,
					};
				} else if (lesson[6].children && lesson[6].children.length !== 0) {
					group[0] = {
						lesson: lesson[0].innerHTML,
						teacher: lesson[2].innerHTML,
						classroom: lesson[4].innerHTML,

					};
					group[1] = {
						lesson: lesson[6].children[0].innerHTML.replace('-2/2', ''),
						teacher: lesson[6].children[1].innerHTML,
						classroom: lesson[6].children[2].innerHTML,
					};
				}

				HTMLElements.cHead.innerHTML += `Grupa 1: ${group[0].lesson}. Grupa 2: ${group[1].lesson}`;
				HTMLElements.span.innerHTML = `Nauczyciel: ${group[0].teacher}/${group[1].teacher}<br>Gabinet: ${group[0].classroom}/${group[1].classroom}`;
			}

			HTMLElements.span.innerHTML += `<br><span class="clockP"><i class="material-icons">access_time</i> ${this.parse.plan[1][i]}</span>`;

			HTMLElements.cHead.classList.add('collapsible-header');
			HTMLElements.cBody.appendChild(HTMLElements.span);
			HTMLElements.cBody.classList.add('collapsible-body');

			HTMLElements.li.appendChild(HTMLElements.cHead);
			HTMLElements.li.appendChild(HTMLElements.cBody);
			element.appendChild(HTMLElements.li);
		*/
		}
	}

	genPlan() {
		document.getElementById('klasa').innerHTML = this.parse.klasa;
		this.showPlan(0, document.getElementById('d0'));
		this.showPlan(1, document.getElementById('d1'));
		this.showPlan(2, document.getElementById('d2'));
		this.showPlan(3, document.getElementById('d3'));
		this.showPlan(4, document.getElementById('d4'));
		setTimeout(this.initDay, 100);
		setTimeout(function () {
			(<HTMLElement>document.getElementById('plan').children[0]).style.height = 'calc(100vh - 128px)';
			(<HTMLElement>document.getElementById('plan').children[0]).style.overflowY = 'auto';
		}, 100);
	}

	dzienMenu(day) {
		this.showPlan(day);
		this.d = ['', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', ''];

		//dzien.innerHTML = d[day + 1];
	}

	planCh(plan) {
		this.parse.zaladujPlan(`./scripts/plan/o${plan}.html`);
		this.p.innerHTML = plan;
	}

	showDzien() {
		let data = new Date();
		if (data.getDay() >= 1 && data.getDay() <= 5) {
			if (data.getHours() < 15) {
				this.day = data.getDay() - 1;
			} else if (data.getHours() >= 15 && data.getDay() === 5) {
				this.day = 0;
			} else {
				this.day = data.getDay();
			}
		} else {
			this.day = 0;
		}

		this.genPlan();
	}

	closePrefs() {
		let prefs = document.getElementById('preferences');
		this.navInstance.close();
		prefs.style.opacity = '';
		prefs.style.pointerEvents = '';
		prefs.style.top = '';
	};

	showPrefs() {
		(<HTMLSelectElement>document.getElementById('prefKlasa').children[this.config.config.klasa - 1]).selected = true;
		this.prefsSelects = document.querySelectorAll('select');
		this.navInstance.close();
		let prefs = document.getElementById('preferences');
		prefs.style.opacity = '1';
		prefs.style.pointerEvents = 'all';
		prefs.style.top = '0';
	};

	togglePrefs() {
		let prefs = document.getElementById('preferences');
		if (prefs.style.opacity = '1') {
			this.showPrefs();
		} else {
			this.closePrefs();
		}
	};
}

export {Interface};