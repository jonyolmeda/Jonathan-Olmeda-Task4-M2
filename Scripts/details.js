//Asigne la variable al elemto que traigo de HTML.

const tarjetaDetails = document.getElementById(`tarjeta-details`);

//Cree una función para imprimir la tarjeta en la página Details.

function impTarjetaDetails(array, contenedor) {
  array.forEach((e) => {
    contenedor.innerHTML = `
      <div class="container d-flex justify-content-between gap-5">
    <img class="imagen col-5" src="${e.image}" alt="${e.name}">
    <div class="text-light">
      <p>Name: ${e.name}</p>
      <p>Date: ${e.date}
      <p>Description: ${e.description}</p>
      <p>Category: ${e.category}</p>
      <p>Place: ${e.place}</p>
      <p>Capacity: ${e.capacity}</p>
      <p>Estimate: ${e.estimate}</p>
      <p>Assistance: ${e.assistance}</p>
      <p>Price: $${e.price}</p>
    </div>
  </div>
  `;
  });
}

let eventos;
fetch('https://amazing-events.herokuapp.com/api/events')
    .then( data => data.json())
    .then( data => {
      fecha = data.currentDate
      eventos = data.events;
      infoEventos()
    })
.catch( err => console.log(err));


function infoEventos() {
  let eventos = [];
  let id = parseInt(location.search.slice(4));

  eventos = events.filter(element => element._id === id);
 if (eventos.date < fecha) {
  impTarjetaDetails(eventos, tarjetaDetails);
 }else{
  impTarjetaDetails(eventos, tarjetaDetails);
}
}

infoEventos();
