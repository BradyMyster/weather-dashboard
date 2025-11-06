import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from '../../core/services/weather.service';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
    selector: 'app-weather',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
    private weatherService = inject(WeatherService);
    private destroyRef = inject(DestroyRef);

    searchControl = new FormControl('');

    loading = signal(false);
    error = signal('');
    weather = signal<any | null>(null);

    constructor() {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                tap(() => {
                    this.loading.set(true);
                    this.error.set('');
                }),
                switchMap((city) =>
                    this.weatherService.getWeather(city || '').pipe(
                        tap((data) => {
                            this.weather.set(data);
                            this.loading.set(false);
                            if (!data) this.error.set('City not found or weather unavailable.');
                        })
                    )
                ),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                error: (err) => {
                    this.error.set('Failed to load weather.');
                    this.loading.set(false);
                },
            });
    }
}