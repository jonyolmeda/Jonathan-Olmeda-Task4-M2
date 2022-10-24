let $tablas = document.getElementById(`contenedor-tablas`)
let upcoming;
let past;
let fechaActual;
fetch('https://amazing-events.herokuapp.com/api/events')
    .then( data => data.json())
    .then( data => {
      let eventos = data.events;
      fechaActual = data.currentDate
      upcoming = eventos.filter((objeto) => objeto.date > fechaActual);
      past = eventos.filter((objeto) => objeto.date < fechaActual);
      funcionamientoTabla1()
      //console.log(funcionamientoTabla1());
    })
.catch( err => console.log(err));



function tabla1(contenedor,e1,e2,e3) {
  contenedor.innerHTML +=`<table class="table">
  <thead class="thead-black text-bg-dark">
    <tr>
      <th>Events statistics</th>
    </tr>
  </thead>
  <tbody class="bg-light ">
    <tr>
      <td class="col-4">Events whit the highest percentage of attendance</td>
      <td class="col-4">Events whit the lowest percentage of attendance</td>
      <td class="col-4">Event whit largest capacity</td>
    </tr>
    <tr>
      <td class="col-4">${e1.name}</td>
      <td class="col-4">${e2.name}</td>
      <td class="col-4">${e3.name}</td>
    </tr>
  </tbody>
</table>`
}

function funcionamientoTabla1() {
  past.map(e => {
  e.porcentajeAsistencia = 100 * (e.assistance / e.capacity);
});
let asistenciaOrdenada = [...past].sort((e1, e2) => e1.porcentajeAsistencia - e2.porcentajeAsistencia);
let capacidadOrdenada = [...past].sort((e1, e2) => e1.capacity - e2.capacity);
let menorAsistencia = asistenciaOrdenada[0];
let mayorAsistencia = asistenciaOrdenada[asistenciaOrdenada.length - 1];
let mayorCapacidad = capacidadOrdenada[capacidadOrdenada.length - 1];
tabla1($tablas,menorAsistencia,mayorAsistencia,mayorCapacidad);
}









/* const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const valorInicial = 0;
const sumWithInitial = array1.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);
console.log(sumWithInitial); */