const URL="https://backend-production-c394.up.railway.app"

updateCart();
updateCartpdf();

function eliminarDelCarrito(id) {
    console.log('Eliminar del carrito: ' + id);
    axios.delete(URL + '/borrar-producto-carrito/' + id)
    .then( function (response) {
        alert(response.data)
        location.reload();
    }).catch(function (error) {
        console.log(error)
    });
    updateCart();
    updateCartpdf();
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
            celdaCantidad.contentEditable = 'true'; 

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

function updateCartpdf() {
    axios.get(URL +'/carrito')
        .then(respuesta => { 
            var productos = respuesta.data;
            var tablaDelCarrito = document.getElementById('tabla-pdf');
    
            // Limpiar la tabla
            while (tablaDelCarrito.rows.length > 1) {
                tablaDelCarrito.deleteRow(1);
            }
    
            // Añadir cada producto a la tabla
            productos.forEach(function(producto) {
                var fila = tablaDelCarrito.insertRow();
    
            
    
                var celdaNombre = fila.insertCell();
                celdaNombre.textContent = producto.nombre;
    
                
                var celdaCantidad = fila.insertCell();
                celdaCantidad.textContent = producto.cantidad;
                celdaCantidad.contentEditable = 'true'; 

                var celdaPrecio = fila.insertCell();
                celdaPrecio.textContent = '$'+producto.precio;

                var celdaTotal = fila.insertCell();
                celdaTotal.textContent = '$'+producto.precio * producto.cantidad ;
    

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

function descargaTicket(i, f){
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();
    var doc = new jsPDF({
        unit: "in",
        format: [5,5]
    });
    doc.setFontSize(12);
    doc.text(i, 2.5, 0.3, null, null, 'center');
    doc.autoTable({ html: '#tabla-pdf' , startY: 0.9, styles:{halign:'center'}});
    
    axios.get(URL +'/carrito')
    .then(respuesta =>{
        var total = 0;
        var productos = respuesta.data;
        productos.forEach(function(producto) {
            total = total + (producto.cantidad*producto.precio);
        });
        doc.text('TOTAL: $'+total,2.5,4.5,null, null,'center');
        doc.text(f, 2.15, 4.8, null, null, 'center');
        doc.save("Recibo.pdf");
    })
}