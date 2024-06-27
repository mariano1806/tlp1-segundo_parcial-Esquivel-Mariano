const express = require('express')
const database = require('./database')

const app = express()

app.use(express.text())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hola mundo!')
})

app.get('/products', (req, res) => {
    res.json(database);
});

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = database.find((product) => product.id === id);
    if(product) {
        res.json(product);
    } else {
        res.status(404).json({msg : "Producto no encontrado"});
    }
})

app.post('/products', (req, res) => {
    const {id, name, quantity, price} = req.body;
    const newProduct = {id, name, quantity, price};
    database.push(newProduct);
    res.json({msg : "se agrego correctamente", product: newProduct});
});

app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {name, quantity, price} = req.body;
    const product = database.find((product) => product.id === id);
    if(product) {
        product.name = name;
        product.quantity = quantity;
        product.price = price;
        res.json({msg : "se actualizo correctamente", product});
    } else {
        res.status(404).json({msg : "Producto no encontrado"});
    }
});

app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = database.findIndex((product) => product.id === id);
    if(index !== -1) {
        const product = database[index];
        database.splice(index, 1);
        res.json({msg : "se elimino correctamente", product});
    } else {
        res.status(404).json({msg : "Producto no encontrado"});
    }
});

app.listen(3000, () => {console.log('Servidor corriendo en el puerto 3000')})