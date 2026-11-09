// Manuel de cours : en-tête, sommaire, recherche, pages chapitre et glossaire, construits à partir de donnees/notions.js.
// Les notions s'ajoutent dans donnees/notions.js uniquement (voir ajouter.html) ; ce fichier ne contient pas de cours.
(function () {
  var M = window.MANUEL || { chapitres: [] };
  var page = document.body.dataset.page;
  var COULEURS = ['#cdeedd', '#fdefb2', '#e4dafc', '#fdd9c6', '#d3e8fb', '#fbd3e3'];
  var FONCES = ['#7fd3a8', '#f5cf3d', '#b49cf5', '#f7a07a', '#7db9ef', '#f28cb6'];
  function couleur(i) { return COULEURS[i % COULEURS.length]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  // Minuscules, sans accents ; l'apostrophe compte comme un espace
  function normaliser(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, ' '); }
  function texte(html) { var d = document.createElement('div'); d.innerHTML = html; return d.textContent; }
  function param(n) { return new URLSearchParams(location.search).get(n); }

  // En-tête : logo du manuel et recherche dans toutes les fiches
  var entete = document.getElementById('entete');
  entete.className = 'entete';
  entete.innerHTML =
    '<button type="button" class="hamburger" id="hamburger" aria-label="Ouvrir le sommaire" aria-expanded="false" aria-controls="sommaire"><span></span><span></span><span></span></button>' +
    '<a class="marque" href="index.html"><span class="logo" aria-hidden="true">M</span><span class="nom">Manuel de cours<small>Notions vues en stage</small></span></a>' +
    '<div class="recherche"><input id="champ" type="search" autocomplete="off" placeholder="Chercher une notion, un mot, une commande…  ( / )" aria-label="Chercher dans le manuel"><div class="resultats" id="resultats"></div></div>' +
    '<img class="logo-univ" src="images/logo-nanterre.webp" alt="Université Paris Nanterre" onerror="this.remove()">';

  // Sommaire : accueil, chapitres numérotés, pages utiles
  var actif = param('c');
  // Les outils viennent juste après l'accueil, avant la longue liste des chapitres, pour rester visibles sans défiler
  var html = '<a href="index.html"' + (page === 'accueil' ? ' class="actif"' : '') + '>Accueil</a>' +
    '<div class="groupe">Outils</div>' +
    '<a href="connaissances.html"' + (page === 'connaissances' ? ' class="actif"' : '') + '>Nouvelles connaissances</a>' +
    '<a href="glossaire.html"' + (page === 'glossaire' ? ' class="actif"' : '') + '>Glossaire</a>' +
    '<a href="ajouter.html"' + (page === 'ajouter' ? ' class="actif"' : '') + '>Comment ajouter une notion</a>' +
    '<div class="groupe">Chapitres</div>';
  M.chapitres.forEach(function (c, i) {
    html += '<a href="chapitre.html?c=' + c.id + '"' + (actif === c.id ? ' class="actif"' : '') + ' style="--c:' + couleur(i) + '"><span class="num">' + (i + 1) + '</span>' + esc(c.titre) + '</a>';
  });
  document.getElementById('sommaire').innerHTML = html;

  // Petit écran : le sommaire est replié derrière le bouton ☰ ; il se ferme au choix d'un lien, avec Échap ou au clic à côté
  var burger = document.getElementById('hamburger'), sommaire = document.getElementById('sommaire');
  function ouvrir(oui) {
    document.body.classList.toggle('sommaire-ouvert', oui);
    burger.setAttribute('aria-expanded', oui);
    burger.setAttribute('aria-label', oui ? 'Fermer le sommaire' : 'Ouvrir le sommaire');
  }
  burger.addEventListener('click', function (e) { e.stopPropagation(); ouvrir(!document.body.classList.contains('sommaire-ouvert')); });
  sommaire.addEventListener('click', function (e) { if (e.target.closest('a')) ouvrir(false); });
  document.addEventListener('click', function (e) { if (!sommaire.contains(e.target)) ouvrir(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') ouvrir(false); });

  // Index de recherche : une entrée par fiche (titre + tout son texte) et une par terme de glossaire
  var index = [];
  M.chapitres.forEach(function (c) {
    c.notions.forEach(function (n) {
      var corps = [n.definition, n.exemple, n.schema, n.image, n.retenir].filter(Boolean).join(' ');
      index.push({ titre: n.titre, ou: c.titre, url: 'chapitre.html?c=' + c.id + '#' + n.id, texte: texte(corps) });
      (n.termes || []).forEach(function (t) { index.push({ titre: t[0], ou: 'Glossaire · ' + n.titre, url: 'chapitre.html?c=' + c.id + '#' + n.id, texte: t[1] }); });
    });
  });
  var champ = document.getElementById('champ'), zone = document.getElementById('resultats'), choix = -1;
  function extrait(t, mots) {
    var n = normaliser(t), p = n.indexOf(mots[0]); if (p < 0) p = 0;
    var debut = Math.max(0, p - 50), morceau = t.substr(debut, 140);
    var h = esc(morceau);
    mots.forEach(function (m) {
      var re = new RegExp('(' + m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      if (/^[a-z0-9 ]+$/.test(m)) h = h.replace(re, '<mark>$1</mark>');
    });
    return (debut ? '…' : '') + h + (debut + 140 < t.length ? '…' : '');
  }
  function chercher() {
    var q = normaliser(champ.value.trim()); choix = -1;
    if (q.length < 2) { zone.innerHTML = ''; return; }
    var mots = q.split(/\s+/);
    var l = index.map(function (e) {
      var tt = normaliser(e.titre), tx = normaliser(e.texte);
      if (!mots.every(function (m) { return tt.indexOf(m) >= 0 || tx.indexOf(m) >= 0; })) return null;
      return { e: e, score: mots.filter(function (m) { return tt.indexOf(m) >= 0; }).length };
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).slice(0, 20);
    zone.innerHTML = l.length ? l.map(function (r) {
      return '<a href="' + r.e.url + '"><strong>' + esc(r.e.titre) + '</strong> <span class="ou">· ' + esc(r.e.ou) + '</span><br><span class="ou">' + extrait(r.e.texte, mots) + '</span></a>';
    }).join('') : '<a><span class="ou">Aucun résultat. Pensez à ajouter la notion au manuel.</span></a>';
  }
  champ.addEventListener('input', chercher);
  champ.addEventListener('keydown', function (ev) {
    var liens = zone.querySelectorAll('a[href]');
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      ev.preventDefault(); choix = Math.max(0, Math.min(liens.length - 1, choix + (ev.key === 'ArrowDown' ? 1 : -1)));
      liens.forEach(function (a, i) { a.classList.toggle('actif', i === choix); });
    } else if (ev.key === 'Enter' && liens.length) { location.href = liens[Math.max(choix, 0)].href; }
    else if (ev.key === 'Escape') { champ.value = ''; zone.innerHTML = ''; }
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === '/' && document.activeElement !== champ) { ev.preventDefault(); champ.focus(); } });
  document.addEventListener('click', function (ev) { if (!ev.target.closest('.recherche')) zone.innerHTML = ''; });

  // Accueil : une carte par chapitre
  if (page === 'accueil') {
    var nb = M.chapitres.reduce(function (s, c) { return s + c.notions.length; }, 0);
    document.getElementById('compte').textContent = M.chapitres.length + ' chapitres · ' + nb + ' notions';
    // Raccourcis vers les pages outils, sous l'introduction
    var raccourcis = document.createElement('div');
    raccourcis.className = 'raccourcis';
    raccourcis.innerHTML = [['connaissances.html', '🚀', 'Nouvelles connaissances', 'Outils et langages à apprendre ensuite'],
      ['glossaire.html', '📖', 'Glossaire', 'Tous les termes des fiches'],
      ['ajouter.html', '➕', 'Comment ajouter une notion', 'Le mode d\'emploi pour enrichir le manuel']].map(function (r) {
      return '<a class="raccourci" href="' + r[0] + '"><span class="ico" aria-hidden="true">' + r[1] + '</span><span><strong>' + r[2] + '</strong><small>' + r[3] + '</small></span></a>';
    }).join('');
    var heros = document.querySelector('.hero');
    heros.parentNode.insertBefore(raccourcis, heros.nextSibling);
    document.getElementById('chapitres').innerHTML = M.chapitres.map(function (c, i) {
      return '<a class="chapitre-carte" href="chapitre.html?c=' + c.id + '" style="--c:' + couleur(i) + '"><span class="n">Chapitre ' + (i + 1) + '</span><strong>' + esc(c.titre) + '</strong><span>' + esc(c.resume) + '</span></a>';
    }).join('');
  }

  // Page chapitre : intro, puis une fiche par notion (définition, exemple, schéma, image, à retenir)
  if (page === 'chapitre') {
    var i = M.chapitres.findIndex(function (c) { return c.id === actif; }); if (i < 0) i = 0;
    var c = M.chapitres[i], z = document.getElementById('contenu');
    document.title = c.titre + ' — Manuel de cours';
    var blocs = [['definition', 'def', 'Définition'], ['exemple', 'ex', 'Exemple'], ['schema', 'sch', 'Schéma'], ['image', 'img', 'Image pour retenir'], ['retenir', 'ret', 'À retenir']];
    z.innerHTML = '<div class="fil"><a href="index.html">Accueil</a> › Chapitre ' + (i + 1) + '</div>' +
      '<h1>' + esc(c.titre) + '</h1><div class="intro-chapitre" style="--c:' + couleur(i) + '"><p>' + c.intro + '</p></div>' +
      '<div class="fiches-index">' + c.notions.map(function (n) { return '<a href="#' + n.id + '">' + esc(n.titre) + '</a>'; }).join('') + '</div>' +
      c.notions.map(function (n) {
        return '<article class="fiche" id="' + n.id + '" style="--cf:' + FONCES[i % FONCES.length] + ';--p:' + couleur(i) + '"><h2>' + esc(n.titre) + '</h2>' +
          blocs.filter(function (b) { return n[b[0]]; }).map(function (b) {
            var corps = b[0] === 'image' ? '<div class="image-mentale"><span class="ico" aria-hidden="true">' + (n.icone || '💡') + '</span><div>' + n.image + '</div></div>' : n[b[0]];
            return '<div class="bloc"><span class="etiquette ' + b[1] + '">' + b[2] + '</span>' + corps + '</div>';
          }).join('') + '</article>';
      }).join('') +
      '<p class="muted">' + (i > 0 ? '← <a href="chapitre.html?c=' + M.chapitres[i - 1].id + '">' + esc(M.chapitres[i - 1].titre) + '</a>' : '') +
      (i < M.chapitres.length - 1 ? (i > 0 ? ' · ' : '') + '<a href="chapitre.html?c=' + M.chapitres[i + 1].id + '">' + esc(M.chapitres[i + 1].titre) + '</a> →' : '') + '</p>';
    // La fiche visée par l'adresse (#…) n'existe qu'une fois la page construite : on y va après coup
    if (location.hash) setTimeout(function () { var cible = document.getElementById(location.hash.slice(1)); if (cible) cible.scrollIntoView({ behavior: 'instant' }); }, 0);
  }

  // Glossaire : tous les termes des fiches, un terme une seule fois (le premier rencontré)
  if (page === 'glossaire') {
    var vus = {}, termes = [];
    M.chapitres.forEach(function (c) { c.notions.forEach(function (n) { (n.termes || []).forEach(function (t) {
      var k = normaliser(t[0]); if (!vus[k]) { vus[k] = 1; termes.push({ t: t[0], d: t[1], c: c, n: n }); }
    }); }); });
    termes.sort(function (a, b) { return a.t.localeCompare(b.t, 'fr'); });
    var filtre = document.getElementById('filtre'), liste = document.getElementById('liste');
    function rendre() {
      var q = normaliser(filtre.value.trim());
      var l = termes.filter(function (x) { return !q || normaliser(x.t + ' ' + x.d).indexOf(q) >= 0; });
      liste.innerHTML = '<p class="muted">' + l.length + ' terme(s)</p><div class="table-wrap"><table><thead><tr><th>Terme</th><th>Définition</th><th>Fiche</th></tr></thead><tbody>' +
        l.map(function (x) { return '<tr><td><strong>' + esc(x.t) + '</strong></td><td>' + esc(x.d) + '</td><td><a href="chapitre.html?c=' + x.c.id + '#' + x.n.id + '">' + esc(x.n.titre) + '</a></td></tr>'; }).join('') +
        '</tbody></table></div>';
    }
    filtre.addEventListener('input', rendre); rendre();
  }

  // Nouvelles connaissances : une carte par outil ou langage à apprendre, avec ses liens (donnees/connaissances.js)
  if (page === 'connaissances' && window.CONNAISSANCES) {
    var K = window.CONNAISSANCES, zoneK = document.getElementById('connaissances'), filtreK = document.getElementById('filtre');
    document.getElementById('intro-connaissances').textContent = K.intro;
    var rendreK = function () {
      var q = normaliser(filtreK.value.trim());
      var html = K.groupes.map(function (g, i) {
        var l = g.sujets.filter(function (s) { return !q || normaliser(s.nom + ' ' + s.sert + ' ' + s.pourquoi).indexOf(q) >= 0; });
        if (!l.length) return '';
        return '<section class="groupe-connaissances" style="--c:' + couleur(i) + '"><h2>' + esc(g.titre) + ' <span class="muted">' + l.length + '</span></h2><div class="connaissances">' +
          l.map(function (s) {
            return '<article class="connaissance"><h3><span class="ico" aria-hidden="true">' + s.ico + '</span>' + esc(s.nom) + '</h3>' +
              '<p>' + esc(s.sert) + '</p><p class="pourquoi"><strong>Pourquoi l\'apprendre :</strong> ' + esc(s.pourquoi) + '</p>' +
              '<ul class="liens-utiles">' + s.liens.map(function (x) { return '<li><a href="' + esc(x[1]) + '" target="_blank" rel="noopener">' + esc(x[0]) + ' ↗</a></li>'; }).join('') + '</ul></article>';
          }).join('') + '</div></section>';
      }).join('');
      zoneK.innerHTML = html || '<p class="muted">Aucun sujet ne correspond.</p>';
    };
    filtreK.addEventListener('input', rendreK); rendreK();
  }
})();
