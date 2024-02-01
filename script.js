document.addEventListener("DOMContentLoaded", function() {
  let formulario = document.getElementById("formulario");
  

  formulario.addEventListener("submit", async function(event) {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;     //NOMBRE COMPLETO
    let fecha = document.getElementById("fecha").value;       //FECHA
    let entrada = document.getElementById("entrada").value;   //HORA DE ENTRADA 1
    let salida = document.getElementById("salida").value;     //HORA DE SALIDA 1
    let entrada2 = document.getElementById("entrada2").value; //HORA DE ENTRADA 2
    let salida2 = document.getElementById("salida2").value;   //HORA DE SALIDA 2
    let horas1 = calcularHorasTotales1(entrada, salida);      //HORAS TOTALES 1
    let horas2 = calcularHorasTotales2(entrada2, salida2);    //HORAS TOTALES 2
    let horasTotales = sumarHorasTotales(horas1, horas2);    //HORAS TOTALES

    

//-----------------------------HORAS TOTALES EN PRIMERA JORNADA----------------------------------------------------------//

function calcularHorasTotales1(entrada, salida) {
      
    let entradaHora = parseInt(entrada.split(":")[0]);
    let entradaMinutos = parseInt(entrada.split(":")[1]);
    let salidaHora = parseInt(salida.split(":")[0]);
    let salidaMinutos = parseInt(salida.split(":")[1]);
    
    
   if (salidaHora < entradaHora) {
      salidaHora += 24;   // aca si la hora de salida es menonr que la de entrada se le agrega 24
    }
    
   let horasTotales = salidaHora - entradaHora;
    let minutosTotales = salidaMinutos - entradaMinutos;
    
      if (minutosTotales < 0) {
        horasTotales--; //si el nuero total de minutos es menor que 0, entonces se debe restar 1 al num total de horas y agregar 60 al num total de min no se si me explico xd
        minutosTotales += 60;
      }
      
      return `${horasTotales.toString().padStart(2, '0')}:${minutosTotales.toString().padStart(2, '0')}`; //pad start agrega 0 si es necesario, toString pa convertir en chain 
    }
//-----------------------------HORAS TOTALES EN SEGUNDA JORNADA----------------------------------------------------------//

function calcularHorasTotales2(entrada2, salida2) {
    let entradaHora2 = parseInt(entrada2.split(":")[0]);
    let entradaMinutos2 = parseInt(entrada2.split(":")[1]);
    let salidaHora2 = parseInt(salida2.split(":")[0]);
    let salidaMinutos2 = parseInt(salida2.split(":")[1]);
    if (salidaHora2 < entradaHora2) {
      salidaHora2 += 24;
    }                                                   //aca como puedes ver es copypaste, misma logica que la fun anterior
    let horasTotales2 = salidaHora2 - entradaHora2;
    let minutosTotales2 = salidaMinutos2 - entradaMinutos2;
    if (minutosTotales2 < 0) {
      horasTotales2--;
      minutosTotales2 += 60;
    }
    return `${horasTotales2.toString().padStart(2, '0')}:${minutosTotales2.toString().padStart(2, '0')}`;
    }
    
//-------------------------------------------------HORAS TOTALES DE PRIMERA Y SEGUNDA JORNADA--------------------------------------//

function sumarHorasTotales(horas1, horas2) {
  let horas1Horas = parseInt(horas1.split(":")[0]);
  let horas1Minutos = parseInt(horas1.split(":")[1]);  
  let horas2Horas = parseInt(horas2.split(":")[0]);
  let horas2Minutos = parseInt(horas2.split(":")[1]);
  
  let minutosTotales = horas1Minutos + horas2Minutos;
  let horasTotales = horas1Horas + horas2Horas; 

  // Ajustar si los minutos superan 59
  if (minutosTotales >= 60) {
      horasTotales += Math.floor(minutosTotales / 60);
      minutosTotales %= 60;
  }

  return `${horasTotales.toString().padStart(2, '0')}:${minutosTotales.toString().padStart(2, '0')}`;
}

//-------------------------------CALCULAR HORAS EXTRAS--------------------------------------------------------//


function calcularHorasExtras(horasTotales) {
  let horasNormales = 8;  
  let horasExtras = "00:00"; 
  
  let horasTotalesHoras = parseInt(horasTotales.split(":")[0]);
  let horasTotalesMinutos = parseInt(horasTotales.split(":")[1]);

  if (horasTotalesHoras > horasNormales || (horasTotalesHoras === horasNormales && horasTotalesMinutos > 0)) {
      let horasExtrasHoras = horasTotalesHoras - horasNormales;
      let horasExtrasMinutos = horasTotalesMinutos;

      horasExtras = `${horasExtrasHoras.toString().padStart(2, '0')}:${horasExtrasMinutos.toString().padStart(2, '0')}`;
  }
  
  return horasExtras;
}

let horasExtras = calcularHorasExtras(horasTotales);

console.log("Horas Extras:", horasExtras);

//---------------------------------------------------------------------------------------------------------------------

//-------------------------HORAS NOCTURNAS---------------------------------------------------------
  
function calcularHorasNocturnas(salida2) {
  const horaLimiteNocturna = "22:00";

  //Manejo de error salida2 antes de las 22:00
  if (salida2 > "08:00" && salida2 < "22:00") {
    return "00:00";
  }
  //Manejo Error totales/nocturnas
  if(horasTotales < "00:01") {
    return "00:00"
  }

  let salida2Hora = parseInt(salida2.split(":")[0]);
  let salida2Minutos = parseInt(salida2.split(":")[1]);

  let horaLimiteNocturnaHora = parseInt(horaLimiteNocturna.split(":")[0]);
  let horaLimiteNocturnaMinutos = parseInt(horaLimiteNocturna.split(":")[1]);

  // Convertir la hora límite nocturna a minutos
  let limiteNocturnaEnMinutos = horaLimiteNocturnaHora * 60 + horaLimiteNocturnaMinutos;

  // Convertir la hora de salida2 a minutos
  let salida2EnMinutos = salida2Hora * 60 + salida2Minutos;

  // Calcular las horas nocturnas restando la hora límite nocturna a la salida2
  let horasNocturnasEnMinutos = salida2EnMinutos - limiteNocturnaEnMinutos;

  // Ajustar si las horas son negativas (después de las 23:59)
  if (horasNocturnasEnMinutos < 0) {
    horasNocturnasEnMinutos += 24 * 60; // Sumar 24 horas en minutos
  }

  // Calcular las horas y minutos
  let horasNocturnasHoras = Math.floor(horasNocturnasEnMinutos / 60);
  let horasNocturnasMinutos = horasNocturnasEnMinutos % 60;

  return `${horasNocturnasHoras.toString().padStart(2, '0')}:${horasNocturnasMinutos.toString().padStart(2, '0')}`;
}

let horasNocturnas = calcularHorasNocturnas(salida2);
console.log("Horas Nocturnas:", horasNocturnas);

//---------------------------------------------------------------------------------------------------------------------

//---------------------HORAS EXTRAS NORMALES---------------------------------------------------------------- 

// Función para calcular las horas extras normales
function calcularHorasExtrasNormales(horasExtras, horasNocturnas) {
  // Parsear las horas y minutos de horasExtras y horasNocturnas
  let horasExtrasHoras = parseInt(horasExtras.split(":")[0]);
  let horasExtrasMinutos = parseInt(horasExtras.split(":")[1]);
  let horasNocturnasHoras = parseInt(horasNocturnas.split(":")[0]);
  let horasNocturnasMinutos = parseInt(horasNocturnas.split(":")[1]);

  // Restar las horas nocturnas de las horas extras
  let horasExtrasNormalesHoras = horasExtrasHoras - horasNocturnasHoras;
  let horasExtrasNormalesMinutos = horasExtrasMinutos - horasNocturnasMinutos;

  // Ajustar si los minutos son negativos
  if (horasExtrasNormalesMinutos < 0) {
    horasExtrasNormalesHoras--;
    horasExtrasNormalesMinutos += 60;
  }

  // Ajustar si las horas son negativas
  if (horasExtrasNormalesHoras < 0) {
    horasExtrasNormalesHoras = 0;
    horasExtrasNormalesMinutos = 0;
  }

  return `${horasExtrasNormalesHoras.toString().padStart(2, '0')}:${horasExtrasNormalesMinutos.toString().padStart(2, '0')}`;
}
let horasExtrasNormales = calcularHorasExtrasNormales(horasExtras, horasNocturnas);
console.log("Horas Extras Normales:", horasExtrasNormales);


//---------------------------------------------------------------------------------------------------------------------
//-------------------------HORAS EXTRAS NOCTURNAS------------------------------------------------------------------
// Función para calcular las horas extras nocturnas
function calcularHorasExtrasNocturnas(horasExtras, horasExtrasNormales) {
  // Parsear las horas y minutos de horasExtras y horasExtrasNormales
  let horasExtrasHoras = parseInt(horasExtras.split(":")[0]);
  let horasExtrasMinutos = parseInt(horasExtras.split(":")[1]);
  let horasExtrasNormalesHoras = parseInt(horasExtrasNormales.split(":")[0]);
  let horasExtrasNormalesMinutos = parseInt(horasExtrasNormales.split(":")[1]);

  // Restar las horas extras normales de las horas extras
  let horasExtrasNocturnasHoras = horasExtrasHoras - horasExtrasNormalesHoras;
  let horasExtrasNocturnasMinutos = horasExtrasMinutos - horasExtrasNormalesMinutos;

  // Ajustar si los minutos son negativos
  if (horasExtrasNocturnasMinutos < 0) {
    horasExtrasNocturnasHoras--;
    horasExtrasNocturnasMinutos += 60;
  }

  // Ajustar si las horas son negativas
  if (horasExtrasNocturnasHoras < 0) {
    horasExtrasNocturnasHoras = 0;
    horasExtrasNocturnasMinutos = 0;
  }

  return `${horasExtrasNocturnasHoras.toString().padStart(2, '0')}:${horasExtrasNocturnasMinutos.toString().padStart(2, '0')}`;
}

// Ejemplo de uso
let horasExtrasNocturnas = calcularHorasExtrasNocturnas(horasExtras, horasExtrasNormales);
console.log("Horas Extras Nocturnas:", horasExtrasNocturnas);
//-----------------------------------------------------------------------------------------------------------

//-------------------------------------ELIMINAR TODA LA TABLA-------------------------------------------------

let deleteAll = document.getElementById('allDelete');

// Agregar evento click al botón de eliminar todo
deleteAll.addEventListener('click', function() {
  // Mostrar SweetAlert para confirmar la eliminación
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará todo el contenido. ¿Quieres continuar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#1aa839',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar todo',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    // Si el usuario confirma, recargar la página
    if (result.isConfirmed) {
      // Recargar la página
      location.reload();
    }
  });
});
//-----------------------------------------------------------------------------------------------------------


      //AGREGAR A LA TABLA LO ENVIADO EN EL FORMULARIO Y MOSTRAR CALCULOS
      let tabla = document.getElementById("listaRegistros");
      let nuevaFila = document.createElement('tr');
      
          let nombreCell = document.createElement('td');
          nombreCell.textContent = nombre;
          nuevaFila.appendChild(nombreCell);
    
          let fechaCell = document.createElement('td');
          fechaCell.textContent = fecha;
          nuevaFila.appendChild(fechaCell);

          let entradaCell = document.createElement('td');
          entradaCell.textContent = entrada;
          nuevaFila.appendChild(entradaCell);

          let salidaCell = document.createElement('td');
          salidaCell.textContent = salida;
          nuevaFila.appendChild(salidaCell);

          let entrada2Cell = document.createElement('td');
          entrada2Cell.textContent = entrada2;
          nuevaFila.appendChild(entrada2Cell);

          let salida2Cell = document.createElement('td');
          salida2Cell.textContent = salida2;
          nuevaFila.appendChild(salida2Cell);

          let totalCell = document.createElement('td');
          totalCell.textContent = horasTotales;
          nuevaFila.appendChild(totalCell);

          let nocturnasCell = document.createElement('td');
          let minutosNocturnas = parseInt(horasNocturnas.split(':')[0]) * 60 + parseInt(horasNocturnas.split(':')[1]);
          let minutosExtras = parseInt(horasExtrasNocturnas.split(':')[0]) * 60 + parseInt(horasExtrasNocturnas.split(':')[1]);
          let diferenciaMinutos = minutosNocturnas - minutosExtras;
          let horasResultado = Math.floor(Math.abs(diferenciaMinutos / 60));
          let minutosResultado = Math.abs(diferenciaMinutos % 60);
          let resultadoFormateado = `${horasResultado.toString().padStart(2, '0')}:${minutosResultado.toString().padStart(2, '0')}`;
          nocturnasCell.textContent = isNaN(diferenciaMinutos) ? 'Error' : resultadoFormateado;
          nuevaFila.appendChild(nocturnasCell);

          let extrasCell = document.createElement('td');
          extrasCell.textContent = horasExtrasNormales;
          nuevaFila.appendChild(extrasCell);

          let extrasnCell = document.createElement('td');
          extrasnCell.textContent = horasExtrasNocturnas;
          nuevaFila.appendChild(extrasnCell);

          let deleteCell = document.createElement('td');
          let deleteButton = document.createElement('button');
          deleteButton.className = 'eliminar';
          deleteButton.innerHTML = `<img class="delete" src="img/delete.png" alt="Eliminar" width="25px"></img>`;
          deleteButton.addEventListener('click', function() {
            // Obtener la fila (elemento tr) a la que pertenece el botón
            let filaAEliminar = this.closest('tr');

            // Eliminar la fila
            if (filaAEliminar) {
              filaAEliminar.remove();
            }
          });
          deleteCell.appendChild(deleteButton);
          nuevaFila.appendChild(deleteCell);

          tabla.appendChild(nuevaFila);

          tabla.appendChild(nuevaFila);
      })

      
        });
