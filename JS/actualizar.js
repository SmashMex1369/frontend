const URL = 'https://backend-production-c394.up.railway.app/'

var datosProducto = new URLSearchParams(window.location.search);
const idProducto =  datosProducto.get("id");
var nombre = datosProducto.get("nombre");
var precio = datosProducto.get("precio");
var categoria = datosProducto.get("categoria");
llenarformulario(nombre,precio,categoria);

const accion_boton_actualizar = document.getElementById("botonActualizar")

function modificarProducto(_idProducto,_nombre,_precio,categoria,fotografia){
    axios.put(URL+'actualizarProducto/'+_idProducto,{
     "nombre": _nombre,
     "precio": _precio,
     "categoria":categoria,
     "fotografia":fotografia
     })
    .then(function (response) {
        alert(response.data)
        location.reload();
    })
    .catch(function (error) {
        console.log(error)
    });


  const accion_boton_elimiar = document.getElementById('eliminar-producto')

}

accion_boton_actualizar.addEventListener('click',function (evt) {
    evt.preventDefault();

    const _nombre = document.getElementById("acnombre").value;
    const _precio = document.getElementById("acprecio").value;
    const _categoria = document.getElementById("categoria").value;
    const _fotografiaInput = document.getElementById("acfotografia");

    if (!isNaN(_precio)) {
        alert("producto de categoria " + _categoria);
        if (!_fotografiaInput.files || _fotografiaInput.files.length === 0) {
            alert("foto no obtenida");
        } else {
            var fotografiaFile = _fotografiaInput.files[0];
            var extension = fotografiaFile.name.split('.').pop().toLowerCase();
    
            if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var fotografiaBase64 = e.target.result;
                    console.log("fotografia convertida a base64: " + fotografiaBase64);
                    modificarProducto(idProducto,_nombre, _precio, _categoria,fotografiaBase64);
                };
                reader.readAsDataURL(fotografiaFile);
            } else {
                alert("El archivo debe tener una extensión PNG o JPG.");
            }
        }
    } else {
        alert("Precio tiene que ser un numero");
    }
});

function llenarformulario( nombre, precio,categoria) {
    document.getElementById('acnombre').value = nombre;
    document.getElementById('acprecio').value = precio;
    document.getElementById('categoria').value = categoria
}

function subirFotografia(idProducto,fileData){
    axios.put(URL+'registrarFoto/'+idProducto, fileData, {
        headers: {
            'Content-Type': 'image/jpeg'
        }
    })
    .then(function (response) {
        console.log(response);
        console.log('producto foto actualizado')
    })
    .catch(function (error) {
        console.log(error);
    });
}