function getWeather() {
    const apiKey = '3f0cb5f6a2041fd74b7735ea2a677710';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching current weather:', error);
            alert('Could not fetch current weather.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => displayHourlyForecast(data.list))
        .catch(error => {
            console.error('Error fetching forecast:', error);
            alert('Could not fetch forecast data.');
        });
}

function displayWeather(data) {
    const tempDiv = document.getElementById('temp-div');
    const infoDiv = document.getElementById('weather-info');
    const icon = document.getElementById('weather-icon');
    const hourly = document.getElementById('hourly-forecast');

    // Clear previous
    tempDiv.innerHTML = '';
    infoDiv.innerHTML = '';
    hourly.innerHTML = '';

    if (data.cod === '404') {
        infoDiv.innerHTML = `<p>${data.message}</p>`;
        return;
    }

    const temp = Math.round(data.main.temp - 273.15);
    const city = data.name;
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    tempDiv.innerHTML = `<p>${temp}°C</p>`;
    infoDiv.innerHTML = `<p>${city}</p><p>${desc}</p>`;
    icon.src = iconUrl;
    icon.alt = desc;
    icon.style.display = 'block';
}

function displayHourlyForecast(hourlyData) {
    const forecast = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const time = new Date(item.dt * 1000);
        const hour = time.getHours();
        const temp = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const html = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="icon">
                <span>${temp}°C</span>
            </div>
        `;
        forecast.innerHTML += html;
    });
}
