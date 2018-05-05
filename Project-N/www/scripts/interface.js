// jscs:disable maximumLineLength
let nav;
let navInstance;
let menuBtn;
let mainWrapper = document.getElementById('wrapper');
let planInstance;
let dzien;
let dzienInstance;
let p;
let pInstance;

let initP = function () {
  p = document.getElementById('plan1');
  pInstance = M.Dropdown.init(p);
};

let initDzien = function () {
  dzien = document.getElementById('dzien1');
  dzienInstance = M.Tabs.init(dzien, { swipeable: true, });;
};

let initNav = function () {
  nav = document.querySelector('.sidenav');
  navInstance = M.Sidenav.init(nav);
  menuBtn = document.getElementById('menu-btn');
  menuBtn.addEventListener('click', function () {
    navInstance.open();
  });
};

let pokazPlan = function (dzien) {
  let uPlan = document.getElementById('plan');
  planInstance = M.Collapsible.init(uPlan);
  uPlan.innerHTML = '';
  for (let i = 1; i < plan[dzien + 2].length; i++) {
    let temp = $.parseHTML(plan[dzien + 2][i]);
    let li = document.createElement('li');
    let cHead = document.createElement('div');
    let cBody = document.createElement('div');
    let sp = document.createElement('span');
    cHead.innerHTML = plan[0][i] + '. ';
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
    } else if (temp.length == 2 || (temp.length == 1 && temp.children)) { //okienko jednej z grup
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
    } else if (temp.length == 5) { //lekcja całą klasą
      let kl = {
        lek: temp[0].innerHTML,
        nau: temp[2].innerHTML,
        gab: temp[4].innerHTML,
      };
      cHead.innerHTML += `${kl.lek}`;
      sp.innerHTML = `Nauczyciel: ${kl.nau}<br>Gabinet: ${kl.gab}`;
    } else if (temp.length == 1 && !temp.children) { //lekcja całą klasą
      let kl = {
        lek: temp[0].textContent,
        nau: '--',
        gab: '--',
      };
      cHead.innerHTML += `${kl.lek}`;
      sp.innerHTML = `Nauczyciel: ${kl.nau}<br>Gabinet: ${kl.gab}`;
    } else if (temp.length == 7) { //wf... cause... fuck you
      let gr1;
      let gr2;
      if (temp[0].children) {
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
      } else {
        gr1 = {
          lek: temp[0].innerHTML,
          nau: temp[2].innerHTML,
          gab: temp[4].innerHTML,

        };
        gr2 = {
          lek: temp[0].children[0].innerHTML.replace('-2/2', ''),
          nau: temp[0].children[1].innerHTML,
          gab: temp[0].children[2].innerHTML,
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
    uPlan.appendChild(li);
  }
};

let dzienMenu = function (day) {
  pokazPlan(day);
  let d = ['', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', ''];
  dzien.innerHTML = d[day + 1];
};

let planCh = function (plan) {
  zaladujPlan(`./scripts/plan/o${plan}.html`);
  p.innerHTML = plan;
};
