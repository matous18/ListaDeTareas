window.addEventListener('load', () => {
    
    //Seleccionamos los elementos
    
    const formato = document.querySelector("#form_nueva_tarea");
    const input = document.querySelector("#input_nueva_tarea");
    const lista = document.querySelector("#tareas__agregadas");
    
    //Declaramos variables y arrays
    
    let tareasPendientes, id;
    const llaveLocal = 'pendiente';
    
    //Obtenemos item del localstorage
    
    let datos = localStorage.getItem(llaveLocal);
    
    //verificamos que si está vacio
    
    if(datos){
        tareasPendientes = JSON.parse(datos);
        id = tareasPendientes.length;
        cargarLista(tareasPendientes);
    
    }else{ //si está vacío
        tareasPendientes = [];
        id = 0;
    }
    
    //función para cargar los items
    function cargarLista(array){
        array.forEach(function(inputTareaItem){
            guardarYMostrar(inputTareaItem);
        });
    }
    
    //función para agreagar tarea
    
    function agregarTarea(tarea){
    
        itemTarea = document.createElement('div');
        itemTarea.classList.add('tarea');
    
        const tareaContenido = document.createElement('div');
        tareaContenido.classList.add('contenido');
    
        itemTarea.appendChild(tareaContenido);
    
        const inputTareaItem = document.createElement('input');
        inputTareaItem.classList.add('text');
        inputTareaItem.type = 'text';
        inputTareaItem.value = tarea;
        inputTareaItem.setAttribute('readonly', 'readonly');
    
        tareaContenido.appendChild(inputTareaItem);
    }
    
    //función para almacenar
    
    function guardar() {
        localStorage.setItem(llaveLocal, JSON.stringify(tareasPendientes));
    }
    
    function guardarYMostrar (tarea){
        guardar();
        agregarTarea(tarea);
    }
    
    //agregar el item
    
    formato.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const tarea =input.value;
    
        if(tarea){
    
            agregarTarea(tarea);
    
            tareasPendientes.push({
                tarea: tarea,
                id: id
            });
            
            fetch('http://localhost:3000/tasks/', {
                method: 'POST',
                body: JSON.stringify({
                    tarea: tarea,
                    id: id
                }),
                headers: {
                    'Content-type': 'applications/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((json) =>console.log(json));
    
            //agregamos al local storage
            guardar();
    
            id++;
        }
    
        //Definimos las acciones de los botonos eliminar y editar
    
        const accionesTareas = document.createElement('div');
        accionesTareas.classList.add('actions');
    
        const editarTareas = document.createElement('button');
        editarTareas.classList.add('edit');
        editarTareas.innerText = 'Editar';
    
        const borrarTareas = document.createElement('button');
        borrarTareas.classList.add('delete');
        borrarTareas.innerText = 'X';
    
        accionesTareas.appendChild(editarTareas);
        accionesTareas.appendChild(borrarTareas);
    
        
        itemTarea.appendChild(accionesTareas);
    
        lista.appendChild(itemTarea);
    
        input.value = '';
    
        editarTareas.addEventListener('click', (e) => {
            if (editarTareas.innerText.toLowerCase() == "editar") {
                editarTareas.innerText = "Guardar";
                inputTareaItem.removeAttribute("readonly");
                inputTareaItem.focus();
            } else {
                editarTareas.innerText = "Editar";
                inputTareaItem.setAttribute("readonly", "readonly");
            }
        });
    
        borrarTareas.addEventListener('click', (e) => {
    
                lista.removeChild(itemTarea);
                tareasPendientes.splice(index,1);
                fetch('http://localhost:3000/tasks/', {
                    method: 'DELETE',
                });
        });
    });

});    

