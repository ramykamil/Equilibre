# Product Requirements Document (PRD) — Équilibre

## 📄 Résumé Exécutif

* **Nom du Produit :** Équilibre
* **Vision :** Offrir un accompagnement relationnel, thérapeutique et personnel continu, accessible et sur-mesure pour aider les individus à traverser les transitions de vie, gérer les troubles psychologiques et retrouver leur équilibre émotionnel.
* **Objectif Principal :** Lancer une plateforme (Web & Mobile) permettant une mise en relation fluide avec des spécialistes certifiés (coachs, psychologues, thérapeutes), complétée par des outils de suivi quotidien, des tests d'évaluation, et des dossiers confidentiels hautement sécurisés.

---

## 🎯 Public Cible & Cas d'Usage (Personas & Besoins)

La plateforme doit s'adapter à des besoins très différents via un système de profils personnalisés et des rôles d'utilisateurs distincts (**Patients** et **Professionnels/Spécialistes**).

### Les Jeunes Couples & Futurs Mariés
* **Besoins :** Communication, résolution de conflits, planification de l'avenir, tests de compatibilité émotionnelle et relationnelle.
* **Attentes :** Séances à trois (le couple + le spécialiste), exercices de communication asynchrones.

### Les Futures & Jeunes Mamans
* **Besoins :** Gestion du stress, baby blues, préparation émotionnelle à l'accouchement et à la parentalité, relations post-partum.
* **Attentes :** Disponibilité flexible, réassurance rapide, communauté de soutien.

### Les Enfants, Adolescents & Étudiants
* **Besoins :** Gestion de l'anxiété, traumatismes, hyper-sensibilité, relations sociales, orientation professionnelle, confiance en soi.
* **Attentes :** Interface intuitive (type application sociale), tarifs adaptés, messagerie instantanée.

### Les Personnes Âgées (Seniors)
* **Besoins :** Lutte contre l'isolement, acceptation du vieillissement, troubles liés à l'âge, accompagnement psychologique.
* **Attentes :** Interface simplifiée, accessibilité accrue (gros caractères, navigation vocale), appels simples.

### Professionnels de Santé (Second Avis)
* **Besoins :** Analyse de dossiers complexes, échange interdisciplinaire.
* **Attentes :** Partage sécurisé et conforme des dossiers de consultation.

---

## ⚙️ Fonctionnalités Clés (MVP - Produit Minimum Viable)

### 1. Inscription, Rôles & Authentification
* **Double Rôle :** Inscriptions séparées et dashboards dédiés pour les **Patients** et les **Professionnels** (psychologues, coachs, thérapeutes).
* **Authentification sécurisée :** Connexion via email ou numéro de téléphone, avec option d'authentification à deux facteurs (2FA).
* **Identifiant Sécurisé Unique :** Génération d'un code d'identification unique et sécurisé transmis au patient après validation de son premier paiement.

### 2. Prise de Rendez-vous & Paiement
* **Calendrier Interactif :** Prise de rendez-vous en temps réel selon les disponibilités du spécialiste.
* **Choix de la Modalité :** Consultation au choix via visioconférence (vidéo), appel audio ou chat écrit.
* **Paiement Intégré :** Transactions sécurisées (carte bancaire, portefeuilles électroniques) générant automatiquement la facture/reçu.

### 3. Consultation, Séances & Déroulement
* **Workflow de Consultation :**
  1. Connexion à la séance programmée (via l'identifiant sécurisé).
  2. Confession et échange avec le spécialiste.
  3. Établissement d'un plan d'intervention thérapeutique personnalisé.
* **Messagerie asynchrone sécurisée :** Possibilité de laisser des messages texte ou vocaux à son coach/thérapeute 24/7 (avec délai de réponse garanti).
* **Assistant d'urgence (IA) :** Chatbot de triage proposant des exercices de respiration ou des ressources ciblées hors des heures de présence, redirigeant vers des numéros d'urgence si nécessaire.

### 4. Dossier Confidentiel Codé & Partage
* **Dossier Médical Codé :** Espace personnel hautement sécurisé et chiffré contenant l'historique des séances, le plan d'intervention et les notes.
* **Accès Restreint :** Accessible uniquement par le patient et le spécialiste traitant.
* **Partage avec Médecin Traitant :** Possibilité pour le patient d'autoriser explicitement le partage temporaire ou permanent de son dossier avec son médecin traitant.

### 5. Tests, Évaluations & Spécificités Thérapeutiques
* **Tests Psychométriques :**
  * Pour adultes et seniors : Tests de caractère, de compatibilité relationnelle, de bien-être mental.
  * Pour enfants/adolescents : Évaluation des traumatismes, de l'hyper-sensibilité et du stress.
* **Modules Spécifiques d'Accompagnement :**
  * Troubles psychologiques : Dépression, phobies, insomnies.
  * Troubles alimentaires : Anorexie, boulimie.
  * Transitions de vie : Deuil, séparation.

### 6. Interface Professionnelle (Dashboard Coach/Thérapeute)
* **Gestion des Clients :** Suivi des dossiers patients codés, notes de consultation privées, historique.
* **Gestion de l'Agenda :** Calendrier professionnel synchronisé.
* **Facturation & Revenus :** Suivi automatisé des paiements et commissions.

---

## 🔒 Exigences Non-Fonctionnelles & Sécurité

| Catégorie | Exigence Spécifique |
| :--- | :--- |
| **Sécurité & Confidentialité** | Chiffrement de bout en bout des communications. Conformité stricte RGPD et hébergement agréé données de santé (HDS / HIPAA). Dossier patient codé. |
| **Accessibilité** | Mode contraste élevé, typographie ajustable, accessibilité PMR. |
| **Disponibilité** | Plateforme disponible 24/7 avec un taux de disponibilité (Uptime) de 99.9%. |
| **Multi-plateforme** | Web application responsive (PWA) + Applications mobiles natives (évolutions). |

---

## 💰 Modèle Économique (Monétisation)

* **Abonnement Utilisateur (B2C) :** Plans mensuels incluant un accès aux ressources et un quota de séances visio.
* **Pay-as-you-go :** Achat de consultations individuelles à la séance.
* **Abonnement / Commission Professionnels (B2B) :** Commission de 15-20% prélevée sur le montant des séances ou abonnement fixe pour l'utilisation de l'interface de gestion de cabinet.

---

## 📈 Critères de Succès (KPIs)

* **Taux de rétention des patients :** Pourcentage d'utilisateurs poursuivant leur suivi au-delà de 3 mois.
* **NPS (Net Promoter Score) :** Satisfaction générale et recommandation de la plateforme.
* **Temps de réponse :** Rapidité de traitement des messages asynchrones.
* **Engagement :** Nombre de tests passés, d'exercices réalisés et de séances planifiées.ir la promesse de "conseil permanent".
* **Engagement :** Nombre de messages envoyés ou d'exercices réalisés par semaine et par utilisateur.
