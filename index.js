const express = require ('express');
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
const sql= require('./db/db');
const CRUD = require('./db/CRUD');
const port = 3000;
const dbConfig = require ('./db/db.config')
const CreateDB = require('./db/CreateDB');
const csv=require('csvtojson');
let alert = require('alert');
const cookieParser = require('cookie-parser');
/*
const THREE = require ('three');
const PLYLoader = require('three-ply-loader')(THREE);

var reader = new FileReader();
const query = 'SELECT file FROM models WHERE file_name = ?';
const params = ['sagit'];
reader.readAsArrayBuffer(query);
reader.onload = function() {
  var arrayBuffer = reader.result;
  // Do something with the array buffer
};
var parser = new PLYParser();
var plyData = parser.parse(arrayBuffer);
var exporter = new PLYExporter();
var plyFileContent = exporter.export(plyData);
// Save the PLY file content to a file
var blob = new Blob([plyFileContent], {type: 'text/plain'});
saveAs(blob, 'model.ply');





app.get('/model', (req, res) => {
  const query = 'SELECT file FROM models WHERE file_name = ?';
  const params = ['sagit'];

  connection.query(query, params, (error, results) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }
    if (results.length === 0) {
      res.sendStatus(404);
      return;
    }

    const modelData = results[0].file;
    const loader = new PLYLoader();
    const geometry = loader.parse(modelData);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff});
    const mesh = new THREE.Mesh(geometry, material);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 600);
    renderer.setClearColor(0xcccccc, 1);

    const camera = new THREE.PerspectiveCamera(45, 800 / 600, 0.1, 1000);
    camera.position.z = 5;

    const scene = new THREE.Scene();
    scene.add(mesh);

    const render = () => {
      requestAnimationFrame(render);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    render();

    const imageBuffer = renderer.domElement.toBuffer((err, buffer) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length
      });
      res.end(buffer);
    });
  });
});


*/


app.use(express.static(path.join(__dirname,'minimal/static')));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.set("views", path.join(__dirname, "minimal/Views"));
app.set("view engine",'pug');

app.listen(port, () =>{
    console.log("server is running on port ", port);
})

//homepage
app.get('/', (req,res) =>{
    res.redirect('/home');
});

//routs
app.get("/home", (req,res) => {
    res.render('ModelPageNew');
});



app.get("/Model", CRUD.showAllNotes);

app.get('/FullNote/:id', (req,res) =>{
    const NoteId= req.params.id;
    res.cookie("Note_Id", NoteId);
    res.redirect('/FullNote');
});

app.get('/FullNote', CRUD.showFullNote);





    app.get('/About', (req, res) => {
        const csvPath1 = path.join(__dirname, "./content/slide_images.csv");
        csv().fromFile(csvPath1).then((jsonObj1) => {
            console.log(jsonObj1);
            res.render('About', {
                title: 'About Us',
                var1: jsonObj1,
                content: 'website is a platform whose purpose is to make appointments for gel nail polish more accessible.Today, most women who regularly apply gel nail polish depend on the availability of the beautician. They have to schedule the future appointment long in advance, and in most cases there is no flexibility in the hours, and they have to adjust their time according to the beautician&apos;s availability. This platform will allow great flexibility for customers, so that even with short notice they can make an appointment at a time and location that suits them.'
            })
        })

    });


    app.get('/LogIn', (req, res) => {
        res.render('LogIn', {
            title: 'Log In'
        });

    });


    app.get('/NewAccount', (req, res) => {
        res.render('NewAccount', {
            title: 'Sign Up'
        });
    });


    app.get('/NewAccountWithNav', (req, res) => {
        res.render('NewAccountWithNav', {
            title: 'Sign Up'
        });
    });

    app.get('/WriteReview', (req, res) => {
        res.render('WriteReview', {
            title: 'WE APPRECIATE YOUR REVIEW!',
            message: 'Your review will help us to improve our web hosting quality products, and customer services'
        });
    });

    app.get('/CreateTable', [CreateDB.CreateUsersTable, CreateDB.CreateCosmeticiansTable, CreateDB.CreateAppointmentsTable, CreateDB.CreateReviwesTable]);
    app.get("/InsertData", [CreateDB.InsertUsersData, CreateDB.InsertCosmeticiansData, CreateDB.InsertReviewsData, CreateDB.InsertAppointmentsData]);
    app.get('/ShowUsersTable', CreateDB.ShowUsersTable);
    app.get('/ShowCosmeticiansTable', CreateDB.ShowCosmeticiansTable);
    app.get('/ShowReviewsTable', CreateDB.ShowReviewsTable);
    app.get('/ShowAppointmentsTable', CreateDB.ShowAppointmentsTable);
    app.get('/DropTable', [CreateDB.DropUsersTable, CreateDB.DropCosmeticiansTable, CreateDB.DropReviewsTable, CreateDB.DropAppointmentsTable]);


    app.post('/LogIn', CRUD.LogIn);
    app.post('/insertNewAccount', CRUD.insertNewAccount);
    app.post('/InsertNewModel', CRUD.insertNewModel);
//.post('/insertNewReview', CRUD.insertNewReview);






/*
app.get('/yourpath', (req, res) => {
  const sql = "SELECT ply_field FROM yourtable WHERE id=1";
  connection.query(sql, (err, result) => {
      if (err) throw err;
      const plyData = result[0].ply_field;
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', 'attachment; filename="yourfile.ply"');
      res.setHeader('Content-Length', plyData.length);
      res.end(plyData);
  });




*/

