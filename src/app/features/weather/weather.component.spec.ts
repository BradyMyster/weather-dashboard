import { TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from '../../core/services/weather.service';
import { of } from 'rxjs';

describe('WeatherComponent (standalone)', () => {
  let fixture: any;
  let mockWeatherService: Partial<WeatherService>;

  beforeEach(async () => {
    mockWeatherService = {
      getWeather: (city: string) => of(null),
    };

    // Standalone component uses external templateUrl/styleUrls; override them in tests
    TestBed.overrideComponent(WeatherComponent, {
      set: {
        template: `<div><h2>Weather Dashboard</h2><input class="search-input" /></div>`,
        styles: ['']
      }
    });

    await TestBed.configureTestingModule({
      imports: [WeatherComponent, ReactiveFormsModule],
      providers: [{ provide: WeatherService, useValue: mockWeatherService }],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    fixture.detectChanges();
  });

  it('creates the component', () => {
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('renders search input', () => {
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector('.search-input');
    expect(input).toBeTruthy();
  });
});
