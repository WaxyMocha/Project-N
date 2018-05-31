// jscs:disable maximumLineLength

let elements = {
  mainPr: document.getElementById('mainPr'),
};
let instances = {};
let menuBtn;
elements.mainWrapper = document.getElementById('wrapper');
let planInstance;
let dzien;
let dzienInstance;
let p;
let pInstance;
let prefsSelects;
let d = 0; //dzień tygodnia

let initP = function () {
  elements.p = document.getElementById('plan1');
  elements.p.innerHTML = config.klasa;
  instances.p = M.Dropdown.init(elements.p);
};

let initDzien = function () {
  elements.dzien = document.getElementById('dzien1');
  instances.dzien = M.Tabs.init(elements.dzien, { swipeable: true, });
  instances.dzien.select('d' + d);
};

let initNav = function () {
  elements.nav = document.querySelector('.sidenav');
  instances.nav = M.Sidenav.init(elements.nav);
  elements.menuBtn = document.getElementById('menu-btn');
  elements.menuBtn.addEventListener('click', function () {
    instances.nav.open();
  });
};

let pokazPlan = function (dzien, element) {
  if (element == undefined) {
    genPlan();
    return;
  }

  planInstance = M.Collapsible.init(element);
  element.innerHTML = '';
  for (let i = 1; i < plan[dzien + 2].length; i++) {
    let temp = $.parseHTML(plan[dzien + 2][i]);
    let li = document.createElement('li');
    let cHead = document.createElement('div');
    let cBody = document.createElement('div');
    let sp = document.createElement('span');
    cHead.innerHTML = plan[0][i] + '. ';

    // console.log(temp);
    if (temp.length == 0) { //okienko
      continue;
    } else if (temp.length == 4 || temp.length == 3) { //lekcje dzielone grupami
      let gr1 = {
        lek: temp[0].children[0].innerHTML.replace('-1/2', ''),
        nau: temp[0].children[1].innerHTML,
        gab: temp[0].children[2].innerHTML,
      };
      let gr2 = {
        lek: temp[2].children[0].innerHTML.replace('-2/2', ''),
        nau: temp[2].children[1].innerHTML,
        gab: temp[2].children[2].innerHTML,
      };
      cHead.innerHTML += `Grupa 1: ${gr1.lek}. Grupa 2: ${gr2.lek}`;
      sp.innerHTML = `Nauczyciel: ${gr1.nau}/${gr2.nau}<br>Gabinet: ${gr1.gab}/${gr2.gab}`;
    } else if (temp.length == 2 || (temp.length == 1 && (temp.children || temp[0].children))) { //okienko jednej z grup
      if (temp[0].children[0].innerHTML.search('-1/2') != -1) { //jeśli grupa 1
        let gr1 = {
          lek: temp[0].children[0].innerHTML.replace('-1/2', ''),
          nau: temp[0].children[1].innerHTML,
          gab: temp[0].children[2].innerHTML,
        };
        cHead.innerHTML += `Grupa 1: ${gr1.lek}. Grupa 2: Wolne`;
        sp.innerHTML = `Nauczyciel: ${gr1.nau}/--<br>Gabinet: ${gr1.gab}/--`;

      } else if (temp[0].children[0].innerHTML.search('-2/2') != -1) { //jeśli grupa 2
        let gr2 = {
          lek: temp[0].children[0].innerHTML.replace('-2/2', ''),
          nau: temp[0].children[1].innerHTML,
          gab: temp[0].children[2].innerHTML,
        };
        cHead.innerHTML += `Grupa 1: Wolne. Grupa 2: ${gr2.lek}`;
        sp.innerHTML = `Nauczyciel: --/${gr2.nau}<br>Gabinet: --/${gr2.gab}`;
      }
    } else if (temp.length == 5 && (temp[1].textContent == '-1/2 ' || temp[1].textContent == '-2/2 ')) {
      if (temp[1].textContent == '-1/2 ') {
        cHead.innerHTML += `Grupa 1: ${temp[0].innerHTML}. Grupa 2: Wolne`;
        sp.innerHTML = `Nauczyciel: ${temp[2].innerHTML}/--<br>Gabinet: ${temp[4].innerHTML}/--`;
      }
    } else if (temp.length == 5 && (temp[1].textContent != '-1/2 ' || temp[1].textContent != '-2/2 ')) { //lekcja całą klasą
      let kl = {
        lek: temp[0].innerHTML,
        nau: temp[2].innerHTML,
        gab: temp[4].innerHTML,
      };
      cHead.innerHTML += `${kl.lek}`;
      sp.innerHTML = `Nauczyciel: ${kl.nau}<br>Gabinet: ${kl.gab}`;
    } else if (temp.length == 1 && (!temp.children || !temp[0].children)) { //lekcja całą klasą
      let kl = {};
      if (/\d/.test(temp[0].textContent) == false) {
        kl = {
          lek: temp[0].textContent,
          nau: '--',
          gab: '--',
        };
      } else if (/\d/.test(temp[0].textContent)) {
        let s = temp[0].textContent;
        let l = s.length;
        if (!isNaN(Number(s[l - 3]))) {
          kl.gab = s.slice(l - 3);
          s = s.slice(0, l - 4);
        } else {
          kl.gab = s.slice(l - 2);
          s = s.slice(0, l - 3);
        }

        l = s.length;
        kl.nau = s.slice(s.lastIndexOf(' ') + 1);
        kl.lek = s.slice(0, s.lastIndexOf(' '));
      }

      cHead.innerHTML += `${kl.lek}`;
      sp.innerHTML = `Nauczyciel: ${kl.nau}<br>Gabinet: ${kl.gab}`;
    } else if (temp.length == 7) { //wf... cause... fuck you
      let gr1;
      let gr2;
      if (temp[0].children && temp[0].children.length != 0) {
        gr1 = {
          lek: temp[0].children[0].innerHTML.replace('-1/2', ''),
          nau: temp[0].children[1].innerHTML,
          gab: temp[0].children[2].innerHTML,
        };
        gr2 = {
          lek: temp[2].innerHTML,
          nau: temp[4].innerHTML,
          gab: temp[6].innerHTML,
        };
      } else if (temp[6].children && temp[6].children.length != 0) {
        gr1 = {
          lek: temp[0].innerHTML,
          nau: temp[2].innerHTML,
          gab: temp[4].innerHTML,

        };
        gr2 = {
          lek: temp[6].children[0].innerHTML.replace('-2/2', ''),
          nau: temp[6].children[1].innerHTML,
          gab: temp[6].children[2].innerHTML,
        };
      }

      cHead.innerHTML += `Grupa 1: ${gr1.lek}. Grupa 2: ${gr2.lek}`;
      sp.innerHTML = `Nauczyciel: ${gr1.nau}/${gr2.nau}<br>Gabinet: ${gr1.gab}/${gr2.gab}`;
    }

    sp.innerHTML += `<br><span class="clockP"><i class="material-icons">access_time</i> ${plan[1][i]}</span>`;

    // console.log(temp);
    cHead.classList.add('collapsible-header');
    cBody.appendChild(sp);
    cBody.classList.add('collapsible-body');

    li.appendChild(cHead);
    li.appendChild(cBody);
    element.appendChild(li);
  }
};

