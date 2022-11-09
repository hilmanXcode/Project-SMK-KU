import Siswa from "../models/SiswaModels.js";
import path from "path";
import fs from "fs";
import cResponse from "../custom/response.js";

export const getSiswa = async(req, res) => {
    try {
        const response = await Siswa.findAll();
        cResponse(200, response, "Mengambil Semua Data Siswa", res);
    } catch (error) {
        console.log(error.message);
    }
}

export const getSiswaByID = async(req, res) => {
    try {
        const response = await Siswa.findOne({
            where: {
                id: req.params.id
            }
        });
        if(!response) return res.status(404).json({msg: "Data tidak ditemukan."})
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const addSiswa = (req, res) => {
    if(!req.files) return res.status(400).json({msg: "No file selected."});
    if(!req.body.nama || !req.body.umur || !req.body.kelas || !req.body.kelamin) return res.status(400).json({msg: "You must be fill the form."});
    const nama = req.body.nama;
    const umur = req.body.umur;
    const kelas = req.body.kelas;
    const jk = req.body.kelamin;
    const file = req.files.foto;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + Date.now() + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedTypes = ['.jpg', '.png', '.jpeg'];

    if(!allowedTypes.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "Invalid Image."});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5MB!"});

    file.mv(`./public/images/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Siswa.create({nama: nama, umur: umur, kelas: kelas, jk: jk, image: fileName, url: url});
            res.status(201).json({msg: "Data Created."});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateSiswa = async(req, res) => {
    const siswa = await Siswa.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!siswa) return res.status(404).json({msg: "No Data Found."});
    if(!req.body.nama || !req.body.umur || !req.body.kelas || !req.body.kelamin) return res.status(400).json({msg: "Please fill all form."});

    let fileName = "";
    if(!req.files){
        fileName = siswa.image;
    }
    else {
        const file = req.files.foto;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + Date.now() + ext;
        const allowedTypes = ['.jpg', '.png', '.jpeg'];

        if(!allowedTypes.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "Invalid Image."});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5MB!"});

        let filePath = `./public/images/${siswa.image}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const nama = req.body.nama;
    const umur = req.body.umur;
    const kelas = req.body.kelas;
    const jk = req.body.kelamin;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Siswa.update({
            nama: nama,
            umur: umur,
            kelas: kelas,
            jk: jk,
            image: fileName,
            url: url
        },
        {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({msg: `Siswa With ID: ${req.params.id} Succesfully Updated.`});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteSiswa = async (req, res) => {
    const siswa = await Siswa.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!siswa) return res.status(404).json({msg: "No Data Found"});

    let filePath = `./public/images/${siswa.image}`;
    fs.unlinkSync(filePath);
    await Siswa.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({msg: `Siswa with ID: ${req.params.id} Successfully deleted.`});
}