//----------------------------------FILTRO---------------------------------------//
document.getElementById("btnFiltrar").addEventListener("click", filtrarPorNombre);

function filtrarPorNombre() {
  const filtroNombre = document.getElementById("filtroNombre").value.toLowerCase();
  const filas = document.getElementById("listaRegistros").getElementsByTagName("tr");

  Array.from(filas).forEach((fila) => {
    const primeraCelda = fila.querySelector("td:first-child");
    if (primeraCelda) {
      const nombre = primeraCelda.textContent.toLowerCase();
      fila.style.display = nombre.includes(filtroNombre) ? "" : "none";
    }
  });
}

//-------------------------FILTRO---------------------------------------------

document.getElementById("btnLimpiarFiltro").addEventListener("click", limpiarFiltro);

function limpiarFiltro() {
  const filas = document.getElementById("listaRegistros").getElementsByTagName("tr");

  Array.from(filas).forEach((fila) => {
    fila.style.display = "";
  });

  document.getElementById("filtroNombre").value = "";
}

//-------------------------CONVERTIR A EXCEL----------------------------------------------------

function genExcel() {
  // Obtén el contenido HTML de las tablas por sus IDs
  var tablaRegistrosHTML = document.getElementById('listaRegistros');
  var tablaSubtotalesHTML = document.getElementById('subTotales');

  // Crea una hoja de cálculo a partir del contenido HTML de la tabla de registros
  var workbook = XLSX.utils.book_new();
  var tablaRegistrosWS = XLSX.utils.table_to_sheet(tablaRegistrosHTML);
  XLSX.utils.book_append_sheet(workbook, tablaRegistrosWS, 'Registros');

  // Crea una hoja de cálculo a partir del contenido HTML de la tabla de subtotales
  var tablaSubtotalesWS = XLSX.utils.table_to_sheet(tablaSubtotalesHTML);
  XLSX.utils.book_append_sheet(workbook, tablaSubtotalesWS, 'Subtotales');

  // Descarga la hoja de cálculo como un archivo Excel
  XLSX.writeFile(workbook, 'gestión_horarios.xlsx');
}

