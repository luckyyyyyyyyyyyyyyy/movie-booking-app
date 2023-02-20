const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("./models/user.model");

const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");
const constants = require("./utils/constants");
const notificationClient = require("./utils/NotificationClient")
notificationClient.sendEmail(["lingaraju8824@gmail.com"],"Test",`<h1>welcome to book my show</h1>`,null)


const app = express();

app.use(bodyParser.json());


mongoose.connect(dbConfig.DB_URL, ()=>{
console.log("connected to Mongo DB")
init();
},err=>{
    console.log("Error: ",err.message)
})


require("./routes/movie.route")(app);
require("./routes/theatre.route")(app);
require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/booking.route")(app);
require("./routes/payment.route")(app);



app.get("/",(req,res)=>{
    res.send("Inside Movie Booking Application");
})


app.listen(serverConfig.PORT,()=>{
    console.log(`Application running on port ${serverConfig.PORT}`);
})


async function init(){

    try{
        const user = await User.create({
            name:"admin",
            userId:"admin",
            email:"admin@gmail.com",
            password:bcrypt.hashSync("admin",10),
            userStatus:constants.userStatus.approved,
            userTypes:constants.userTypes.admin
        });

        console.log("Admin user created successfully");
    }catch(e){
        console.log(e.message);
    }

}

