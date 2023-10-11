const url = 'https://api-backend-f.onrender.com/api/registrofincas' // link de la api

const listarDatosFin = async() => {
  let respuesta = '';
  let body = document.getElementById('contenido');

  fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {"Content-type":"application/json; charset=UTF-8"}
  })
  .then((resp) => resp.json())
  .then(function(data){
      let listaFincas = data.registrarFincas;
      return listaFincas.map(function(fincas){

          respuesta += `<tr><td>${fincas.nombre}</td>` +
              `<td>${fincas.area}</td>` +
              `<td>${fincas.valor}</td>` +
              `<td>${fincas.cultivos}</td>` +
              `<td><a class="waves-effect waves-light btn orange" href="editarCita.html"><i class="material-icons left">create</i>Editar</a>` +
              ` <button id="btnEliminar" class="btn red waves-effect waves-light" onclick='eliminar("${fincas._id}")' type="button" name="action">Eliminar
              <i class="material-icons left">delete</i></button>                  
              </td></tr>`;
          body.innerHTML = respuesta;
      })
  });
}

const registrarFinc = async () => {
  let _nombre = document.getElementById('nombre').value;
  let _area = document.getElementById('area').value;
  let _valor = document.getElementById('valor').value;
  let _cultivos = document.getElementById('cultivos').value;


// Validación de campos vacíos
if (
  _nombre.trim() === '' ||
  _area.trim() === '' ||
  _valor.trim() === '' ||
  _cultivos.trim() === ''
) {
    Swal.fire(
      'Por favor, complete todos los campos',
      '',
      'error'
      );
    return;
  }   
  // Validación del nombre
  if (!/^[A-Za-z\s]+$/.test(_nombre)) {
    Swal.fire(
      'El nombre solo debe contener letras y espacios',
      '',
      'error'
    );
    return;
  }

  // Validación del area
  if (!/^[a-zA-Z0-9_]{3,16}$/.test(_area)) {
    Swal.fire(
      'El apellido solo debe contener letras y numeros',
      '',
      'error'
    );
    return;
  }


  // Validación del area
  if (!/^\d+$/.test(_valor)) {
    Swal.fire(
      'El campo debe contener solo caracteres numéricos.',
      '',
      'error'
    );
    return;
  }

  // Validación de la hora
  if (!/^[A-Za-z\s]+$/.test(_cultivos)) {
    Swal.fire(
      'El campo debe contener solo letras y espacios.',
      '',
      'error'
    );
    return;

  }
  let finca ={
    nombre: _nombre,
    area: _area,
    valor: _valor,
    cultivos: _cultivos,  
  }

  fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(finca),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(json => {
      Swal.fire(
        json.msg,
        '',
        'success'
      );
    })
    .then(() => {
      setTimeout(() => {
        window.location.href = "listarFincas.html";
      }, 4000);
    })
    .catch(error => {
      Swal.fire(
        'Error al registrar la finca',
        '',
        'error'
      );
    });
}

// ACTUALIZAR DATOS
const actualizar = async () => {
  let _id = ''; // Obtén el ID de la el registro que deseas editar

  // Obtener los elementos del formulario
  let _nombre = document.getElementById('nombre').value;
  let _area = document.getElementById('area').value;
  let _valor = document.getElementById('valor').value;
  let _cultivos = document.getElementById('cultivos').value;


  // let fechaISO = new Date(_fecha).toISOString().split('T')[0];

  // Validación de campos vacíos
  if (
    _nombre.trim() === '' ||
    _area.trim() === '' ||
    _valor.trim() === '' ||
    _cultivos.trim() === '' 
  ) {
    Swal.fire(
      'Por favor, complete todos los campos',
      '',
      'error'
    );
    return;
  }

  // Validación del nombre
  if (!/^[A-Za-z\s]+$/.test(_nombre)) {
    Swal.fire(
      'El nombre solo debe contener letras y espacios',
      '',
      'error'
    );
    return;
  }

  // Validación del area
  if (!/^[a-zA-Z0-9_]{3,16}$/.test(_area)) {
    Swal.fire(
      'El apellido solo debe contener letras y numeros',
      '',
      'error'
    );
    return;
  }


  // Validación del valor
  if (!/^[A-Za-z\s]+$/.test(_valor)) {
    Swal.fire(
      'el campo debe tener solo caracteres numéricos.',
      '',
      'error'
    );
    return;
  }

  // Validación del campo cultivos
  if (!/^[A-Za-z\s]+$/.test(_cultivos)) {
    Swal.fire(
      'el campo debe contener letras.',
      '',
      'error'
    );
    return;
  }

  let finca ={
    nombre: _nombre,
    area: _area,
    valor: _valor,
    cultivos: _cultivos,  
  }

  // Realizar la solicitud PUT para actualizar el registro
  fetch(`${url}/${_id}`, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(finca),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(json => {
      Swal.fire(
        json.msg,
        '',
        'success'
      );
    })
    .then(()=>{
      setTimeout(()=>{
        window.location.href = "listarFincas.html";
      },3000);
     })
    .catch(error => {
      Swal.fire(
        '¡Error al actualizar el registro de finca!',
        '',
        'error'
      );
    });
}

const eliminar = (_id) => {
  Swal.fire({
    title: 'Esta seguro de realizar la eliminacion',
  
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No'

  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url + "/?_id="+_id, {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      })
        .then((resp) => resp.json())
        .then(json => {
          console.log(json.msg)
          Swal.fire('Eliminacion exitosa', json.msg, 'success');
        })
        .then(()=>{
          setTimeout(()=>{
            window.location.href = "listarFincas.html";
          },3000);
         })
        .catch(error => {
          alert(error.message)
          Swal.fire('Error en la eliminacion', error.message, 'error');
        });
    }
  });
};

if (document.querySelector('#btnRegistrar')) {
  document.querySelector('#btnRegistrar').addEventListener('click', registrarFinc);
}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar').addEventListener('click', actualizar)
}