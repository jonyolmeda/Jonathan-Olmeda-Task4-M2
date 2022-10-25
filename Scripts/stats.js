let $tablas1 = document.getElementById(`contenedor-tablas1`);
let $tablas2 = document.getElementById(`contenedor-tablas2`);
let $tablas3 = document.getElementById(`contenedor-tablas3`);

let upcoming;
let past;

fetch("https://mh-amazing.herokuapp.com/amazing")
  .then((data) => data.json())
  .then((data) => {
    let eventos = data.events;
    let hoy = data.date;
    upcoming = eventos.filter((objeto) => objeto.date > hoy);
    past = eventos.filter((objeto) => objeto.date < hoy);
    funcionamientoTabla1();
    estadisticas(upcoming, "estimate", $tablas2);
    estadisticas(past, "assistance", $tablas3);
  })
  .catch((err) => console.log(err));

function tabla1(contenedor, e1, e2, e3) {
  contenedor.innerHTML += `
  <tr>
  <td>${e1.name}</td> 
  <td>${e2.name}</td>
  <td>${e3.name}</td>
</tr>
`;
}

function tabla2(array, contenedor) {
  array.forEach((e) => {
    contenedor.innerHTML += `<tr>
          <td>${e.categoria}</td>
          <td>${e.ganancia}</td>
          <td>${e.promedio}</td>     
      </tr>
      `;
  });
}

function funcionamientoTabla1() {
  past.map((e) => {
    e.porcentajeAsistencia = 100 * (e.assistance / e.capacity);
  });
  let asistenciaOrdenada = [...past].sort(
    (e1, e2) => e1.porcentajeAsistencia - e2.porcentajeAsistencia
  );
  let capacidadOrdenada = [...past].sort((e1, e2) => e1.capacity - e2.capacity);
  let menorAsistencia = asistenciaOrdenada[0];
  let mayorAsistencia = asistenciaOrdenada[asistenciaOrdenada.length - 1];
  let mayorCapacidad = capacidadOrdenada[capacidadOrdenada.length - 1];
  tabla1($tablas1, menorAsistencia, mayorAsistencia, mayorCapacidad);
}

function estadisticas(fecha, propiedad, contenedor) {
  fecha.map((evento) => {
    evento.ganancia = evento[propiedad] * evento.price;
  });
  let categorias = Array.from(new Set(fecha.map((evento) => evento.category)));
  let estadisticas = categorias.map((categoria) => {
    let filtroCat = fecha.filter((evento) => evento.category === categoria);
    return sumaRetorno(filtroCat, propiedad);
  });
  tabla2(estadisticas, contenedor);
}

function sumaRetorno(array, propiedad) {
  let valorInicial = {
    categoria: "",
    ganancia: 0,
    capacity: 0,
    [propiedad]: 0,
  };
  let estadisticas = array.reduce((e1, e2) => {
    return {
      categoria: e2.category,
      ganancia: e1.ganancia + e2.ganancia,
      capacity: e1.capacity + e2.capacity,
      [propiedad]: e1[propiedad] + e2[propiedad],
    };
  }, valorInicial);
  estadisticas.promedio = (
    (100 * estadisticas[propiedad]) /
    estadisticas.capacity
  ).toFixed(2);
  return estadisticas;
}
