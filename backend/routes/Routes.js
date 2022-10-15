import express from "express";
import {
    getSiswa,
    getSiswaByID,
    addSiswa,
    updateSiswa,
    deleteSiswa
} from "../controllers/SiswaControllers.js";

import {
    getDataSekolah,
    insertDataSekolah
} from "../controllers/SekolahControllers.js";


const router = express.Router();

// Siswa Section
router.get("/api/siswa", getSiswa);
router.get("/api/siswa/:id", getSiswaByID);
router.post("/api/siswa", addSiswa);
router.patch("/api/siswa/:id", updateSiswa);
router.delete("/api/siswa/:id", deleteSiswa);

// Sekolah Section
router.get("/api/dataSekolah", getDataSekolah);
router.post("/api/dataSekolah", insertDataSekolah);

export default router;