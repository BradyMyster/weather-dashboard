export interface WeatherData {
    city: string;
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
}


export interface GeoLocation {
    city: string;
    latitude: number;
    longitude: number;
}