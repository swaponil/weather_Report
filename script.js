function getWeather() {
    const apiKey = '3f0cb5f6a2041fd74b7735ea2a677710';
    const city = document.getElementById('city').value.trim();

    if (!city) {
        alert('Please enter a city');
        return;
    }

    // Optional: Add CORS proxy for GitHub Pages
    const proxy = 'https://corsproxy.io/?'; // lightweight free CORS bypass
    const currentWeatherUrl = `${proxy}https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `${proxy}https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Current Weather Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            console.error(error);
            alert('Could not fetch current weather.');
        });

    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Forecast Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayHourlyForecast(data.list))
        .catch(error => {
            console.error(error);
            alert('Could not fetch forecast data.');
        });
}
