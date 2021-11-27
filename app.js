//setItem = selecciona
//getItem = encuentra

// seleccionaos evento, el evento, del formulario
// llamo la escuha, que me llame al boton y se ejecute la función creada
document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) { // aquí es para que almacene tareas agregadas - guardar
    // creo variable, para usarle siempre,y que me recoja los datos del formulario
    let tittle = document.getElementById('tittle').value;
    let description = document.getElementById('description').value;

    // creo constante con los ids que tengo arriba, básicamente creo un obejto
    let task = {
        tittle, // así es lo mismo que escribir tittle : tittle, 
        description // igual de arriba
    };

    // almaceno datos, primer patrón, como se llama y segundo de donde salen los datos, de la comnstante Y LA CONVIERTO EN STRING
    // localstorage almacena datos dentro del navegador, aunque se cierre / set item almacena uun dato
    if (localStorage.getItem('tasks') === null) {

        let tasks = [];
        tasks.push(task); // agrega 
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else { //si ya existem, obtenerlas, almacenarlas, mostrarlas

        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks)); //almaceno localstorage

    }
    getTasks(); // llamando función de abajo para que me refresque
    document.getElementById('formTask').reset(); // para resetear el formulario cada vez que agregue 
    // para evitar que se me refresque la págima cada vez que le de al botón// e es evento,  comando el resto
    e.preventdefault();
}


function getTasks() { // para obtener las tareas // pintarlas en html

    let tasks = JSON.parse(localStorage.getItem('tasks')); //las almaceno en una variable para usarla siemrpe 
    let taskView = document.getElementById('tasks'); // las almaceno en variable tb


    taskView.innerHTML = ""; // limpiar la variable
    //recorrer el evento 

    for (let i = 0; i < tasks.length; i++) { // como es un array, lo recorro

        let tittle = tasks[i].tittle;
        let description = tasks[i].description;

        // Vittorio para no concatenar tanto con éste ``   ABRO Y CIERRO IGUAL!!! simbolo, ll hago así más rápido
        // al deletetask le paso el parámetros el título de la tarea, para que lo recoja del html de una vez
        taskView.innerHTML += `<div class="card"> 
                            <div class="card-body">
                            <p>${tittle} - ${description}</p>
                            <a class="btn btn-danger" onclick="deleteTask('${tittle}')">Delete</a>
                            </div>
                            </div>`;
    }
}

function deleteTask(tittle) {

    let tasks = JSON.parse(localStorage.getItem('tasks'));

    // recorrer array
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].tittle == tittle) {
            tasks.splice(i, 1); // digo que me quite una tarea, del indice y un sólo dato (I, 1)
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks)); //VOLVER A ALMACENAR EL ARREGLO
    getTasks();

}

getTasks(); //PARA QUE ME PINTE EN HTML TODO