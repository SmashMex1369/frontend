const URL = 'https://backend-production-c394.up.railway.app/'

const accion_boton_crear = document.getElementById('botonCrear');

accion_boton_crear.addEventListener('click',function(evt){
    evt.preventDefault();
    const _nombre = document.getElementById("nombre").value;
    const _precio = document.getElementById("precio").value;
    const _categoria = document.getElementById("categoria").value;
    const _fotografiaInput = document.getElementById("fotografia");

    if(!isNaN(_precio)){
        if (!_fotografiaInput.files || _fotografiaInput.files.length === 0) {
            alert("Foto no obtenida")
        }else {
            var fotografiaFile = _fotografiaInput.files[0];
            var extension = fotografiaFile.name.split('.').pop().toLowerCase();
    
            if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var fotografiaBase64 = e.target.result;
                    alert('Agrgando producto ...\nEsto puede tardar unos segundos')
                    agregarProducto(_nombre, _precio, fotografiaBase64, _categoria);
                };
                reader.readAsDataURL(fotografiaFile);
            } else {
                alert("El archivo debe tener una extensión PNG o JPG.");
            }
        }
    }else  {
        alert("Precio tiene que ser un numero");
    }
});

function agregarProducto(_nombre, _precio, _foto, _categoria) {
    axios.post(URL + 'agregarProducto', {
        "nombre": _nombre,
        "precio": _precio,
        "fotografia": _foto,
        "categoria": _categoria
    })
    .then(function (response) {
        alert(response.data);
        switch(_categoria){
            case 'Limpieza':
                location.href="limpieza_admin.html";
                break;
            case 'Frutas y Verduras':
                location.href="frutas_admin.html";
                break;
            case 'Higiene Personal':
                location.href="higiene_admin.html";
                break;
            case 'Productos Animales':
                location.href="animales_admin.html";
                break;
        }
    })
    .catch(function (error) {
        console.error("Error al agregar el producto:", error);
    });
}