let genPlan = function () {
  document.getElementById('klasa').innerHTML = klasa;
  pokazPlan(0, document.getElementById('d0'));
  pokazPlan(1, document.getElementById('d1'));
  pokazPlan(2, document.getElementById('d2'));
  pokazPlan(3, document.getElementById('d3'));
  pokazPlan(4, document.getElementById('d4'));
  setTimeout(initDzien, 100);
  setTimeout(function () {
    document.getElementById('plan').children[0].style.height = 'calc(100vh - 128px)';
    document.getElementById('plan').children[0].style.overflowY = 'auto';
  }, 100);
};

let dzienMenu = function (day) {
  pokazPlan(day);
  let d = ['', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', ''];

  //dzien.innerHTML = d[day + 1];
};

let planCh = function (plan) {
  zaladujPlan(`./scripts/plan/o${plan}.html`);
  p.innerHTML = plan;
};

let showDzien = function () {
  let data = new Date();
  if (data.getDay() >= 1 && data.getDay() <= 5) {
    if (data.getHours() < 15) {
      d = data.getDay() - 1;
    } else if (data.getHours() >= 15 && data.getDay() == 5) {
      d = 0;
    } else {
      d = data.getDay();
    }
  } else {
    d = 0;
  }

  genPlan();
};

let closePrefs = function () {
  let prefs = document.getElementById('preferences');
  instances.nav.close();
  prefs.style.opacity = '';
  prefs.style.pointerEvents = '';
  prefs.style.top = '';
};

let showPrefs = function () {
  document.getElementById('prefKlasa').children[config.klasa - 1].selected = true;
  prefsSelects = document.querySelectorAll('select');
  instances.prefsSelects = M.FormSelect.init(prefsSelects);
  instances.nav.close();
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

function toggleMainPr() {
  if (elements.mainPr.style.opacity == '1') {
    elements.mainPr.style.opacity = '';
    elements.mainPr.classList.remove('progress');
  } else {
    elements.mainPr.style.opacity = '1';
    elements.mainPr.classList.add('progress');
  }
}
