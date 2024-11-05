const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Para procesar JSON en requests

app.get('/', (req, res) => {
res.send('¡Hola, mundo!');
});

app.get('/api/items', (req, res, next) => {

    console.log('Accediendo a /ruta');
    next();

 }, (req, res) =>{

     res.json([{ id: 2, nombre: 'Item 2' }]);
    
});
  
app.post('/api/items', (req, res) => {
    const nuevoItem = req.body;
    res.status(201).json(nuevoItem);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
