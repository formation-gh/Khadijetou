# Rapport des tests

**Date :** 1 octobre 2026  
**Projet :** Khadijetou — test de l’application en ligne  
**Résultat général :** ✅ Réussi

## Résumé

Le test automatisé a vérifié que l’application s’ouvre, permet de se connecter
et affiche la liste des utilisateurs sans erreur dans le navigateur.

| Vérification | Résultat |
| --- | --- |
| L’application répond correctement | ✅ Réussi |
| Le formulaire de connexion fonctionne | ✅ Réussi |
| La page « Les utilisateurs » s’affiche après la connexion | ✅ Réussi |
| Aucune erreur JavaScript ou console n’est détectée | ✅ Réussi |
| **Bilan** | **1 test réussi sur 1** |

## Actions effectuées

1. Installation des dépendances du projet (`npm ci`).
2. Installation du navigateur Chromium nécessaire au test Playwright.
3. Exécution du test automatisé avec `npm test`.
4. Vérification du résultat : **1 test réussi, 0 échec**.

La première tentative n’a pas pu démarrer, car Playwright et son navigateur
n’étaient pas encore installés dans l’environnement. Après leur installation,
le test a été exécuté normalement et a réussi.

## Détail du test

Le test ouvre l’application, vérifie que la réponse du site est correcte,
remplit le formulaire de connexion, clique sur « Se connecter », puis confirme
que le titre « Les utilisateurs » est visible et qu’aucune erreur du navigateur
n’a été relevée.

**Commande de test :** `npm test`
