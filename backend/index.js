import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import router from "./routes/Routes.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(FileUpload());
app.use(router);

class controller{
    constructor(name){
        this.name = name;
    }
    get(models){
        if(models == "siswa"){
            console.log(this.name);
        }
    }
}

const controllers = new controller("testing");

controllers.get("siswa");

app.listen(5000, () => console.log("Server Berjalan Pada Port 5000"));