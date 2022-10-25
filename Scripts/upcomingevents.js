const $tarjetas = document.getElementById("contenedor");
const $input = document.getElementById("input-texto");
const $checkbox = document.getElementById(`checkbox`);

let upcoming;
let hoy;
let eventos;
fetch("https://mh-amazing.herokuapp.com/amazing")
  .then((data) => data.json())
  .then((data) => {
    eventos = data.events;
    hoy = data.date;
    upcoming = eventos.filter((e) => e.date > hoy);
    crearCheckbox(upcoming, $checkbox);
    imprimirTarjetas(upcoming, $tarjetas);
    $input.addEventListener(`keyup`, filtro);
    $checkbox.addEventListener(`change`, filtro);
  })
  .catch((err) => console.log(err));

function crearCheckbox(array, contenedor) {
  let fn = (e) => e.category;
  let categorias = new Set(array.filter(fn).map(fn));
  categorias.forEach((param) => {
    contenedor.innerHTML += `<div class="form-check form-check-inline" id="checkbox">
    <input class="form-check-input" type="checkbox" id="${param}" value="${param}">
    <label class="form-check-label text-light" for="${param}">${param}</label>
  </div>`;
  });
}

function crearTajeta(array) {
  let div = document.createElement(`DIV`);
  div.classList = "card col-3 bg-black";
  div.innerHTML += `
      <div class="card-body">
          <p class="card-text text-light">${array.name}</p>
      </div>
      <img src="${array.image}" alt="Imagen de ${array.name}">
      <div class="card-body">
          <p class="card-text text-light">${array.description}t.</p>
          <p class="card-text text-light">Price: $${array.price}</p>
      </div>
      <a href="details.html?id=${array.id}" class="btn btn-danger">Details</a>
  </div>
`;
  return div;
}

function imprimirTarjetas(array, contenedor) {
  contenedor.innerHTML = ``;
  if (array.length > 0) {
    let fragment = document.createDocumentFragment();
    array.forEach((e) => fragment.appendChild(crearTajeta(e)));
    contenedor.appendChild(fragment);
  } else {
    contenedor.innerHTML = `<h2  class="text-muted fs-4 fw-bold">Lo sentimos, no hay coincidencias</h2>`;
  }
}

function filtro() {
  let checked = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((e) => e.value);
  let eventosfiltrados = upcoming.filter(
    (e) => checked.includes(e.category) || checked.length == 0
  );
  let filtradosPorInput = eventosfiltrados.filter((valor) =>
    valor.name.toLowerCase().includes($input.value.toLowerCase())
  );
  imprimirTarjetas(filtradosPorInput, $tarjetas);
}
