function weatherCodeToImageUrl(weatherCode: number) {
  const codeImage: Record<number, string> = {
    // Clear / Cloudy
    0: "/images/icon-sunny.webp", // Clear sky
    1: "/images/icon-partly-cloudy.webp", // Mainly clear
    2: "/images/icon-partly-cloudy.webp", // Partly cloudy
    3: "/images/icon-overcast.webp", // Overcast

    // Fog
    45: "/images/icon-fog.webp", // Fog
    48: "/images/icon-fog.webp", // Depositing rime fog

    // Drizzle
    51: "/images/icon-drizzle.webp", // Light drizzle
    53: "/images/icon-drizzle.webp", // Moderate drizzle
    55: "/images/icon-drizzle.webp", // Dense drizzle
    56: "/images/icon-drizzle.webp", // Freezing drizzle (light)
    57: "/images/icon-drizzle.webp", // Freezing drizzle (dense)

    // Rain
    61: "/images/icon-rain.webp", // Slight rain
    63: "/images/icon-rain.webp", // Moderate rain
    65: "/images/icon-rain.webp", // Heavy rain
    66: "/images/icon-rain.webp", // Freezing rain (light)
    67: "/images/icon-rain.webp", // Freezing rain (heavy)
    80: "/images/icon-rain.webp", // Rain showers (slight)
    81: "/images/icon-rain.webp", // Rain showers (moderate)
    82: "/images/icon-rain.webp", // Rain showers (violent)

    // Snow
    71: "/images/icon-snow.webp", // Slight snowfall
    73: "/images/icon-snow.webp", // Moderate snowfall
    75: "/images/icon-snow.webp", // Heavy snowfall
    77: "/images/icon-snow.webp", // Snow grains
    85: "/images/icon-snow.webp", // Snow showers (slight)
    86: "/images/icon-snow.webp", // Snow showers (heavy)

    // Thunderstorm
    95: "/images/icon-storm.webp", // Thunderstorm
    96: "/images/icon-storm.webp", // Thunderstorm with hail
    99: "/images/icon-storm.webp", // Thunderstorm with heavy hail
  };

  return codeImage[weatherCode];
}

export default weatherCodeToImageUrl;
