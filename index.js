//Auth 
//1. Hashing --> Convert the password into random gibbrish
//2. Encription --> vapis coveert karna into main password after getting a key that random gibbrish contain that key
//3. Json web token --> it take the json as a data. It gives you long string which have some data it have 3 parts header, payload, 
//4. Local Storage --> the local local storage store the token and when we need toh ascess the website the front end get renders after taking 
//token from the local storage
const express = require("express")
const jwt =require("jsonwebtoken");
const jwtPassword = "123456";

const app= express();

const ALL_USERS = [
    {
        username : "harkirat@gmail.com",
        password:"123",
        name : "harkirat singh"
    },
    {
        username : "raman@gmail.com",
        password:"123321",
        name : "Raman singh"
    },
    {
        username : "priya@gmail.com",
        password:"123321",
        name : "Priya kumari"
    }
];

function userExists(username, password){

}

app.post("/signin",function (req, res){
    const username = req.body.username;
    const password=req.body.password;
    if(!userExists(username,password)){
        return res.sendStatus(403).json({
            msg:"User does not exist in out in memory db",
        });
    }

    let token = jwt.sign({username:username},"kuch");
    return res.json({
        token,
    });

})

app.get("/users", function (req,res){
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
    }
    catch(err){
        return res.status(403).json({
            msg:"Invalid token",
        });
    }
});

app.listen(3000);
 