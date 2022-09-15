const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

  
const connection = mysql.createConnection({
   
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,

});

connection.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    console.log('GSKI Database ' + connection.state + ', Good job!');
});







class DbService {
    static getDbServiceInstance() {        
        return instance ? instance : new DbService();
    }

    // ##########   For POST signUp to NewsLetter

    async signUpToNewsLetter(firstname, email) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {               
            let checkIfAUserExists = "SELECT * FROM newletters WHERE email = ? LIMIT 1";
                connection.query(checkIfAUserExists, [email], (err, result) => {                   
                    if(result.length) {
                        console.log('User Already Exist')
                        return new Error('User Already Exist');
                        
                    } else {
                        // If a user does not exist then :
                        const query = "INSERT INTO newletters (firstname, email, date_added) VALUES (?, ?, ?);";
                        connection.query(query, [firstname, email, dateAdded], (err, result)=> {
                         //if theres an error then:
                        if(err) reject(new Error(err.message));
                        //if there is no error then:
                        // resolve(result.insertId);
                        })
                    }
                })

            });            
            // console.log(insertId);
            // return insertId;
        } catch(err) {
            console.log(err);
        }
    }


    // ############# For POST into comment table

    async insertNewComment(name, comment) {
        try {
            const dateAdded = new Date();
            const insert = await new Promise((resolve, reject) => {
              
                //we use qustion marks so as to avoid sql injection
                const query = "INSERT INTO comment (name, comment, date_added) VALUES (?, ?, ?);";

                connection.query(query, [name, comment, dateAdded],(error, results) => {
                    //if theres an error then:
                    if(error) reject(new Error(error.message));
                    //if there is no error then:
                   
                })

            });

            //this console.log below prints an empty array [] to the console for now because no data exists yet.
            // console.log(insertComment);
            // return insert;
        } catch(err) {
            console.log(err);
        }
    }




    // ####### GET all comments

    async getAllComments() {
        try{
            const response = await new Promise((resolve, reject) => {
                //names is our DB table NAme
                const query = "SELECT * FROM comment";

                connection.query(query, (err, results) => {
                    //if theres an error then:
                    if(err) reject(new Error(err.message));
                    //if there is no error then:
                    resolve(results);                    
                })

            });

            //this console.log below prints an empty array [] to the console for now because no data exists yet.
            // however it will show the data that we are getting if it is not empty and our request is sucessful
            // console.log(response);
            return response;
        } catch(err) {
            console.log(err);
        }
    }
    









}


module.exports = DbService;