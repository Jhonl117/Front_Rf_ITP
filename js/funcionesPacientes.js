const url = 'https://api-fincas-pacientes.onrender.com/api/tempPacientes' // link de la api

const listarDatosPaci = async () => {
  let respuesta = '';
  let body = document.getElementById('contenido');

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listaPacientes = data.registrarPacientes;
      return listaPacientes.map(function (pacientes) {
        
        respuesta += `<tr><td>${pacientes.documento}</td>` +
          `<td>${pacientes.nombres}</td>` +
          `<td>${pacientes.apellidos}</td>` +
          `<td>${pacientes.fecha}</td>` +
          `<td>${pacientes.hora}</td>` +
          `<td>${pacientes.temperatura}</td>` +
          `<td><a class="waves-effect waves-light btn orange" href="editarRpaciente.html?id=${pacientes._id}&documento=${pacientes.documento}&nombres=${pacientes.nombres}&apellidos=${pacientes.apellidos}&fecha=${pacientes.fecha}&hora=${pacientes.hora}&temperatura=${pacientes.temperatura}"><i class="material-icons left">create</i>Editar</a>` +
          ` <button id="btnEliminar" class="btn red waves-effect waves-light" onclick='eliminar("${pacientes._id}")' type="button" name="action">Eliminar
         <i class="material-icons left">delete</i></button>                  
         </td></tr>`;
        body.innerHTML = respuesta;

      })
    });
}

const registrarPaci = async () => {
  let _documento = document.getElementById('documento').value;
  let _nombres = document.getElementById('nombres').value;
  let _apellidos = document.getElementById('apellidos').value;
  let _fecha = document.getElementById('fecha').value;
  let _hora = document.getElementById('hora').value;
  let _temperatura = document.getElementById('temperatura').value;



  // Validación de campos vacíos
  if (
    _documento.trim() === '' ||
    _nombres.trim() === '' ||
    _apellidos.trim() === '' ||
    _fecha.trim() === '' ||
    _hora.trim() === '' ||
    _temperatura.trim() === ''

  ) {
    Swal.fire(
      'Por favor, complete todos los campos',
      '',
      'error'
    );
    return;
  } 

  
  let paciente = {
    documento: _documento,
    nombres: _nombres,
    apellidos: _apellidos,
    fecha: _fecha,
    hora: _hora,
    temperatura: _temperatura,
  }

  fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(paciente),
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
        window.location.href = "listarPacientes.html";
      }, 4000);
    })
    .catch(error => {
      Swal.fire(
        'Error al registrar a el Paciente',
        '',
        'error'
      );
    });
}  

// ACTUALIZAR DATOS
const actualizar = async () => {
  let _id = document.getElementById('id').value; // Obtén el ID de la el registro que deseas editar
  let _documento = document.getElementById('documento').value;
  let _nombres = document.getElementById('nombres').value;
  let _apellidos = document.getElementById('valor').value;
  let _fecha = document.getElementById('fecha').value;
  let _hora = document.getElementById('hora').value;
  let _temperatura = document.getElementById('temperatura').value;

  if (
    _id.trim() === '' ||
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

  let paciente = {
    _id: _id,
    documento: _documento,
    nombres: _nombres,
    apellidos: _apellidos,
    fecha: _fecha,
    hora: _hora,
    temperatura: _temperatura
  }

  // Realizar la solicitud PUT para actualizar el registro
  fetch(url, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(paciente),
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
        window.location.href = "listarPacientes.html";
      }, 3000);
    })
    .catch(error => {
      Swal.fire(
        '¡Error al actualizar el registro del Paciente!',
        '',
        'error'
      );
    });
}

const eliminar = (_id) => {
  let paciente = {
    _id: _id,
  };
  Swal.fire({
    title: 'Esta seguro de realizar la eliminacion',

    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No'

  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify(paciente),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      })
        .then((resp) => resp.json())
        .then(json => {
          console.log(json.msg)
          Swal.fire('Eliminacion exitosa', json.msg, 'success');
        })
        .then(() => {
          setTimeout(() => {
            window.location.href = "listarPacientes.html";
          }, 3000);
        })
        .catch(error => {
          alert(error.message)
          Swal.fire('Error en la eliminacion', error.message, 'error');
        });
    }
  });
};

if (document.querySelector('#btnRegistrar')) {
  document.querySelector('#btnRegistrar').addEventListener('click', registrarPaci);
}

if (document.querySelector('#btnActualizar')) {
  document.querySelector('#btnActualizar').addEventListener('click', actualizar);
}