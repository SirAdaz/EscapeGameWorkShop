# 🎮 TCHERNOBYL2 - Escape Game Virtuel

Un escape game interactif en ligne développé avec Next.js, React, Tailwind CSS et Socket.io.

## 🚀 Fonctionnalités

- **🎯 Mode Multi-joueur** : Jusqu'à 4 joueurs simultanés
- **⏰ Timer en temps réel** : 60 minutes pour sauver l'humanité
- **💬 Chat collaboratif** : Communication en temps réel entre joueurs
- **🧩 Puzzles interactifs** : Disjoncteur et casiers à résoudre
- **🏭 6 salles explorables** : Hall, Serveur, Laboratoire, Archives, Vestiaires, Administrateur
- **🎨 Interface moderne** : Design avec DaisyUI et Tailwind CSS

## 🎮 Comment jouer

1. **Accédez au jeu** : Ouvrez `http://localhost:3000`
2. **Code d'accès** : Entrez `1234`
3. **Explorez les salles** : Utilisez les flèches de navigation
4. **Trouvez les hotspots** : Survolez les zones interactives
5. **Résolvez les énigmes** : Collectez les 4 codes pour ouvrir le coffre-fort
6. **Collaborez** : Utilisez le chat pour communiquer avec votre équipe

## 🛠️ Installation

```bash
# Cloner le repository
git clone https://github.com/SirAdaz/EscapeGameWorkShop.git
cd EscapeGameWorkShop

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev:full
```

## 📋 Scripts disponibles

- `npm run dev` - Lance Next.js en mode développement
- `npm run server` - Lance le serveur Socket.io
- `npm run dev:full` - Lance les deux serveurs simultanément
- `npm run build` - Build de production
- `npm run start` - Lance le serveur de production

## 🏗️ Architecture

- **Frontend** : Next.js 15 + React 19 + Tailwind CSS + DaisyUI
- **Backend** : Node.js + Socket.io
- **Communication** : WebSockets en temps réel
- **Styling** : Tailwind CSS avec composants DaisyUI

## 🎯 Objectif du jeu

Dans un monde post-apocalyptique 2119, une souche mutée du Covid-20 menace l'humanité. Votre mission : infiltrer l'usine Tchernobyl2 abandonnée, collecter les 4 morceaux de code génétique et créer le vaccin qui sauvera l'humanité.

## 🧩 Salles et énigmes

1. **Hall Principal** - Point de départ et coffre-fort final
2. **Salle Serveur** - Réparer le disjoncteur et accéder aux données
3. **Salle Laboratoire** - Résoudre l'équation chimique
4. **Salle Archives** - Trouver les documents de recherche
5. **Salle Vestiaires** - Déchiffrer le code des casiers
6. **Salle Administrateur** - Obtenir l'accès administrateur

## 👥 Mode Multi-joueur

- **Joueurs simultanés** : Maximum 4
- **Synchronisation** : Timer et inventaire partagés
- **Chat en temps réel** : Communication par salle
- **Navigation** : Chaque joueur peut explorer indépendamment

## 🎨 Technologies utilisées

- **Next.js 15** - Framework React
- **React 19** - Bibliothèque UI
- **Tailwind CSS** - Framework CSS
- **DaisyUI** - Composants UI
- **Socket.io** - Communication temps réel
- **TypeScript** - Typage statique

## 📝 Développement

Ce projet a été développé dans le cadre d'un workshop EPSI 2025-26 sur les technologies web modernes.