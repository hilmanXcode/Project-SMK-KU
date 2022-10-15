import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Sekolah = db.define("IdentitasSekolah", {
    namaSekolah: DataTypes.STRING,
    kepalaSekolah: DataTypes.STRING,
    akreditasSekolah: DataTypes.STRING,
    alamatSekolah: DataTypes.STRING,
    emailSekolah: DataTypes.STRING,
    nohpSekolah: DataTypes.INTEGER,
    noteleponSekolah: DataTypes.INTEGER,
    logoName: DataTypes.STRING,
    logoUrl: DataTypes.STRING
},
{
    freezeTableName: true
});

export default Sekolah;

( async() => {
    db.sync();
})()