const URL="https://backend-production-c394.up.railway.app"

updateCart();

function eliminarDelCarrito(id) {
    console.log('Eliminar del carrito: ' + id);
    axios.delete(url + '/borrar-producto-carrito/' + id)
    .then( function (response) {
        alert(response.data)
        location.reload();
    }).catch(function (error) {
        console.log(error)
    });
    updateCart();
}

function updateCart(){
    axios.get(URL+"/carrito")
    .then(respuesta =>{
        var productos = respuesta.data;
        var tablaDelCarrito = document.getElementById('tabla-del-carrito');

        while (tablaDelCarrito.rows.length > 1) {
            tablaDelCarrito.deleteRow(1);
        }

        productos.forEach(function(producto){
            var fila = tablaDelCarrito.insertRow();
            var celdaNombre = fila.insertCell();
            celdaNombre.textContent = producto.nombre;
            var celdaPrecio = fila.insertCell();
            celdaPrecio.textContent = '$'+producto.precio;
            
            var celdaCantidad = fila.insertCell();
            celdaCantidad.textContent = producto.cantidad;
            celdaCantidad.contentEditable = 'false'; 

            var celdaTotal = fila.insertCell();
            celdaTotal.textContent = '$'+producto.precio * producto.cantidad ;

            celdaCantidad.oninput = function() {
                var cantidad = Number(celdaCantidad.textContent);
                var precio = Number(celdaPrecio.textContent);
            
                var total = cantidad * precio;
                celdaTotal.textContent = total.toFixed(2);
            }


            var celdaAcciones = fila.insertCell();
            var botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', function() {
                eliminarDelCarrito(producto.idProducto);
            });
            celdaAcciones.appendChild(botonEliminar);
        });
    })
    .catch(error => {
        console.error(error);
    });
}

function realizarCheckout(){
    alert('¡Muchas gracias por su compra!\nSe a descargado su recibo de compra');
    var fechaHora = new Date().toLocaleString();
    var inicio =
    " Abarrotes EL COMPADRE: Los precios que son de la familia\n"+
    "Recibo de compra\n"+
    "Fecha y hora de impresion: "+fechaHora+"\n";
    var final =
    "\tFue un placer atenderle, vuelva pronto";
    descargaTicket(inicio, final);
}

function descargaTicket(){
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();

    doc.text(i, 110, 10, null, null, 'center');

    doc.save("Recibo.pdf");
}