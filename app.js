let productos = []


const contenedorProductos = document.querySelector('#contenedor-productos')
const contenedorCarrito = document.querySelector('#carrito-contenedor')
const botonVaciar = document.querySelector('#vaciar-carrito')
const botonComprar = document.querySelector('#Comprar')

const contadorCarrito = document.querySelector('#contadorCarrito')


const cantidad = document.querySelector('#cantidad')
const precioTotal = document.querySelector('#precioTotal')
const cantidadTotal = document.querySelector('#cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

botonComprar.addEventListener('click', () => {
 Swal.fire(
    'Good job!',
    'Gracias por su compra!',
    'success'
    )
})


/* const stockProductos2 = async() => {
        let armoHTML = "" 
        let activoBotones = true

            try {
                const response = await fetch("../bbdd/vinos.json")
                stockProductos = await  response.json()
                console.table(stockProductos)
                stockProductos.forEach(stockProductos => armoHtml += retornoCard(stockProductos))
            } catch (error) {
                
            }finally{
                    div.innerHTML = armoHTML
                    activoBotones && botonVaciar() 
            }
    } 


 */

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)

   
    const boton = document.getElementById(`agregar${producto.id}`)
    

    boton.addEventListener('click', () => {
        
        agregarAlCarrito(producto.id)
        
    })
})


const agregarAlCarrito = (prodId) => {

    
    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){ 
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
                guardarCarrito()
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        
        carrito.push(item)
    }
    
    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item)

    carrito.splice(indice, 1) 
   
    actualizarCarrito() 
    console.log(carrito)
}

const actualizarCarrito = () => {
    
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
    
        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length
   
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio*prod.iva, 0)
    

}

   const guardarCarrito =() =>{
        if(carrito.length > 0){
            localStorage.setItem("carrito", JSON.stringify(carrito))
    } 
   }

   const recuperarCarrito = () =>{
    if(localStorage.getItem ("carrito")){
        let carriroRecuperado = JSON.parse(localStorage.getItem("carrito"))
        carriroRecuperado.forEach(producto => carrito.push(producto))
        cpnspñe-table(carritoRecuperado)
        }else{
            console.warn("N")
        }
    }
   