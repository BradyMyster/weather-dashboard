import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns null for unknown city via mockGeocode', (done) => {
    service.getWeather('unknown-city').subscribe((res) => {
      expect(res).toBeNull();
      done();
    });
  });

  it('fetches current weather for a known city', fakeAsync(() => {
    // Known city from mockGeocode: 'london' -> lat/lon in mock
    let result: any = null;
    service.getWeather('london').subscribe((res) => {
      result = res;
    });

    // mockGeocode uses a small delay(400) — advance timers so the HTTP request is issued
    tick(500);

    // Expect one outgoing request to open-meteo URL; match by base path
    const req = httpMock.expectOne((r) => r.url.includes('api.open-meteo.com'));
    expect(req).toBeTruthy();

    // Reply with a minimal current_weather payload
    req.flush({ current_weather: { temperature: 12.34, windspeed: 5.6 } });

    // allow observable pipeline to complete
    tick();

    expect(result).toBeTruthy();
    expect(result?.city).toBe('London');
  }));
});