// Obtén el botón por su ID
var btnExcel = document.getElementById("btnaExcel");

// Agrega un listener al botón para el evento de clic
btnExcel.addEventListener("click", function () {
  // Muestra el mensaje de confirmación usando SweetAlert
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción descargara el contenido en formato Excel.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#1aa839',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Descargar Excel',
    cancelButtonText: 'Cancelar'
  })
  .then((result) => {
    // Si el usuario hace clic en "Sí, eliminar todo", genera el archivo Excel
    if (result.isConfirmed) {
      genExcel();
    }
  });
});

//-------------------------CUANDO SE PASE POR ARRIBA EL CLICK EL ICONO SE MUEVE-----------------------
    document.getElementById('nombree').addEventListener('mouseover', function () {
        this.classList.add('fa-bounce');
    });

    document.getElementById('nombree').addEventListener('mouseout', function () {
        this.classList.remove('fa-bounce');
    });

    document.getElementById('rowUp').addEventListener('mouseover', function () {
      this.classList.add('fa-beat-fade');
  });

    document.getElementById('rowUp').addEventListener('mouseout', function () {
        this.classList.remove('fa-beat-fade');
   });

    document.getElementById('rowDown').addEventListener('mouseover', function () {
      this.classList.add('fa-beat-fade');
  });

    document.getElementById('rowDown').addEventListener('mouseout', function () {
      this.classList.remove('fa-beat-fade');
  });

  document.getElementById('pedro').addEventListener('mouseover', function () {
    this.classList.add('fa-beat-fade');
});

  document.getElementById('pedro').addEventListener('mouseout', function () {
    this.classList.remove('fa-beat-fade');
});


