const express = require('express');
// **********************************************
// Require del modulo fileUpload
// **********************************************
// express-fileupload es un middleware para
// subir archivos al servidor utilizando express.
const fileUpload = require('express-fileupload');
// **********************************************
const app = express();

// La ruta donde se guardaran nuestros archivos.
const files_route = './src/files/';
// Extension de nuestros archivos, 
// en este caso seran archivos png
const file_extension = '.png';
// El nombre del archivo,
// en este caso lo escribiremos nosotros en el formulario.
let file_name = 'sample_name';

// Usar fileUpload con opciones por defecto.
app.use(fileUpload());

app.get('/', (req, res) => {
    return res.sendFile('html/index.html', { root: __dirname });
});
app.get('/2', (req, res) => {
    return res.sendFile('html/index2.html', { root: __dirname });
});
app.get('/2-2', (req, res) => {
    return res.sendFile('html/index3.html', { root: __dirname });
});

app.post('/upload', (req, res) => {
    // Revisar si hay archivos que se subiran al servidor.
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No se subieron archivos.');
    }

    console.log(req.body);

    // Asignamos el nombre de nuestro archivo.
    file_name = req.body.fileName;
    // Obtenemos el archivo que se envio.
    // En este caso el control que envia el archivo se llama sampleFile.
    const sampleFile = req.files.sampleFile;

    // Usamos el metodo mv() para colocar el archivo en algun lugar de nuestro servidor.
    // En este caso, sera la carpeta files.
    sampleFile.mv(files_route + file_name + file_extension, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded');

    });
});

app.post('/2', (req, res) => {
    console.log(req.body);
    console.log(req.files);
    

});

app.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Servidor corriendo en el puerto 5000');

});
