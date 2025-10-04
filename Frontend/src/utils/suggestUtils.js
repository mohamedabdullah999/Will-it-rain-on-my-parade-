export function getWeatherSuggestion(d) {
  let suggestion = "";

  // 1- score
  if (d.weather_score >= 90) {
    suggestion += "Excellent weather for outdoor activities! 🌞 ";
  } else if (d.weather_score >= 70) {
    suggestion += "Good weather, you can enjoy being outside. ";
  } else if (d.weather_score >= 50) {
    suggestion += "Fair weather, maybe short walks. ";
  } else {
    suggestion += "Not great for going out, better to stay indoors. ";
  }

  // 2- conditions
  if (d.temperature >= 20 && d.temperature <= 27 && d.humidity < 60) {
    suggestion += "Perfect for a picnic or outdoor walk 🌳";
  } else if (d.temperature > 27) {
    suggestion += "Nice for swimming or beach activities 🏖️";
  } else if (d.temperature < 18) {
    suggestion += "Better for a calm walk or café visit ☕";
  }

  return suggestion.trim();
}
