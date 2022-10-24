const tarjetaDetails = document.getElementById(`tarjeta-details`);

function impTarjetaDetails(array, contenedor) {
    contenedor.innerHTML = `
      <div class="container d-flex justify-content-between gap-5">
    <img class="imagen col-5" src="${array.image}" alt="${array.name}">
    <div class="text-light">
      <p>Name: ${array.name}</p>
      <p>Date: ${array.date}
      <p>Description: ${array.description}</p>
      <p>Category: ${array.category}</p>
      <p>Place: ${array.place}</p>
      <p>Capacity: ${array.capacity}</p>
      <p>Estimate: ${array.estimate}</p>
      <p>Assistance: ${array.assistance}</p>
      <p>Price: $${array.price}</p>
    </div>
  </div>
  `;
  };

let fecha
let eventos;
fetch('https://mind-hub.up.railway.app/amazing')
    .then( data => data.json())
    .then( data => {
      fecha = data.date
      eventos = data.events;
      infoEventos()
    })
.catch( err => console.log(err));

function infoEventos() {
  let arrFiltro = [];
  let id = location.search.slice(4);
  arrFiltro = eventos.find(element => element.id === id);
 if (arrFiltro.date < fecha) {
  impTarjetaDetails(arrFiltro, tarjetaDetails);
 }else{
  impTarjetaDetails(arrFiltro, tarjetaDetails);
}
}
