const express = require("express");
const mysql = require("mysql");
const cors = require("cors");


const app = express(); //creamos la instancia del servidor express

//middlewares
app.use(express.json());
app.use(cors());


//inciamos el servidor
const PORT = 3000;

app.listen(PORT,()=>{
    console.log("servidor corriendo en http://localhost:"+PORT);
})


//conexion con mysql

const servidores = [
    {
        host:"beq8bkmdgd02kjbarz3r-mysql.services.clever-cloud.com",
        user:"upk880fupg8hv4nz",
        password: "V88afnm3Cmb9SZCr0Wvb",
        port:3306,
        database: "beq8bkmdgd02kjbarz3r"
    }
]

const connection = mysql.createConnection(servidores[0]);

connection.connect((err)=>{
    if (err){
        console.error(err.message || "No se pudo conectar a la base de datos");
    }else{
        console.log("Conectado a la base de datos");
    }
});

app.get("/",(req,res)=>{
    connection.query("SELECT * FROM usuarios",(error,results)=>{
        if(error) res.status(500).json({message: error.message || "No se pueden obtener datos en este momento para la tabla usuarios" });
        else res.status(200).json(results);
    });
});

app.post("/",(req,res)=>{
    const {nombre} = req.body;
    connection.query('INSERT INTO usuarios VALUES (DEFAULT,"'+nombre+'")',(error,results)=>{

        if (error){
            res.status(500).json({message:error.message || "No se pudo insertar el dato en este momento"});
        } else res.json(results);
    });
});

app.patch("/",(req,res)=>{
    const {id,nombre} = req.body;

    connection.query(`UPDATE usuarios SET nombre="${nombre}" WHERE id=${id}`,(error, results)=>{
        if (error) res.status(500).json({message:error.message || "No se pudo actualizar en este momento"});
        else res.json(results);
    });
});


app.delete("/",(req,res)=>{
    const {id} = req.body;
    connection.query(`DELETE FROM usuarios WHERE id=${id}`,(error,results)=>{
            if (error) res.status(500).json({message:error.message || "No se puede eliminar en este momento"});
            else res.json(results);
    });
});







