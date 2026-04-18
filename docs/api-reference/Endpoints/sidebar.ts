import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api-reference/openweathermap-api",
    },
    {
      type: "category",
      label: "Current weather data",
      items: [
        {
          type: "doc",
          id: "api-reference/current-weather-data",
          label: "CurrentWeatherData",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
