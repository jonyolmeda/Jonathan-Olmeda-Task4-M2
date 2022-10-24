const $tarjetas = document.getElementById("contenedor");
const $input = document.getElementById("input-texto");
const $checkbox = document.getElementById(`checkbox`);

let eventos;
fetch('https://amazing-events.herokuapp.com/api/events')
    .then( data => data.json())
    .then( data => {
      eventos = data.events;
      crearCheckbox(eventos, $checkbox)
    })
.catch( err => console.log(err));


function crearCheckbox(array, contenedor) {
  let fn = e => e.category
  let categorias = new Set(array.filter(fn).map(fn))
  categorias.forEach(param => { $checkbox.innerHTML +=
    `<div class="form-check form-check-inline" id="checkbox">
    <input class="form-check-input" type="checkbox" id="${param}" value="${param}">
    <label class="form-check-label text-light" for="${param}">${param}</label>
  </div>`
  })
}

 function crearTajeta(array) {

  let div = document.createElement(`DIV`)
  div.classList = "card col-3 bg-black"
  div.innerHTML = `
      <div class="card-body">
          <p class="card-text text-light">${array.name}</p>
      </div>
      <img src="${array.image}" alt="Imagen de ${array.name}">
      <div class="card-body">
          <p class="card-text text-light">${e.description}t.</p>
          <p class="card-text text-light">Price: $${array.price}</p>
      </div>
      <a href="details.html?id=${array._id}" class="btn btn-danger">Details</a>
  </div>
`
return div
 }

function imprimrTarjetas(array, contenedor) {
  let fragment = document.createDocumentFragment()
  array.forEach(evento => fragment.appendChild(crearTajeta(evento)))
  contenedor.appendChild(fragment)
}




/* function noCoincide(array, contenedor) {
  if (array <= 0) {
    contenedor.innerHTML = `
    <h2 class="text-muted fs-4 fw-bold">Lo sentimos, no hay coincidencias</h2>
    `;
  }
}

input.addEventListener(`keyup`, (e) => {
  let textoIngresado = e.target.value.toLowerCase()
  elementosFiltrados = events.filter((nombres) =>
    nombres.name.toLowerCase().includes(textoIngresado)
  );
  tarjetas.innerHTML = "";
  noCoincide(elementosFiltrados, tarjetas);
  imprimir(elementosFiltrados, tarjetas);
});

let categorias = new Set(events.map((objeto) => objeto.category));

categorias.forEach((e) => {
  checkbox.innerHTML += `
    <div class="form-check form-check-inline" id="checkbox">
      <input class="form-check-input" type="checkbox" id="${e}" value="${e}">
      <label class="form-check-label text-light" for="inlineCheckbox1">${e}</label>
    </div>
  `;
});

let listaChequeada = [];

checkbox.addEventListener(`change`, (e) => {
  if (e.target.checked) {
    listaChequeada = listaChequeada.concat(
      events.filter((evento) =>
        evento.category.toLowerCase().includes(e.target.id.toLowerCase())
      )
    );
    tarjetas.innerHTML = "";
    imprimir(listaChequeada, tarjetas);
  } else if (!e.target.checked) {
    listaChequeada = listaChequeada.filter(
      (evento) => !evento.category.toLowerCase().includes(e.target.id.toLowerCase())
    );
    tarjetas.innerHTML = "";
    imprimir(listaChequeada, tarjetas);
  }
  if (listaChequeada.length === 0) {
    imprimir(events, tarjetas);
  }
});
 */