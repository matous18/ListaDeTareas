window.addEventListener('load', () => {

    tareasPendientes = JSON.parse(localStorage.getItem('tareasPendientes'));

    const formato = document.querySelector("#form_nueva_tarea");
    const input = document.querySelector("#input_nueva_tarea");
    const lista = document.querySelector("#tareas__agregadas");
    
    formato.addEventListener("submit", (e) => {
        e.preventDefault();

        const tarea = input.value;

        const itemTarea = document.createElement('div');
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
        });
    });
});