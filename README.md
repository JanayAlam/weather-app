# Weather App

A web system that displays the weather, temperature, and humidity of Japan (Miyazaki) and Bangladesh (Dhaka) on the screen. User can add other city as well. They can search any city's weather.

Technology Used: **Vue**, **Weather API**, **Vuetify**, etc.

## Requirements Analysis

- Shows the weather, temperature, and humidity of Miyazaki and Dhaka. And a user can add a new city if they want. The additional cities are removable but the Miyazaki and Dhaka is fixed. That means a user cannot remove Miyazaki and Dhaka from the web view.

- On top of the application, there will be short temperature info about the current location. On the right side of the navigation bar, there will be a search bar. Users can search for any city’s temperature.

- The website must have a dark mode and Japanese language Support.

- Data caching should be implemented.

- There will a feature to compare two or multiple city’s weather.

- The system will have a caching system. Also, a user can reload the temperature by clicking a button.

- The website must be controllable by only the keyboard.

- The website must be readable by the screen reader.

- All the components must be tested.

## How to run

Download the repository by-

```bash
git clone git@github.com:JanayAlam/weather-app.git
cd weather-app
```

Install packages by-

```bash
yarn
```

Configure the environmental variables by-

```bash
cp default.env .env
```

Then replace the `VITE_API_KEY`'s value `YOUR_WEATHER_API_KEY` with your [Weather API](https://www.weatherapi.com)'s API key.

Run the project by-

```bash
yarn run dev
```

## Dependencies

- Weather API: https://www.weatherapi.com
