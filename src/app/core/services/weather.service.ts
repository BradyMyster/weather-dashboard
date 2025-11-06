import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, switchMap, shareReplay, delay } from 'rxjs';
import { WeatherData, GeoLocation } from '../models/weather.model';


@Injectable({ providedIn: 'root' })
export class WeatherService {
    private http = inject(HttpClient);


    /**
    * Mock geocoding step — simulates city → lat/lon lookup.
    * In real use, replace with a real geocoding API (e.g., OpenCage, Google Maps, etc.).
    */
    private mockGeocode(city: string): Observable<GeoLocation | null> {
        if (!city.trim()) return of(null);


        const mockDb: Record<string, GeoLocation> = {
            'san francisco': { city: 'San Francisco', latitude: 37.7749, longitude: -122.4194 },
            'new york': { city: 'New York', latitude: 40.7128, longitude: -74.006 },
            'london': { city: 'London', latitude: 51.5072, longitude: -0.1276 },
            'tokyo': { city: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
            'paris': { city: 'Paris', latitude: 48.8566, longitude: 2.3522 },
        };


        const key = city.trim().toLowerCase();
        const result = mockDb[key] || null;


        // Simulate network delay
        return of(result).pipe(delay(400));
    }


    getWeather(city: string): Observable<WeatherData | null> {
        return this.mockGeocode(city).pipe(
            switchMap((geo) => {
                if (!geo) return of(null);


                const url = `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current_weather=true`;


                return this.http.get<any>(url).pipe(
                    map((res) => ({
                        city: geo.city,
                        temperature: res.current_weather?.temperature ?? 0,
                        description: 'Clear',
                        icon: '☀️',
                        humidity: 60,
                        windSpeed: res.current_weather?.windspeed ?? 0,
                    })),
                    catchError((err) => {
                        console.error('Weather fetch error:', err);
                        return of(null);
                    })
                );
            }),
            shareReplay(1)
        );
    }
}