import express from 'express' //ESM (es la nueva version que sustituye require)

const app = express(); // Instancia del servidor

//Routing
app.get("/", (req, res) => {
  res.send('Hola mundo en Express')
});

const port = process.env.PORT || 4000 // Se lee en cuando se lea el deployment

app.listen(port, () => {
  console.log("Servidor funcionando en el puerto: ", port);
});
