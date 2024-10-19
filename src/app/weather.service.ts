import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable ,of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'd4594364698122bfd1c4b3eb5f2ff19f';
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getWeatherByCity(cityName: string): Observable<any> {
    const url = `${this.weatherUrl}?q=${cityName}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url).pipe(
      map(data => data),
      catchError(() => of({ error: true })) // Return an error object if the request fails
    );
  }

  getFiveDayForecast(cityName: string): Observable<any> {
    const url = `${this.forecastUrl}?q=${cityName}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url).pipe(
      map(data => data),
      catchError(() => of({ error: true }))
    );
  }
}
