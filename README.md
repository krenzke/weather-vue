# Simple Weather App

The usual weather sites I check are way too bloated with ads and UI junk I don't need. So I made a dead-simple weather app for myself. It shows the current weather, an 8-day forecast, and an hourly forecast. That's it. It works with any API that provides data in the [Pirate Weather API](https://pirateweather.net/en/latest/) format.

## Getting started

```sh
yarn
yarn dev
```

## Development

The app is pretty small (which is kind of the point). It uses [Vue](https://vuejs.org/) for rendering, [Pinia](https://pinia.vuejs.org/) for state management, and [Chartjs](https://www.chartjs.org/) for a pretty chart or two.

The main app is contained in `src/App.vue`, which imports the few essential components. The one and only Pinia store is in `src/stores/weatherForecast.ts`. It is responsible for fetching data from the API and parsing it into easily-digestible chunks to be used by the view components.
