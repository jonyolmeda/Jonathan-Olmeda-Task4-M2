const tarjetas = document.getElementById("contenedor"); 
const input = document.getElementById("input-texto");
const checkbox = document.getElementById(`checkbox`);

//Cree una función para imprimir las tarjetas en la página Home.
function imprimir(array, contenedor) {
  array.forEach((e) => {
    contenedor.innerHTML += `
  <div class="card col-3 bg-black">
      <div class="card-body">
          <p class="card-text text-light">${e.name}</p>
      </div>
      <img src="${e.image}" alt="${e.name}">
      <div class="card-body">
          <p class="card-text text-light">${e.description}t.</p>
          <p class="card-text text-light">Price: $${e.price}</p>
      </div>
      <a href="details.html?id=${e._id}" class="btn btn-danger">Details</a>
  </div>
`;
  });
}
imprimir(events, tarjetas);
//Función creada para arrojar un mensaje cuando no existe coincidencia.

function noCoincide(array, contenedor) {
  if (array <= 0) {
    contenedor.innerHTML = `
    <h2 class="text-muted fs-4 fw-bold">No hay coincidencias</h2>
    `;
  }
}
//      INPUT
//Por medio del .filter filtro los nombres de los eventos y los comparo; las coincidencias se guardan en elementosFiltrados.
//Vacio el contenedor para no guardar o pisar tarjetas ya existentes; si no hay coincidencias no da el cartel de la fn noCoincide;
//En última instancia se imprimen las coincidencias.

input.addEventListener(`keyup`, (e) => {
  elementosFiltrados = events.filter((nombres) =>
    nombres.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  tarjetas.innerHTML = "";
  noCoincide(elementosFiltrados, tarjetas);
  imprimir(elementosFiltrados, tarjetas);
});

//      CHECKBOX
// A la variable categoria le construí un array con el .from para poder tener en un array los categorias
//así después la podía recorrer con el .forEach e imprimir los checkbox con sus categorias.

let categorias = new Set(events.map((objeto) => objeto.category));

categorias.forEach((e) => {
  checkbox.innerHTML += `
    <div class="form-check form-check-inline" id="checkbox">
      <input class="form-check-input" type="checkbox" id="${e}" value="${e}">
      <label class="form-check-label text-light" for="inlineCheckbox1">${e}</label>
    </div>
  `;
});

//A continuación creé un array vacio para guardar el estado de los checkbox; cada vez que el checkbox cambie
//Va a ejecutar (o no) las acciones dentro de las llaves.

let listaChequeada = [];

checkbox.addEventListener(`change`, (e) => {
  if (e.target.checked) {
    let categoriaCheckbox = e.target.id.toLowerCase()
    listaChequeada = listaChequeada.concat(
      events.filter((evento) =>
        evento.category.toLowerCase().includes(categoriaCheckbox)
      )
    );
    tarjetas.innerHTML = "";
    imprimir(listaChequeada, tarjetas);

//Junté cada coincidencia con el .concat, extraigo la categoria en minuscula y busco si hay coincidencia entre el Id
//(también en munúscula) y las categorias recorridas en events; en cada cambio de evento (change) se limpia el contenedor de tarjetas.
//El último paso se ejcuta la fn (que tiene como argumento el array filtrado y el contenedor de tarjetas).

  } else if (!e.target.checked) {
    listaChequeada = listaChequeada.filter(
      (evento) =>
        !evento.category.toLowerCase().includes(categoriaCheckbox)
    );
    tarjetas.innerHTML = "";
    imprimir(listaChequeada, tarjetas);
  }

//Cuando se "descheckea" se ejecuta el else if, se filtra los que no coincidan con el Id.

//Si la longitud del array es 0 se reimprimen todas las tarjetas.

  if (listaChequeada.length === 0) {
    imprimir(events, tarjetas);
  }
});
