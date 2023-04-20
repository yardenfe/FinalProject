const sql = require('./db');
let alert = require('alert');
const path = require('path');
const csv=require('csvtojson');
const cookieParser = require('cookie-parser');



const LogIn = (req, res)=>{
            if (!req.body) {
                res.status(400).send({message: "Content can not be empty!"});
                return;
            }

            var email = req.body.email;
            var password=req.body.password;

            console.log(email);
            sql.query("SELECT * FROM users where (email =? AND password =?)" , [email,password] , (err, results, fields)=>{
                if (err) {
                    console.log("ERROR IS: " + err);
                    res.status(400).send("Somthing is wrong with query" + err);
                    return;
                }
                if(results.length ==0){
                   alert("Email or Password is incorrect");
                   return;
                }

                res.cookie("userId", results[0].id);
                res.cookie("userName", results[0].fname);
                console.log("User found");
                res.render('SuccessMessage', {
                    message: 'Welcome ' + results[0].fname + '!'
                });
                return;
            })
     };

const insertNewAccount = (req,res) =>{
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    const newUser = {
    "email": req.body.email,
    "fname": req.body.fname,
     "lname": req.body.lname,
     "password": req.body.password,
     "age": req.body.age,
     "phone": req.body.phone

    }

    const Q1 = 'INSERT INTO Users SET ?';
    sql.query(Q1, newUser, (err, mysqlres) => {
        if(err){
            console.log("error : ", err);
            alert("Email already exists");
            return;
        }
        console.log("created new user:",  { id: mysqlres.insertId});
        res.render('LogIn' ,
            {title:"Log In",
        });
        return;

    })
};


const insertNewModel = (req,res) =>{

    const newModel = {
    "file_name": req.body.name,
    "file": req.body.file

    }
    console.log("file:" + req.body.file + req.body.name);
    const Q1 = 'INSERT INTO models SET ?';
    sql.query(Q1, newModel, (err, mysqlres) => {
        if(err){
            console.log("error : ", err);
            alert("Email already exists");
            return;
        }

        res.render('LogIn' ,
            {title:"Log In",
        });
        return;

    })
};

const showAllNotes = (req,res) =>{
    //const ModelId= req.cookies.ModelId;
    // add where modelId= ?
    sql.query("SELECT * FROM notes" ,  (err, results, fields)=>{
        if(err) {
            res.status(400).send("error");
            return;
        };
        if(results.length ==0){
             res.render('SuccessMessage', {
                message: "There are no notes"

            });
            return;
        }

        res.render('ModelWithNotes', {
            res:results

        });
        return;
    });
};

const showFullNote = (req,res) =>{
    const note_id= req.cookies.Note_Id;
    sql.query("SELECT * FROM notes where (Id =?)" , [note_id] , (err, results, fields)=>{
        if(err) {
            res.status(400).send("error");
            return;
        };

         res.render('NotePage', {
            header: results[0].Header,
            content: results[0].Content,
            file: results[0].AddedFile,
            date: results[0].NoteDT


        });
        return;

    });
};



module.exports= {
    LogIn,
    insertNewAccount,
insertNewModel,
showAllNotes,
showFullNote};

