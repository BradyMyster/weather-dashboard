# Angular Weather Dashboard


A minimal reactive weather search app built with **Angular 18+**, **RxJS**, and **TypeScript**.


## 🚀 Run Locally
```bash
npm install
ng serve
```


## 🧩 Features
- Reactive city search with debounce
- Mock geocoding step to simulate city-to-coordinates lookup
- Loading, error, and empty state handling
- Clean service/component separation
- Idiomatic RxJS operators and teardown


## 🌦️ API
Uses [Open-Meteo](https://open-meteo.com/) public API combined with a mock geocoder for demonstration.

## 📝 NOTE

The repository also keeps the default Angular Karma test script available as `npm test`.
City search simulates geolocation retrival (longitude and lattitude). Available cities to search are San Francisco, New York,London,Tokyo, and Paris
Searching for any other city will result in the message: "City not found or weather unavailable."

# 🧪 Testing (Karma)

This project includes a Karma setup for unit tests (component + service specs under `src/app`). To run karma locally:

```powershell
# run  tests
npm run test
```