//---------------------------------ACTUALIZAR CON EL LOGO----------------------------------------------------

let logo = document.getElementById("logoT");

// Agrega un listener al logo para el evento de clic
logo.addEventListener("click", function () {
  // Recarga la página al hacer clic en el logo
  window.location.reload();
});
          
//---------------------------------ALERTA AL SALIR DE LA PÁGINA----------------------------------------------------

window.onbeforeunload = function (e) {
  var message = 'Si sales de la página, perderás los cambios.';
  e.returnValue = message; // Para navegadores más antiguos
  return message;
};
  
//---------------------------------------SUBTOTALES-----------------------------------------------------------

function actualizarSubtotales() {
  let filas = document.getElementById("listaRegistros").getElementsByTagName('tr');
  let totalMinutos = 0;
  let totalHorasNocturnas = 0;
  let totalHorasExtrasNormales = 0;
  let totalHorasExtrasNocturnas = 0;

  for (let i = 1; i < filas.length; i++) { // Comienza desde 1 para omitir la fila de encabezado
    let fila = filas[i];

    // Verifica si la fila está visible
    if (fila.style.display !== 'none') {
      let celdas = fila.getElementsByTagName('td');

      // Suma los valores de las celdas correspondientes
      totalMinutos += calcularMinutos(celdas[6].textContent);
      totalHorasNocturnas += calcularMinutos(celdas[7].textContent);
      totalHorasExtrasNormales += calcularMinutos(celdas[8].textContent);
      totalHorasExtrasNocturnas += calcularMinutos(celdas[9].textContent);
    }
  }

  // Actualiza la segunda tabla con los subtotales
  let subtotalesTabla = document.getElementById("subTotales");
  subtotalesTabla.innerHTML = `
      <tr>
          <td class="mitabla">Horas Totales</td>
          <td class="mitabla">${formatoHorasMinutos(totalMinutos)}</td>
      </tr>
      <tr>
          <td class="mitabla">Horas Nocturnas</td>
          <td class="mitabla">${formatoHorasMinutos(totalHorasNocturnas)}</td>
      </tr>
      <tr>
          <td class="mitabla">Horas Extras</td>
          <td class="mitabla">${formatoHorasMinutos(totalHorasExtrasNormales)}</td>
      </tr>
      <tr>
          <td class="mitabla">Extras Nocturnas</td>
          <td class="mitabla">${formatoHorasMinutos(totalHorasExtrasNocturnas)}</td>
      </tr>
  `;
}

function calcularMinutos(horaString) {
  let [horas, minutos] = horaString.split(':').map(Number);
  return horas * 60 + minutos;
}

function formatoHorasMinutos(totalMinutos) {
  let horas = Math.floor(totalMinutos / 60);
  let minutos = totalMinutos % 60;
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
}

// Llama a la función de actualización al cargar la página y establece un intervalo de actualización
window.onload = function() {
  actualizarSubtotales();
  setInterval(actualizarSubtotales, 3000); // Actualiza cada 3 segundos (ajusta según tus necesidades)
};

// Después de agregar la nueva fila, llama a la función de actualización de subtotales
actualizarSubtotales();
