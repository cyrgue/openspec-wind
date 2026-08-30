# Design : Couche HTTP Services

## Architecture des Services

```
src/app/services/api/
├── index.ts                      # Exports publics
├── http-client.service.ts        # Service de base HTTP
├── meteo-france.types.ts         # Types TypeScript
├── meteo-france.service.ts       # Service Météo France
└── README.md                     # Documentation
```

## Flux de communication

```
Component
   ↓ (inject)
MeteoFranceService
   ↓ (utilise)
HttpClientService
   ↓ (utilise)
HttpClient (Angular)
   ↓ (HTTP GET)
open-meteo.com/v1/forecast
   ↓ (Response)
MeteoFranceWeatherResponse
   ↓ (Observable)
Component (subscribe)
```

## Structure du WeatherWidget

```
┌─────────────────────────────────────────┐
│  Météo Actuelle                         │
├─────────────────────────────────────────┤
│                                         │
│  Température      │      Humidité       │
│  24°C             │      65%            │
│                                         │
│  Vitesse du vent  │   Précipitations    │
│  12 km/h          │      0 mm           │
│                                         │
│  📍 Lat: 48.8566, Lon: 2.3522          │
│                                         │
└─────────────────────────────────────────┘
```

## États du composant

### 1. État de chargement
- Affiche un spinner de chargement
- Désactive les interactions utilisateur

### 2. État d'erreur
- Affiche un message d'alerte Bootstrap
- Permet à l'utilisateur de réessayer

### 3. État de succès
- Affiche les données météo
- Utilise le layout responsive Bootstrap (col-6)

## Responsive Design

- **Mobile (< 576px)**: Stack vertical, texte centré
- **Tablet (≥ 576px)**: 2 colonnes avec la classe Bootstrap `col-6`
- **Desktop (≥ 992px)**: Même layout que tablet, peut être étendu

## Intégration Bootstrap

- Utilise la classe `.card` pour le conteneur
- Padding: `.p-4` pour l'espacement
- Couleurs dynamiques via CSS variables Bootstrap
- Icons Bootstrap (bi-cloud-sun, bi-geo-alt)
- Spinner Bootstrap pour le chargement

## Accessibilité

- ✅ Sémantique HTML correcte
- ✅ ARIA labels sur le spinner (`role="status"`)
- ✅ Texte clair et contrasté
- ✅ Messages d'erreur explicites
