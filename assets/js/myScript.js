// funcion para validar formulario
const validateForm = () => {
    let marca = document.getElementById('inputMarca').value;
    let modelo = document.getElementById('inputModelo').value;
    let año = document.getElementById('inputAño').value;

    if (marca == "") {
        alert('La marca es requerida');
        return false;
    }

    if (marca.length < 3 || marca.length > 12) {
        alert('La marca debe tener entre 3 y 12 caracteres');
        return false;
    }

    // NaN = is Not-a-Number"
    if (!isNaN(marca)) {
        alert('La marca no puede ser un número');
        return false;
    }

    if (modelo == "") {
        alert('El modelo es requerido');
        return false;
    }

    if (modelo.length > 12) {
        alert('El modelo no puede tener más de 12 caracteres');
        return false;
    }

    if (año == "") {
        alert('El año es requerido');
        return false;
    }

    if (año.length !== 4 || isNaN(año)) {
        alert('El año debe ser numérico y tener 4 caracteres');
        return false;
    }

    return true;
};


// funcion para mostrar formulario
const showData = () => {
    let listCars = localStorage.getItem('listCars') ? JSON.parse(localStorage.getItem("listCars")) : [];

    let html = "";

    listCars.forEach((element, index) => {
        html += "<tr>";
        html += "<td>" + element.marca + "</td>";
        html += "<td>" + element.modelo + "</td>";
        html += "<td>" + element.año + "</td>";
        html += `<td><button onclick="deleteData(${index})" class="btn btn-danger">Eliminar Dato</button> <button onclick="updateData(${index})" class="btn btn-warning">Editar Dato</button></td>`;
        html += "</tr>";
    });

    document.querySelector('#tableData tbody').innerHTML = html;
};

// cargar data
document.onload = showData();


// funcion para agregar objetos
const addData = () => {
    if (validateForm()) {
        let marca = document.getElementById('inputMarca').value;
        let modelo = document.getElementById('inputModelo').value;
        let año = document.getElementById('inputAño').value;

        let listCars = localStorage.getItem('listCars') ? JSON.parse(localStorage.getItem("listCars")) : [];

        listCars.push({
            marca: marca,
            modelo: modelo,
            año: año,
        });

        localStorage.setItem('listCars', JSON.stringify(listCars));
        showData();

        document.getElementById('inputMarca').value = "";
        document.getElementById('inputModelo').value = "";
        document.getElementById('inputAño').value = "";
    }
};


// funcion para eliminar datos
const deleteData = (index) => {
    let listCars = localStorage.getItem('listCars') ? JSON.parse(localStorage.getItem("listCars")) : [];

    listCars.splice(index, 1);
    localStorage.setItem('listCars', JSON.stringify(listCars));
    showData();
};


// funcion para actualizar datos
const updateData = (index) => {
    document.getElementById("btnAdd").style.display = 'none';
    document.getElementById("btnUpdate").style.display = 'block';

    let listCars = localStorage.getItem('listCars') ? JSON.parse(localStorage.getItem("listCars")) : [];

    document.getElementById('inputMarca').value = listCars[index].marca;
    document.getElementById('inputModelo').value = listCars[index].modelo;
    document.getElementById('inputAño').value = listCars[index].año;

    document.querySelector("#btnUpdate").onclick = () => {
        if (validateForm()) {
            listCars[index].marca = document.getElementById('inputMarca').value;
            listCars[index].modelo = document.getElementById('inputModelo').value;
            listCars[index].año = document.getElementById('inputAño').value;

            localStorage.setItem('listCars', JSON.stringify(listCars));
            showData();

            document.getElementById('inputMarca').value = "";
            document.getElementById('inputModelo').value = "";
            document.getElementById('inputAño').value = "";

            document.getElementById("btnAdd").style.display = 'block';
            document.getElementById("btnUpdate").style.display = 'none';
        }
    };
};