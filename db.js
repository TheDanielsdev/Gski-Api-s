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










}


module.exports = DbService;