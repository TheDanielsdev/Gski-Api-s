const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

const dbService = require('./db');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));






//SignUp to newsletter
app.post('/newsletter', (req, res) => {
    const {firstname, email} = req.body;
    const db = dbService.getDbServiceInstance();
    const result = db.signUpToNewsLetter(firstname, email); 
    
     //########   For User ##############
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gskiserver@gmail.com',
            pass: 'qjsdpzgtiwjkwent'
        }
    });
    var mailOptions = {
        from: 'gskiserver@gmail.com',
        to: email,
        subject: 'Thanks For Signing Up To Our NewsLetter',
        html: `<p>Hi <b>${firstname}</b>, Thank you for signing up to our Newsletter.</p>`
    };
      
    transport.sendMail(mailOptions, (err, info)=> {
        if(err) {
            console.log(err)
        } else {
            console.log('User Email sent: ' + info.response);
        }
    });


    
    //########   For Admin  ##############

    var transportAdmin = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gskiserver@gmail.com',
            pass: 'qjsdpzgtiwjkwent'
        }
    });
    var mailOptions = {
        from: 'gskiserver@gmail.com',
        to: 'newsletter@gskinitiative.org',//gski admin email
        subject: 'New SignUp To Our NewsLetter On GSKI NIG',
        html: `<p>Name: <b>${firstname}</b><br>Email: <b>${email}</b></p>`
    };
      
    transportAdmin.sendMail(mailOptions, (err, info)=> {
        if(err) {
            console.log(err)
        } else {
            console.log('Admin Email sent: ' + info.response);
        }
    });





    if(!firstname && email) {
        res.status(400).json({ message: 'all reqired'})
    }
 
    result
    .then(data => res.status(201).json({success : true , message : 'Signup successful'}))
    .catch(error => res.json({ message : error.message}));
    console.log('newsletter route is working')
 });




// ######  POST comments
 app.post('/comment', (req, res) => {
    const {name, comment} = req.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewComment(name, comment);
    
 
    result
    .then(data => res.status(200).json({success : true , message : 'Comment posted successfully'}))
    .catch(error => console.log(error));
    console.log('Comment route is working')
 });


//  ######## GET all comments on a particular page
app.get('/getAllCommentsIndexPage', (request, response) => {
    const db = dbService.getDbServiceInstance();    
    const result = db.getAllComments();

    result
    .then(data => response.json({        
        data : data
    }))
    .catch(error => console.log(error));
    console.log('Get comment route working');
   


});







app.listen(process.env.PORT, () => {
    console.log('App is running');
})