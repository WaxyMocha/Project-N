// jscs:disable maximumLineLength

import parse from "parse";

let nav;
let navInstance;
let menuBtn;
let mainWrapper = document.getElementById('wrapper');
let planInstance;
let dzien;
let dzienInstance;
let p;
let pInstance;
let prefsSelects;
let day = 0; //dzień tygodnia

function initPlan() {
	p = document.getElementById('plan1');
	p.innerHTML = config.klasa;
	pInstance = M.Dropdown.init(p);
}

function initDay() {
	dzien = document.getElementById('dzien1');
	dzienInstance = M.Tabs.init(dzien, {swipeable: true,});
	dzienInstance.select('d' + d);
}

function initNav() {
	nav = document.querySelector('.sidenav');
	navInstance = M.Sidenav.init(nav);
	menuBtn = document.getElementById('menu-btn');
	menuBtn.addEventListener('click', function () {
		navInstance.open();
	});
}

function showPlan(day, element) {
	if (element === undefined) {
		element = document.getElementById('plan');
		genPlan();
		return;
	}

	planInstance = M.Collapsible.init(element);
	element.innerHTML = '';

	for (let i = 1; i < plan[day + 2].length; i++) {
		let lesson = $.parseHTML(plan[day + 2][i]);
		let HTMLElements = {
			li: document.createElement('li'),
			cHead: document.createElement('div'),
			cBody: document.createElement('div'),
			span: document.createElement('span')
		};
		let group = [{}];

		HTMLElements.cBody.innerHTML = plan[0][i] + '. ';

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

		} else if (lesson.length === 2 || (lesson.length === 1 && (lesson.children || lesson[0].children)) ) { //okienko jednej z grup
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

		HTMLElements.span.innerHTML += `<br><span class="clockP"><i class="material-icons">access_time</i> ${plan[1][i]}</span>`;

		HTMLElements.cHead.classList.add('collapsible-header');
		HTMLElements.cBody.appendChild(HTMLElements.span);
		HTMLElements.cBody.classList.add('collapsible-body');

		HTMLElements.li.appendChild(HTMLElements.cHead);
		HTMLElements.li.appendChild(HTMLElements.cBody);
		element.appendChild(HTMLElements.li);
	}
}

function genPlan() {
	document.getElementById('klasa').innerHTML = klasa;
	showPlan(0, document.getElementById('d0'));
	showPlan(1, document.getElementById('d1'));
	showPlan(2, document.getElementById('d2'));
	showPlan(3, document.getElementById('d3'));
	showPlan(4, document.getElementById('d4'));
	setTimeout(initDay, 100);
	setTimeout(function () {
		document.getElementById('plan').children[0].style.height = 'calc(100vh - 128px)';
		document.getElementById('plan').children[0].style.overflowY = 'auto';
	}, 100);
}

let dzienMenu = function (day) {
	pokazPlan(day);
	let d = ['', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', ''];

	//dzien.innerHTML = d[day + 1];
};

let planCh = function (plan) {
	parse.zaladujPlan(`./scripts/plan/o${plan}.html`);
	p.innerHTML = plan;
};

let showDzien = function () {
	let data = new Date();
	if (data.getDay() >= 1 && data.getDay() <= 5) {
		if (data.getHours() < 15) {
			day = data.getDay() - 1;
		} else if (data.getHours() >= 15 && data.getDay() === 5) {
			day = 0;
		} else {
			day = data.getDay();
		}
	} else {
		day = 0;
	}

	genPlan();
};

let closePrefs = function () {
	let prefs = document.getElementById('preferences');
	navInstance.close();
	prefs.style.opacity = '';
	prefs.style.pointerEvents = '';
	prefs.style.top = '';
};

let showPrefs = function () {
	document.getElementById('prefKlasa').children[config.klasa - 1].selected = true;
	prefsSelects = document.querySelectorAll('select');
	prefsSelectsInst = M.FormSelect.init(prefsSelects);
	navInstance.close();
	let prefs = document.getElementById('preferences');
	prefs.style.opacity = '1';
	prefs.style.pointerEvents = 'all';
	prefs.style.top = '0';
};

let togglePrefs = function () {
	let prefs = document.getElementById('preferences');
	if (prefs.style.opacity = '1') {
		showPrefs();
	} else {
		closePrefs();
	}
};
