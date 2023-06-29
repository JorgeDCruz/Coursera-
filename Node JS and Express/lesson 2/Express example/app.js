const express = require('express');
const app = express();

const port = 3600;

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

app.listen(port, (error) =>{
    if(!error){
        console.log(`Server listening on port: ${port}`);
    }
    else{
        console.log(`Error on server startup: ${error}`);
    }
})