//Express init
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(3000, function(){
    console.log('App listen in port 3000');
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


//DATABASE INTEGRATION
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user:'root',
    password: 'mysqlDB123#',
    database: 'rco'
});

connection.connect(function(err){
    if(err)
        throw err;
    console.log('Connected to the database RCO');
});


//Register user

app.post('/register', function(req, res){
    console.log('Data saved');
    res.end()

    connection.query("insert into utilizadores (PrimeiroNome,UltimoNome,Email,Pais,Cidade,Morada,Password) values ('"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.email+"','"+req.body.country+"','"+req.body.city+"','"+req.body.address+"', '"+req.body.pass+"')",function(err, result){
        if(err)
            throw err;
    });
   
});

//Register Despesa

app.post('/despesa', function(req, res){
    res.end()

    connection.query("insert into despesa (Nome,Tipo,Estabelecimento,Pais,Valor) values ('"+req.body.desp_name+"','"+req.body.desp_tipo+"','"+req.body.desp_estab+"','"+req.body.desp_pais+"','"+req.body.desp_valor+"')",function(err, result){
        if(err)
            throw err;
    });
    
})


//Registar planeamento
app.post('/planeamento', function(req, res){
    res.end();

    connection.query("insert into planeamento (TipoDespesa,Descricao,Valor,Categoria,SubCategoria) values ('"+req.body.tipo_desp+"','"+req.body.desc_plan+"','"+req.body.valor_plan+"','"+req.body.cat_plan+"','"+req.body.sub_plan+"')",function(err, result){
        if(err)
            throw err;
    });
});


//Registar Cartão
app.post('/ccredito', function(req, res){
    res.end();

    connection.query("insert into ccredito (Nome,Numero) values ('"+req.body.cc_nome+"','"+req.body.cc_numero+"')",function(err, result){
        if(err)
            throw err;
    });
});

//Registar Conta banco
app.post('/cobanco', function(req, res){
    res.end();

    connection.query("insert into cobanco (Nome,Numero,DataAbertura,TipoConta) values ('"+req.body.banco_nome+"','"+req.body.num_banco+"', '"+req.body.data_banco+"', '"+req.body.tipo_banco+"')",function(err, result){
        if(err)
            throw err;
    });
});

//----------------- EM TESTES
//Login user

/*
app.get('/login', function(req, res){
    var loginInfo = [];

    function setValue(values){
        loginInfo = values;
        console.log(loginInfo.PrimeiroNome);
    }

    connection.query("select * from utilizadores", function(err, rows){
        if(err)
            throw err;
        else
            setValue(rows);
    });

  
    //if(login)    
});


/*
var loginInfo = [];

function setValue(values){
    loginInfo = values;
    console.log(loginInfo);
}

connection.query("select * from utilizadores", function(err, rows){
    if(err)
        throw err;
    else
        setValue(rows);
});
*/

