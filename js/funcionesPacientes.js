const url = 'https://api-backend-f.onrender.com/api/registrofincas' // link de la api

const listarDatosPaci = async() => {
  let respuesta = '';
  let body = document.getElementById('contenido');

  fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {"Content-type":"application/json; charset=UTF-8"}
  })
  .then((resp) => resp.json())
  .then(function(data){
      let listaPacientes = data.pacientes;
      return listaPacientes.map(function(pacientes){
        // Obtener solo la fecha en formato local
        let fecha = new Date(citas.fecha).toLocaleDateString();

          respuesta += `<tr><td>${pacientes.documento}</td>` +
              `<td>${pacientes.nombres}</td>` +
              `<td>${pacientes.apellidos}</td>` +
              `<td>${fecha}</td>` +
              `<td>${pacientes.hora}</td>` +
              `<td>${pacientes.temperatura}</td>` +
              `<td><a class="waves-effect waves-light btn orange" href="editarCita.html"><i class="material-icons left">create</i>Editar</a>` +
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
  let _temperatura = document.getElementById('vtemperatura').value;
  


// Validación de campos vacíos
if (
  _documento.trim() === '' ||
  _nombres.trim() === '' ||
  _apellidos.trim() === '' ||
  _fecha.trim() === ''  ||
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
// Validación del nombre
if (!/^[A-Za-z\s]+$/.test(_documento)) {
  Swal.fire(
    'El documento solo debe contener letras y espacios',
    '',
    'error'
  );
  return;
}

// Validación del apellido
if (!/^[A-Za-z\s]+$/.test(_apellidos)) {
  Swal.fire(
    'El apellido solo debe contener letras y espacios',
    '',
    'error'
  );
  return;
}

// Validación de la fecha
if (new Date(_fecha) < new Date()) {
  Swal.fire(
    'La fecha no puede ser anterior a la fecha actual',
    '',
    'error'
  );
  return;
}

// Validación de la hora
if (!/^\d{2}:\d{2}$/.test(_hora)) {
  Swal.fire(
    'El formato de hora debe ser HH:MM',
    '',
    'error'
  );
  return;
}

// Validación de la temperatura
if (!/^\d+(\.\d{1,2})?$/.test(_temperatura)) {
  Swal.fire(
    'La temperatura debe ser un número con hasta 2 decimales',
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
    body: JSON.strinigfy(paciente),
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
  let _id = ''; // Obtén el ID de la el registro que deseas editar

  // Obtener los elementos del formulario
  let _documento = document.getElementById('documento').value;
  let _nombres = document.getElementById('nombres').value;
  let _apellidos = document.getElementById('valor').value;
  let _fecha = document.getElementById('fecha').value;
  let _hora = document.getElementById('hora').value;
  let _temperatura = document.getElementById('temperatura').value;


  // let fechaISO = new Date(_fecha).toISOString().split('T')[0];

  // Validación de campos vacíos
  if (
    _documento.trim() === '' ||
    _nombres.trim() === '' ||
    _apellidos.trim() === '' ||
    _fecha.trim() === ''  ||
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

// Validación del nombre
if (!/^[A-Za-z\s]+$/.test(_documento)) {
    Swal.fire(
      'El documento solo debe contener letras y espacios',
      '',
      'error'
    );
    return;
  }
  
  // Validación del apellido
  if (!/^[A-Za-z\s]+$/.test(_apellidos)) {
    Swal.fire(
      'El apellido solo debe contener letras y espacios',
      '',
      'error'
    );
    return;
  }
  
  // Validación de la fecha
  if (new Date(_fecha) < new Date()) {
    Swal.fire(
      'La fecha no puede ser anterior a la fecha actual',
      '',
      'error'
    );
    return;
  }
  
  // Validación de la hora
  if (!/^\d{2}:\d{2}$/.test(_hora)) {
    Swal.fire(
      'El formato de hora debe ser HH:MM',
      '',
      'error'
    );
    return;
  }
  
  // Validación de la temperatura
  if (!/^\d+(\.\d{1,2})?$/.test(_temperatura)) {
    Swal.fire(
      'La temperatura debe ser un número con hasta 2 decimales',
      '',
      'error'
    );
    return;
  }


  // Realizar la solicitud PUT para actualizar el registro
  fetch(`${url}/${_id}`, {
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
    .then(()=>{
      setTimeout(()=>{
        window.location.href = "listarPacientes.html";
      },3000);
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
            window.location.href = "listarPacientes.html";
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
  document.querySelector('#btnRegistrar').addEventListener('click', registrarPaci );
}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar').addEventListener('click', actualizar);
}