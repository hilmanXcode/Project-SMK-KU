import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

// Siswa Model
const Siswa = db.define("Siswas", {
    nama: DataTypes.STRING,
    umur: DataTypes.INTEGER,
    kelas: DataTypes.STRING,
    jk: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Siswa;

(async () =>{
    db.sync();
})();