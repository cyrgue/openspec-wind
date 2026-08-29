# Proposition : Couche HTTP Services

## Contexte
L'application Angular a besoin d'une couche centralisée pour gérer les appels API. Actuellement, il n'y a pas de structure standardisée pour les services HTTP.

## Objectif
Créer une architecture réutilisable et type-safe pour tous les services HTTP de l'application.

## Solution proposée

### 1. Service de base HTTP (`HttpClientService`)
- Encapsule `HttpClient` d'Angular
- Fournit des méthodes génériques (GET, POST, PUT, DELETE)
- Gère les erreurs de manière cohérente
- Fournissable comme singleton à la racine

### 2. Service Météo France (Exemple)
- Intègre l'API open-meteo.com
- Fournit des méthodes de haut niveau :
  - `getCurrentWeather(lat, lon)` - Météo actuelle
  - `getHourlyForecast(lat, lon)` - Prévisions horaires
  - `getDailyForecast(lat, lon)` - Prévisions quotidiennes
- Types TypeScript complets pour les réponses

### 3. Composant Météo Widget
- Exemple d'utilisation du service
- Affiche les données météo avec Bootstrap
- Utilise les signals Angular pour la gestion d'état

### 4. Configuration de l'application
- Ajout de `provideHttpClient()` à `app.config.ts`
- Rend HttpClient disponible globalement

## Avantages
- ✅ Architecture type-safe avec TypeScript
- ✅ Services réutilisables et maintenables
- ✅ Gestion d'erreurs centralisée
- ✅ Documentation et exemples d'utilisation
- ✅ Facile à étendre avec de nouveaux services

## Non-objectifs
- Caching des réponses (peut être ajouté plus tard)
- Interceptors HTTP avancés
- Retry logic (peut être ajoutée au besoin)

## Dépendances
- Angular 22.1.0
- RxJS 7.8.0
- HTTP API publique (open-meteo.com)
