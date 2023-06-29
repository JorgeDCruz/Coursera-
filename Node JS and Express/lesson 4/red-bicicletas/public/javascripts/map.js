const map = L.map('main_map').setView([20.737066, -103.434421], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Marcadores en el mapa
L.marker([20.737066, -103.434421]).addTo(map);
L.marker([20.739, -103.434431]).addTo(map);