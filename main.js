window.onload = cargarTareas;

// Agregamos tareas en submit
document.querySelector("#form_nueva_tarea").addEventListener("submit", e => {
      e.preventDefault();
      agregarTarea();

      const tareaN = document.querySelector("#input_nueva_tarea");
      const tareasPendientes = [];
      let id;

      if(tareaN){

        tareasPendientes.push({
          tarea: tareaN,
          id: id,
      });
      
      fetch('http://localhost:3000/tasks/', {
          method: 'POST',
          body: JSON.stringify({
              tarea: tareaN,
              id: id
          }),
          headers: {
              'Content-type': 'applications/json; charset=UTF-8',
          },
      })
      .then((response) => response.json())
      .then((json) =>console.log(json));

      id++;
      }
});

function cargarTareas() {

    //Chequeamos el localStorage
    if (localStorage.getItem("tareas") == null) return;

    // Cargamos las tareas a un array
    let tareas = Array.from(JSON.parse(localStorage.getItem("tareas")));
  
    // Hacemos loop a las tareas y agregamos a la lista
    tareas.forEach(tarea => {
      const lista = document.querySelector("ul");
      const item = document.createElement("li");
      item.innerHTML = `<input type="checkbox" onclick="completarTarea(this)" class="check" ${tarea.completed ? 'checked' : ''}>
            <input type="text" value="${tarea.tarea}" class="tarea ${tarea.completed ? 'completed' : ''}" onfocus="obtenerTareaActual(this)" onblur="editarTarea(this)">
            <i class="fa fa-trash" onclick="eliminarTarea(this)"></i>`;
      lista.insertBefore(item, lista.children[0]);
    });
}

function agregarTarea () {
    const tarea = document.querySelector("form input");
    const lista = document.querySelector("ul");

    //hacemos return si no hay tareas
    if (tarea.value === "") {
        alert("¡Oop! Olvidaste agregar una tarea.");
        return false;
    }
    //Chequeamos si ya existe
    if (document.querySelector(`input[value="${tarea.value}"]`)) {
        alert("¡Ay! Ya pusiste esta tarea.");
        return false;
    }

    //Agregamos al localStorage
    localStorage.setItem("tareas", JSON.stringify([...JSON.parse(localStorage.getItem("tareas") || "[]"), {tarea: tarea.value, completed:false}]));

    //Creamos un item, agregamos el innerHTML y append
    const item = document.createElement("li");
    item.innerHTML = `<input type="checkbox" onclick="completarTarea(this)" class="check">
    <input type="text" value="${tarea.value}" class="tarea" onfocus="obtenerTareaActual(this)" onblur="editarTarea(this)">
    <i class="fa fa-trash" onclick="eliminarTarea(this)"></i>`;
    lista.insertBefore(item, lista.children[0]);
    // Limpiamos el input
    tarea.value = "";
}

function completarTarea(evento) {
    let tareas = Array.from(JSON.parse(localStorage.getItem("tareas")));
    tareas.forEach(tarea => {
      if (tarea.tarea === evento.nextElementSibling.value) {
        tarea.completed = !tarea.completed;
      }
    });
    localStorage.setItem("tareas", JSON.stringify(tareas));
    evento.nextElementSibling.classList.toggle("completed");
}

function eliminarTarea(evento) {
    let tareas = Array.from(JSON.parse(localStorage.getItem("tareas")));
    tareas.forEach(tarea => {
      if (tarea.tarea === evento.parentNode.children[1].value) {
        // Borramos
        tareas.splice(tareas.indexOf(tarea), 1);
      }
    });
    localStorage.setItem("tareas", JSON.stringify(tareas));
    evento.parentElement.remove();

    fetch('http://localhost:3000/tasks/', {
        method: 'DELETE',
    });
}

  // guardamos la tarea actual para guardar cambios
var tareaActual = null;

// get current task
function obtenerTareaActual(evento) {
    tareaActual = evento.value;
}

  // editamos la tarea y actualizamos el localStorage
function editarTarea(evento) {
    let tareas = Array.from(JSON.parse(localStorage.getItem("tareas")));
    // Chequeamos que esté vacío
    if (evento.value === "") {
      alert("¡No tienes pendientes!");
      evento.value = tareaActual;
      return;
    }

    // Si la tarea ya existe
    tareas.forEach(tarea => {
      if (tarea.tarea === evento.value) {
        alert("¡Oops! Ya pusiste esta tarea.");
        evento.value = tareaActual;
        return;
      }
    });

    // Actualizamos tareas
    tareas.forEach(tarea => {
      if (tarea.tarea === tareaActual) {
        tarea.tarea = evento.value;
      }
    });
    // Actualizamos el localStorage
    localStorage.setItem("tareas", JSON.stringify(tareas));
}
