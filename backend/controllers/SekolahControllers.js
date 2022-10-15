import Sekolah from "../models/SekolahModels.js";
import path from "path";
import fs from "fs";

export const getDataSekolah = async(req, res) => {
    try {
        const response = await Sekolah.findAll()
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
}

export const insertDataSekolah = (req, res) => {
    if(!req.files) return res.status(400).json({msg: "No file selected"})
    const namaSekolah = req.body.namaSekolah
    const kepalaSekolah = req.body.kepalaSekolah
    const akreditasSekolah = req.body.rating
    const alamatSekolah = req.body.alamatSekolah
    const emailSekolah = req.body.emailSekolah
    const nohpSekolah = req.body.nohpSekolah
    const noTelpSekolah = req.body.noTelpSekolah
    const logo = req.files.logo
    const fileSize = logo.data.length
    const ext = path.extname(logo.name)
    const logoName = logo.md5 + Date.now() + ext
    const logoUrl = `${req.protocol}://${req.get("host")}/images/${logoName}`
    const allowedTypes = ['.jpg', '.png', '.jpeg']

    if(!allowedTypes.includes(ext.toLocaleLowerCase())) return res.status(403).json({msg: "File name must be .jpg, .png, or .jpeg"})
    if(fileSize > 5000000) return res.status(400).json({msg: "File must be less than 5MB!"})

    logo.mv(`./public/images/${logoName}`, async(err) => {
        if(err) return console.log(err);
        try {
            await Sekolah.create({
                namaSekolah: namaSekolah,
                kepalaSekolah: kepalaSekolah,
                akreditasSekolah: akreditasSekolah,
                alamatSekolah: alamatSekolah,
                emailSekolah: emailSekolah,
                nohpSekolah: nohpSekolah,
                noteleponSekolah: noTelpSekolah,
                logoName: logoName,
                logoUrl: logoUrl
            })
            res.status(200).json({msg: "Data sekolah berhasil di tambahkan"})
        } catch (error) {
            console.log(error)
        }
    })

}