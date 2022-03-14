import Express from 'express'
import { Routes } from './src/routes/Routes'
import { MongoConnection } from './src/microservices/apiConnection'

const port = process.env.PORT || 5000;

const express_server = Express()
express_server.use(Express.json())
express_server.use(Express.urlencoded({extended:true}));
express_server.use(Express.static("./src/pages"));
express_server.get("/",function(req,res){
    var options = {'root':"./src/pages"};
    res.sendFile('forms.html',options);
});

/*Sempre usar Content-Type: application/json no Insomnia ao enviar dados no body em json*/

const database = new MongoConnection()
database.connect()

const urlController = new Routes()
express_server.post('/fullurl', urlController.fullurl)
express_server.get('/:hash', urlController.redirect)

express_server.listen(port, () => {console.log(`Express server opened on port: ${port}`)
});

