import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  cityName: string = '';
  recentLocations: any[] = [];
  selectedCityForecast: any;
  error: boolean = false;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  addCity() {
    if (!this.cityName) return;

    this.weatherService.getWeatherByCity(this.cityName).subscribe((data) => {
      if (data.error) {
        this.error = true;
        this.errorMessage = 'Invalid city name. Please try again.';
      } else {
        this.error = false;

        if (this.recentLocations.length === 8) {
          this.recentLocations.pop();
        }

        const weatherIcon = this.getWeatherIcon(data.weather[0].icon);

        this.recentLocations.unshift({
          name: data.name,
          temp: data.main.temp,
          weatherDescription: data.weather[0].description,
          weatherIcon: weatherIcon,
        });

        this.cityName = '';
      }
    });
  }

  refreshCity(city: any) {
    this.weatherService.getWeatherByCity(city.name).subscribe((data: any) => {
      city.temp = data.main.temp;
      city.weatherDescription = data.weather[0].description;
      city.weatherIcon = this.getWeatherIcon(data.weather[0].main);
    });
  }

  removeCity(index: number) {
    this.recentLocations.splice(index, 1);
  }

  clearLocations() {
    this.recentLocations = [];
  }

  showForecast(city: any) {
    this.weatherService
      .getFiveDayForecast(city.name)
      .subscribe((forecast: any) => {
        this.selectedCityForecast = forecast;
        console.log(this.selectedCityForecast);
        this.filterForecastForNextFiveDays();
      });
  }

  filterForecastForNextFiveDays() {
    const currentTime = new Date();
    const currentHourUTC = currentTime.getUTCHours();

    const forecastForFiveDays = [];
    const daysAdded = new Set();

    for (let i = 0; i < this.selectedCityForecast.list.length; i++) {
      const forecast = this.selectedCityForecast.list[i];
      const forecastDate = new Date(forecast.dt * 1000);

      const forecastDay = forecastDate.getUTCDate();
      const forecastWeekday = forecastDate.toLocaleDateString('en-US', {
        weekday: 'short',
      });
      const forecastHourUTC = forecastDate.getUTCHours();

      if (!daysAdded.has(forecastDay)) {
        if (Math.abs(forecastHourUTC - currentHourUTC) <= 3) {
          forecast.formattedDay = {
            day: parseInt(`${forecastDay}`),
            weekday: `${forecastWeekday}`,
          };
          forecastForFiveDays.push(forecast);
          daysAdded.add(forecastDay);
        }
      }

      if (forecastForFiveDays.length === 5) {
        break;
      }
    }

    if (forecastForFiveDays.length > 0) {
      console.log('Filtered Forecast for 5 days:', forecastForFiveDays);
      this.selectedCityForecast.list = forecastForFiveDays;
    } else {
      console.log('No forecast data found for the next 5 days.');
    }
  }

  getWeatherIcon(weatherType: string): string {
    switch (weatherType.toLowerCase()) {
      case 'clouds':
        return `http://openweathermap.org/img/wn/${weatherType}@2x.png`;
      case 'clear':
        return `http://openweathermap.org/img/wn/${weatherType}@2x.png`;
      case 'rain':
        return `http://openweathermap.org/img/wn/${weatherType}@2x.png`;
      case 'snow':
        return `http://openweathermap.org/img/wn/${weatherType}@2x.png`;
      default:
        return `http://openweathermap.org/img/wn/${weatherType}@2x.png`;
    }
  }
}
