const map = L.map('main_map').setView([20.737066, -103.434421], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


//Request a la API a través de AJAX
$.ajax({
    //La API trae el valor como un JSONs
    dataType: "json",
    url: "api/bicicletas",
    success: function(result){
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion, {title: bici.id}).addTo(map);
        });
    }
})