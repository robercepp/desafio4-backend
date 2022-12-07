//librerías necesarias
const express = require ('express')
const {Router} = express
const fs = require ("fs")

//implementación de servidor
const app = express()
const router = express.Router()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
  })
  server.on("error", (error) => console.log(`Error en servidor ${error}`))

//class
const Contenedor = require("./classes/classes.js")
const catalogo = new Contenedor("./productos.txt")

//app.use
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos', router)
app.use(express.static('public'))

//router
router.get('/', async (req, res) =>{
    const resultado = await catalogo.getAll();
    return res.send(resultado)
})

router.get('/:id', async (req, res) =>{
    let{id} = req.params
    const resultado = await catalogo.getById(id)
    return res.send(resultado)
})

router.post('/', async (req, res) => {
    let {title, price, thumbnail} = req.body
    let productoNuevo = {'title': title, 'price': parseFloat(price), 'thumbnail': thumbnail}
    const resultado = await catalogo.save(productoNuevo)
    return res.send(resultado)
})

router.put('/:id', async (req, res)=>{
    let {title, price, thumbnail} = req.body
    let {id} = req.params
    let productoModificado = {'title': title, 'price': price, 'thumbnail': thumbnail, 'id': parseInt(id)}
    const resultado = await catalogo.update(productoModificado)
    return res.send(resultado)
})

router.delete('/:id', async (req, res)=>{
    let{id} = req.params
    const resultado = await catalogo.deleteById(id)
    return res.send(resultado)
})
