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
    

    connection.query("insert into utilizadores (PrimeiroNome,UltimoNome,Email,Pais,Cidade,Morada,Password) values ('"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.email+"','"+req.body.country+"','"+req.body.city+"','"+req.body.address+"', '"+req.body.pass+"')",function(err, result){
        if(err)
            throw err;
    
    res.redirect('/'); 
    res.end();   
    });
   
});

//Register Despesa

app.post('/despesa', function(req, res){
    

    connection.query("insert into despesa (Nome,Tipo,Estabelecimento,Pais,Valor) values ('"+req.body.desp_name+"','"+req.body.desp_tipo+"','"+req.body.desp_estab+"','"+req.body.desp_pais+"','"+req.body.desp_valor+"')",function(err, result){
        if(err)
            throw err;

        res.redirect('/index.html');
        res.end();
    });
    
})


//Registar planeamento
app.post('/planeamento', function(req, res){
    

    connection.query("insert into planeamento (TipoDespesa,Descricao,Valor,Categoria,SubCategoria) values ('"+req.body.tipo_desp+"','"+req.body.desc_plan+"','"+req.body.valor_plan+"','"+req.body.cat_plan+"','"+req.body.sub_plan+"')",function(err, result){
        if(err)
            throw err;
        res.redirect('/index.html');
        res.end();
    });
});


//Registar Cartão
app.post('/ccredito', function(req, res){
   

    connection.query("insert into ccredito (Nome,Numero) values ('"+req.body.cc_nome+"','"+req.body.cc_numero+"')",function(err, result){
        if(err)
            throw err;
        res.redirect('/index.html');
        res.end();
    });
});

//Registar Conta banco
app.post('/cobanco', function(req, res){
    

    connection.query("insert into cobanco (Nome,Numero,DataAbertura,TipoConta) values ('"+req.body.banco_nome+"','"+req.body.num_banco+"', '"+req.body.data_banco+"', '"+req.body.tipo_banco+"')",function(err, result){
        if(err)
            throw err;
        res.redirect('/index.html');
        res.end();
    });
});


//GET plans
app.get('/ver_plan', function(req, res){
    //res.render('ver_plan'); 
    connection.query("select * from planeamento", function(err, result){
        if(err)
            throw err;
        
        var arr = [];
        for(var i = 0; i!= result.length; i++){
            arr.push("Tipo de despesa: " + result[i].TipoDespesa + "<br>" + "Descricão do planeamento: " + result[i].Descricao + "<br>" + 
                        "Valor do planeamento: " + result[i].Valor + "<br>" + "Categoria do planeamento: " + result[i].Categoria + "<br>" + 
                        "Sub categoria: " + result[i].SubCategoria + "<br>" + "<br>");    
        }
        //res.render('pages/ver_plan', {arr});
        res.send("<h4>" + arr + "</h4>");
            
    });
});


//GET despesa
app.get('/ver_desp.html', function(req, res){

    
    connection.query("select * from despesa", function(err, result){
        if(err)
            throw err;
        
        var arr = [];
        for(var i = 0; i != result.length; i++){
            arr.push("Nome da despesa: " + result[i].Nome + "<br>" + "Tipo de despesa: " + result[i].Tipo + "<br>" + 
                        "Estabelecimento da despesa: " + result[i].Estabelecimento + "<br>" + "Pais da despesa: " + result[i].Pais + 
                            "<br>" + "Valor da despesa: " + result[i].Valor + "<br>" + "<br>");
        }
            //console.log(result);    
            res.send("<h4>" + arr + "</h4>");
            
    })

});

//GET banco

app.get('/ver_banco.html', function(req, res){

    connection.query("select * from cobanco", function(err, result){
        if(err)
            throw err;
       
       var arr = [];
       for(var i = 0; i != result.length; i++){
           arr.push("Nome do banco: " + result[i].Nome + "<br>" + "Número da conta: " + result[i].Numero + "<br>" + 
                        "Data de abertura da conta: " + result[i].DataAbertura + "<br>" + "Tipo de conta: " + result[i].TipoConta +
                            "<br>" + "<br>");
       }
            //console.log(result);    
            
            res.send("<h4>" + arr + "</h4>");
            //res.sendFile("/ver_banco.html");
            
    })

});


//GET cartoes

app.get('/ver_cartoes.html', function(req, res){

    connection.query("select * from ccredito", function(err, result){
        if(err)
            throw err;
        
        var arr = [];
        for(var i = 0; i != result.length; i++){
            arr.push("Nome do cartão: " + result[i].Nome + "<br>" + "Número do cartão: " + result[i].Numero + "<br>" + "<br>");
        }
            //console.log(result);    
         res.send("<h4>" + arr + "</h4>");    
            
            
    })

});

//Get USERS
app.get('/ver_users', function(req, res){

    connection.query("select * from utilizadores", function(err, result){
        if(err)
            throw err;
        
        var arr = [];
        for(var i = 0; i != result.length; i++){
            arr.push("Primeiro Nome: " + result[i].PrimeiroNome + "<br>" + "Último Nome: " + result[i].UltimoNome + "<br>" + 
                        "Email: " + result[i].Email + "<br>" + "<br>");
        }

        res.send("<h4>" + arr + "</h4>");
    });
})


//----------------- EM TESTES
//Login user

/*
app.get('/login', function(req, res){
    
    var arrUser = [];
    var arrPass = [];
    var user = req.email;
    var pass = req.password;
    connection.query("select * from utilizadores", function(err, result){
        if(err)
            throw err;
        
        for(var i = 0; i != result.length; i++){
            arrUser.push(result[i].Email);
            arrPass.push(result[i].Password);
        }
        
        console.log(arrUser);
        console.log(arrPass);
        console.log(user);
        console.log(pass);
        /*for(var i = 0; i != arr.length; i++){
            if(arr[i].Email === user && arr[i].Password === pass){
                res.send("Utilizador connectado"); 
            }else{
                res.send("Email ou password errado");
            }
        }
           
    });
});


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

