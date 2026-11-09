// Nouvelles connaissances : outils, plateformes et langages à apprendre ensuite.
// Une carte par sujet : à quoi il sert, pourquoi l'apprendre, et 2 ou 3 liens de référence (docs officielles en priorité).
// Pour ajouter un sujet : copier un objet { nom, ico, sert, pourquoi, liens } dans le bon groupe.
window.CONNAISSANCES = {
  intro: 'Après Git, voici les outils et les langages qui reviennent le plus souvent dans un projet web d\'entreprise. Chaque carte dit à quoi sert le sujet, pourquoi il vaut la peine d\'être appris, et donne quelques liens pour commencer.',
  groupes: [
    {
      titre: 'Outils du quotidien',
      sujets: [
        { nom: 'VS Code', ico: '🧑‍💻', sert: 'Éditeur de code gratuit : coloration, complétion, terminal intégré, Git intégré et extensions.',
          pourquoi: 'C\'est l\'éditeur le plus utilisé ; il rend la lecture d\'un diff et la modification d\'une page HTML bien plus confortables.',
          liens: [['Documentation officielle', 'https://code.visualstudio.com/docs'], ['Git dans VS Code', 'https://code.visualstudio.com/docs/sourcecontrol/overview'], ['Premiers pas (vidéos)', 'https://code.visualstudio.com/docs/getstarted/introvideos']] },
        { nom: 'Terminal : PowerShell et Bash', ico: '⌨️', sert: 'Lancer des commandes et des scripts sans passer par une interface graphique.',
          pourquoi: 'Beaucoup d\'outils (Git, Docker, scripts de génération) se pilotent en ligne de commande ; savoir lire et écrire un petit script fait gagner un temps énorme.',
          liens: [['PowerShell (Microsoft, en français)', 'https://learn.microsoft.com/fr-fr/powershell/scripting/overview'], ['Manuel de Bash', 'https://www.gnu.org/software/bash/manual/bash.html']] },
        { nom: 'Outils de développement du navigateur (F12)', ico: '🔍', sert: 'Inspecter le HTML et le CSS d\'une page, lire les erreurs JavaScript, voir les requêtes réseau.',
          pourquoi: 'C\'est le moyen le plus rapide de comprendre pourquoi une page s\'affiche mal ou pourquoi un appel échoue.',
          liens: [['Chrome DevTools', 'https://developer.chrome.com/docs/devtools'], ['Outils de Firefox', 'https://firefox-source-docs.mozilla.org/devtools-user/']] },
        { nom: 'Markdown', ico: '📝', sert: 'Écrire du texte mis en forme (titres, listes, liens, code) avec une syntaxe très simple.',
          pourquoi: 'README, documentations, tickets et prompts s\'écrivent en Markdown : c\'est le format de texte partout dans le développement.',
          liens: [['Markdown Guide', 'https://www.markdownguide.org/basic-syntax/'], ['Écrire sur GitHub (en français)', 'https://docs.github.com/fr/get-started/writing-on-github']] },
        { nom: 'Postman ou Bruno', ico: '📮', sert: 'Appeler une API à la main : choisir la méthode, les en-têtes, le corps, et lire la réponse.',
          pourquoi: 'Pour comprendre une API, rien ne vaut de l\'appeler soi-même et de voir ce qu\'elle renvoie.',
          liens: [['Documentation de Postman', 'https://learning.postman.com/docs/introduction/overview/'], ['Documentation de Bruno', 'https://docs.usebruno.com/']] }
      ]
    },
    {
      titre: 'Plateformes et déploiement',
      sujets: [
        { nom: 'GitLab : merge requests et CI/CD', ico: '🦊', sert: 'Faire relire un changement avant de le fusionner, et lancer des contrôles automatiques à chaque push.',
          pourquoi: 'C\'est la suite naturelle de Git : travailler à plusieurs et automatiser les vérifications.',
          liens: [['Merge requests', 'https://docs.gitlab.com/user/project/merge_requests/'], ['Démarrer avec la CI/CD', 'https://docs.gitlab.com/ci/'], ['Référence du fichier .gitlab-ci.yml', 'https://docs.gitlab.com/ci/yaml/']] },
        { nom: 'Docker', ico: '🐳', sert: 'Emballer une application et tout ce dont elle a besoin dans une image, qui tourne pareil partout.',
          pourquoi: 'Presque toutes les applications modernes sont livrées sous forme d\'images Docker.',
          liens: [['Bien démarrer', 'https://docs.docker.com/get-started/'], ['Référence du Dockerfile', 'https://docs.docker.com/reference/dockerfile/']] },
        { nom: 'Kubernetes', ico: '☸️', sert: 'Faire tourner et surveiller des conteneurs sur un ensemble de machines (cluster).',
          pourquoi: 'C\'est la plateforme qui exécute la plupart des applications d\'une entreprise ; en connaître les notions de base aide à lire un déploiement.',
          liens: [['Concepts (en français)', 'https://kubernetes.io/fr/docs/concepts/'], ['Tutoriel des bases', 'https://kubernetes.io/docs/tutorials/kubernetes-basics/']] },
        { nom: 'Helm et Argo CD', ico: '⛵', sert: 'Helm décrit un déploiement Kubernetes par des modèles et des valeurs ; Argo CD applique automatiquement ce qui est rangé dans Git.',
          pourquoi: 'Ensemble, ils permettent de déployer en modifiant simplement un fichier dans Git (GitOps).',
          liens: [['Documentation de Helm', 'https://helm.sh/docs/'], ['Documentation d\'Argo CD', 'https://argo-cd.readthedocs.io/en/stable/']] },
        { nom: 'Terraform', ico: '🏗️', sert: 'Décrire l\'infrastructure (réseau, serveurs, bases) dans des fichiers, puis la créer ou la modifier automatiquement.',
          pourquoi: 'L\'infrastructure en code se relit, se versionne et se rejoue comme du code applicatif.',
          liens: [['Tutoriels officiels', 'https://developer.hashicorp.com/terraform/tutorials'], ['Le langage de Terraform (HCL)', 'https://developer.hashicorp.com/terraform/language']] },
        { nom: 'Jira et Confluence, en usage avancé', ico: '🗂️', sert: 'Retrouver vite les bons tickets avec des filtres JQL, organiser des pages et des tableaux dans Confluence.',
          pourquoi: 'Ce sont les deux sources d\'information principales d\'une équipe ; bien les fouiller évite de chercher longtemps.',
          liens: [['Recherche avancée JQL', 'https://support.atlassian.com/jira-software-cloud/docs/use-advanced-search-with-jira-query-language-jql/'], ['Aide de Confluence', 'https://support.atlassian.com/confluence-cloud/']] }
      ]
    },
    {
      titre: 'Langages du web',
      sujets: [
        { nom: 'HTML', ico: '🧱', sert: 'Structurer le contenu d\'une page : titres, paragraphes, liens, tableaux, formulaires.',
          pourquoi: 'C\'est la base de toute page web, et de ce manuel lui-même.',
          liens: [['HTML sur MDN (en français)', 'https://developer.mozilla.org/fr/docs/Web/HTML'], ['Apprendre le HTML (web.dev)', 'https://web.dev/learn/html']] },
        { nom: 'CSS', ico: '🎨', sert: 'Mettre en forme une page : couleurs, polices, mise en page, adaptation au téléphone.',
          pourquoi: 'Indispensable pour que le contenu soit lisible et agréable, sur grand écran comme sur téléphone.',
          liens: [['CSS sur MDN (en français)', 'https://developer.mozilla.org/fr/docs/Web/CSS'], ['Apprendre le CSS (web.dev)', 'https://web.dev/learn/css'], ['Guide du Flexbox', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/']] },
        { nom: 'JavaScript', ico: '⚡', sert: 'Rendre une page interactive : réagir aux clics, filtrer une liste, appeler une API.',
          pourquoi: 'C\'est le seul langage exécuté par tous les navigateurs ; il sert aussi côté serveur avec Node.js.',
          liens: [['Guide JavaScript sur MDN (en français)', 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide'], ['Le tutoriel JavaScript moderne (en français)', 'https://fr.javascript.info/']] },
        { nom: 'TypeScript', ico: '🔷', sert: 'JavaScript avec des types : l\'éditeur signale les erreurs avant même de lancer le code.',
          pourquoi: 'La plupart des fronts et des applications mobiles récents sont écrits en TypeScript.',
          liens: [['Le manuel officiel', 'https://www.typescriptlang.org/docs/handbook/intro.html'], ['Essayer en ligne (Playground)', 'https://www.typescriptlang.org/play']] },
        { nom: 'Frameworks de front : Astro, Svelte, React Native', ico: '🧩', sert: 'Construire un site (Astro, Svelte) ou une application mobile (React Native avec Expo) à partir de composants.',
          pourquoi: 'Pour lire le code d\'un front moderne, il faut connaître au moins les principes d\'un de ces outils.',
          liens: [['Documentation d\'Astro (en français)', 'https://docs.astro.build/fr/getting-started/'], ['Tutoriel interactif de Svelte', 'https://svelte.dev/tutorial'], ['React Native', 'https://reactnative.dev/docs/getting-started']] }
      ]
    },
    {
      titre: 'Langages et frameworks du back',
      sujets: [
        { nom: 'Java', ico: '☕', sert: 'Langage robuste et très répandu pour les API et les traitements des entreprises.',
          pourquoi: 'Une grande partie des services d\'entreprise (API, batchs) est écrite en Java.',
          liens: [['Apprendre Java (dev.java)', 'https://dev.java/learn/'], ['Documentation d\'Oracle', 'https://docs.oracle.com/en/java/']] },
        { nom: 'Spring Boot et Spring AI', ico: '🌱', sert: 'Spring Boot crée rapidement une API ou un batch en Java ; Spring AI y branche un modèle d\'IA.',
          pourquoi: 'C\'est le framework Java le plus utilisé, et Spring AI permet d\'y intégrer l\'IA simplement.',
          liens: [['Guides de démarrage', 'https://spring.io/guides'], ['Documentation de Spring Boot', 'https://docs.spring.io/spring-boot/'], ['Documentation de Spring AI', 'https://docs.spring.io/spring-ai/reference/']] },
        { nom: 'Python', ico: '🐍', sert: 'Langage simple et polyvalent : scripts, traitement de données, IA.',
          pourquoi: 'C\'est souvent le premier langage conseillé, et le plus utilisé pour l\'automatisation et la donnée.',
          liens: [['Le tutoriel officiel (en français)', 'https://docs.python.org/fr/3/tutorial/'], ['Documentation (en français)', 'https://docs.python.org/fr/3/']] },
        { nom: 'Perl', ico: '🐪', sert: 'Langage de scripts très fort pour transformer du texte (expressions régulières).',
          pourquoi: 'Utile pour retravailler en masse des fichiers texte ou HTML, comme pour générer une documentation.',
          liens: [['Documentation officielle', 'https://perldoc.perl.org/'], ['Les expressions régulières en Perl', 'https://perldoc.perl.org/perlretut']] }
      ]
    },
    {
      titre: 'Données et configuration',
      sujets: [
        { nom: 'SQL et SQLite', ico: '🗄️', sert: 'Interroger et modifier une base de données relationnelle ; SQLite tient toute une base dans un seul fichier.',
          pourquoi: 'Presque toutes les applications stockent leurs données dans une base ; le SQL reste incontournable.',
          liens: [['Cours SQL (en français)', 'https://sql.sh/'], ['Documentation de SQLite', 'https://www.sqlite.org/docs.html']] },
        { nom: 'JSON', ico: '🔣', sert: 'Format d\'échange de données entre programmes, notamment dans les API.',
          pourquoi: 'C\'est la langue commune des API : savoir le lire est indispensable.',
          liens: [['Présentation officielle (en français)', 'https://www.json.org/json-fr.html'], ['Travailler avec JSON (MDN, en français)', 'https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Scripting/JSON']] },
        { nom: 'YAML', ico: '📄', sert: 'Format de configuration lisible, fondé sur l\'indentation.',
          pourquoi: 'Les fichiers de CI, de Kubernetes et de Helm sont écrits en YAML ; une indentation fausse suffit à tout casser.',
          liens: [['Apprendre YAML en quelques minutes', 'https://learnxinyminutes.com/fr/yaml/'], ['Spécification officielle', 'https://yaml.org/spec/1.2.2/']] }
      ]
    }
  ]
};
