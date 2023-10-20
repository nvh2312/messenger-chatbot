require("dotenv").config();
import express from "express";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";


let app = express();

//config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`HC chatbot is running at the port ${port}`);
});
