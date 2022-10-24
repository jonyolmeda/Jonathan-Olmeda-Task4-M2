let contenedorTablas = document.getElementById(`contenedor-tablas`)

fetch('https://amazing-events.herokuapp.com/api/events')
    .then( data => data.json())
    .then( data => {
      let eventos = data.events;
      
    })
.catch( err => console.log(err));