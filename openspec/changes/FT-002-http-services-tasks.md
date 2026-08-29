# Tâches : Implémentation de la couche HTTP Services

## ✅ Completed

### Tâche 1: Service HTTP de base
- [x] Créer `src/app/services/api/http-client.service.ts`
- [x] Implémenter GET, POST, PUT, DELETE
- [x] Ajouter la gestion d'erreurs

### Tâche 2: Service Météo France
- [x] Créer `src/app/services/api/meteo-france.types.ts`
- [x] Créer `src/app/services/api/meteo-france.service.ts`
- [x] Implémenter les méthodes de récupération de météo
- [x] Ajouter la construction des query parameters

### Tâche 3: Composant Widget Météo
- [x] Créer `src/app/weather-widget/weather-widget.ts`
- [x] Implémenter l'affichage de la météo avec Bootstrap
- [x] Utiliser les signals pour la gestion d'état

### Tâche 4: Configuration
- [x] Mettre à jour `app.config.ts` avec `provideHttpClient()`
- [x] Ajouter les exports à `src/app/services/api/index.ts`

### Tâche 5: Documentation
- [x] Créer `src/app/services/api/README.md`
- [x] Créer la spécification openspec
- [x] Créer cette documentation des tâches

## 📋 À faire (Prochaines étapes)

### Tâche 6: Intégration dans Wind Page
- [ ] Importer `WeatherWidgetComponent` dans `wind-page.ts`
- [ ] Ajouter le composant au template de wind-page
- [ ] Tester avec des coordonnées réelles

### Tâche 7: Tests unitaires
- [ ] Créer `http-client.service.spec.ts`
- [ ] Créer `meteo-france.service.spec.ts`
- [ ] Tester les appels API et la gestion d'erreurs

### Tâche 8: Améliorations futures
- [ ] Ajouter RxJS operators (map, shareReplay)
- [ ] Implémenter un système de cache
- [ ] Ajouter les interceptors HTTP pour logging
- [ ] Créer d'autres services API (climat, air quality, etc.)

## Temps estimé
- Implémentation: ✅ ~2h
- Tests: ~1h
- Documentation: ✅ ~30min
- Intégration: ~30min
