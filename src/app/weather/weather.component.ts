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

        // Keep only 8 locations, push new one to the top and remove the last
        if (this.recentLocations.length === 8) {
          this.recentLocations.pop();
        }

        const weatherIcon = this.getWeatherIcon(data.weather[0].icon); // Use the icon code from API

        this.recentLocations.unshift({
          name: data.name,
          temp: data.main.temp,
          weatherDescription: data.weather[0].description,
          weatherIcon: weatherIcon,
        });

        this.cityName = ''; // Clear input
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

  // filterForecastForCurrentTime() {
  //   const currentTime = new Date();
  //   const currentHour = currentTime.getHours();
  //   console.log(this.selectedCityForecast.list)
  //   // Get the forecast for the same time on the next 5 days
  //   const filteredForecast = this.selectedCityForecast.list.filter((item:any) => {
  //     const forecastDate = new Date(item.dt * 1000); // Convert UNIX timestamp to Date
  //     return forecastDate.getHours() === currentHour; // Check if the hour matches
  //   });

  //   this.selectedCityForecast.list = filteredForecast; // Update the forecast list
  // }

  // filterForecastForNextFiveDays() {
  //   const currentTime = new Date();
  //   const currentHour = currentTime.getHours(); // Get current hour
    
  //   const forecastForFiveDays = []; // Array to store filtered forecasts
  
  //   // Get the next 5 days including today
  //   for (let i = 0; i < this.selectedCityForecast.list.length; i++) {
  //     const forecast = this.selectedCityForecast.list[i];
  //     const forecastDate = new Date(forecast.dt * 1000); // Convert UNIX timestamp to Date
  
  //     const forecastDay = forecastDate.getDate();  // Day of the forecast
  //     const currentDay = currentTime.getDate();    // Current day
  
  //     // Log date and time for debugging
  //     console.log('Forecast Date:', forecastDate);
  //     console.log('Forecast Day:', forecastDay);
  
  //     // We want the forecast for today and the next 5 days at the closest hour
  //     if (forecastDay >= currentDay && forecastDay <= currentDay + 4) {
  //       // Check if the forecast hour is close to the current hour (within 1-3 hours)
  //       if (Math.abs(forecastDate.getHours() - currentHour) <= 1) {
  //         // this.selectedCityForecast.list[i]['forecast Day']=forecast;
  //         console.log('Matching forecast for day:', forecastDay);
  //         forecastForFiveDays.push(forecast);
  //       }
  //     }
  //   }
  
  //   if (forecastForFiveDays.length > 0) {
  //     console.log('Filtered Forecast for 5 days:', forecastForFiveDays);
  //     this.selectedCityForecast.list = forecastForFiveDays; // Update the forecast list
  //   } else {
  //     console.log('No forecast data found for the next 5 days.');
  //   }
  // }


  filterForecastForNextFiveDays() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours(); // Get the current hour
    
    const forecastForFiveDays = []; // Array to store filtered forecasts
    const daysAdded = new Set(); // Set to track which days have been added
  
    // Loop through the forecast list to extract data for up to 5 days
    for (let i = 0; i < this.selectedCityForecast.list.length; i++) {
      const forecast = this.selectedCityForecast.list[i];
      const forecastDate = new Date(forecast.dt * 1000); // Convert UNIX timestamp to Date
      
      const forecastDay = forecastDate.getDate();  // Day of the forecast (e.g., 18)
      const forecastWeekday = forecastDate.toLocaleDateString('en-US', { weekday: 'short' }); // Day of the week (e.g., "Fri")
  
      // Ensure we add only one forecast per day
      if (!daysAdded.has(forecastDay)) {
        // Match the closest hour to the current hour (within 1-3 hours)
        if (Math.abs(forecastDate.getHours() - currentHour) <= 2) {
          forecast.formattedDay = {Day:parseInt(`${forecastDay}`), weekday:`${forecastWeekday}`}; // Combine day and weekday
          forecastForFiveDays.push(forecast);
          daysAdded.add(forecastDay); // Mark this day as added
        }
      }
  
      // Stop once we have data for 5 days
      if (forecastForFiveDays.length === 5) {
        break;
      }
    }
  
    if (forecastForFiveDays.length > 0) {
      console.log('Filtered Forecast for 5 days:', forecastForFiveDays);
      this.selectedCityForecast.list = forecastForFiveDays; // Update the forecast list with 5-day data
    } else {
      console.log('No forecast data found for the next 5 days.');
    }
  }
  
  
  

  // getWeatherIcon(iconCode: string): string {
  //   return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  // }

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
