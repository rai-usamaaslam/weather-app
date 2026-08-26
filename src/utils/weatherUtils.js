export function formatTemperature(temperature) {
  return `${Math.round(temperature)}°C`;
}

export function formatWindSpeed(speed) {
  return `${speed} m/s`;
}

export function capitalizeText(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}