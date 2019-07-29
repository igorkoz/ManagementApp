import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {
  private httpC: HttpClient;

  private apiUrl = "http://api.apixu.com/v1/current.json?key=a4d0e75e741e477c9b4211919190902";
  private weatherForecast: any;

  public forecasts: WeatherForecast;
  public cityCode = "Kiev";

  public cities: City[] = [
    { value: 'Kiev', viewValue: 'Kiev' },
    { value: 'Lviv', viewValue: 'Lviv' },
    { value: 'Odessa', viewValue: 'Odessa' }
  ];
  
  constructor(private http: HttpClient)
  {
    this.httpC = http;
    this.cityChange(this.cityCode);
  }

  public getData() {
    this.forecasts = this.weatherForecast;
  }

  public cityChange(city: string) {

    this.httpC.get<WeatherForecast>(this.apiUrl + '&q=' + city).subscribe(result => {
      this.weatherForecast = result;
    }, error => console.error(error), () => this.getData());
  }

  ngOnInit() {
    this.forecasts = new WeatherForecast();
    this.forecasts.location = new Location();
    this.forecasts.current = new Current();
    this.forecasts.current.condition = new Condition();
  }

}

class City {
  value: string;
  viewValue: string;
}

class WeatherForecast {
  location: Location;
  current: Current;
}

class Location {
  name: string;
  region: string;
  country: string;
  //localtime: string;
}

class Current {
  temp_c: number;
  condition: Condition;
  wind_kph: number;
  //"wind_degree": 230,
  wind_dir: string;
  //"pressure_mb": 1019,
  //"pressure_in": 30.6,
  //"precip_mm": 0.7,
  //"precip_in": 0.03,
  humidity: number;
  //"cloud": 100,
  //"feelslike_c": -8.9,
  //"feelslike_f": 16,
  //"vis_km": 10,
  //"vis_miles": 6,
  //"uv": 0
}

class Condition {
  text: string;
  icon: string;
  code: 1009;
}

