import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";

const app = express();

app.get("/find", (req, res) => res.send("find"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let users = {};
// WIP
// app.post("/createUser", )

// // Rota "/findAll" aceita apenas admin
// app.use("/findAll", authorize("admin"))
// app.get("/findAll", (req, res) => res.send("API findAll :)"));

// // Rota "/findOne" aceita apenas professor
// app.use("/findOne", authorize("professor"))
// app.get("/findOne", (req, res) => res.send("API findOne ;)"));

// // Rota "/findWhatever" aceita ambos roles
// app.use("/findWhatever", authorize("admin", "professor"))
// app.get("/findWhatever", (req, res) => res.send("API findWhatever :p"));

app.listen(3000, () => console.log("Server started!"));
