const mongoose = require('mongoose');

const getConnection = async () =>{
    try{
        const url = "mongodb://acadaviu1:aguacatote1@ac-3jsh6my-shard-00-00.2pzk3ga.mongodb.net:27017,ac-3jsh6my-shard-00-01.2pzk3ga.mongodb.net:27017,ac-3jsh6my-shard-00-02.2pzk3ga.mongodb.net:27017/proyect1?ssl=true&replicaSet=atlas-3d7z0k-shard-0&authSource=admin&retryWrites=true&w=majority";

        await mongoose.connect(url);
    
            console.log("Conexion exitosa")
        } catch(error){
            console.log(error)
    }
    
}

module.exports={
    getConnection,
}

