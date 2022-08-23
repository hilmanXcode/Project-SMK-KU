import express from "express";
import {
    getSiswa,
    getSiswaByID,
    addSiswa,
    updateSiswa,
    deleteSiswa
} from "../controllers/SiswaControllers.js";


const router = express.Router();

router.get("/api/siswa", getSiswa);
router.get("/api/siswa/:id", getSiswaByID);
router.post("/api/siswa", addSiswa);
router.patch("/api/siswa/:id", updateSiswa);
router.delete("/api/siswa/:id", deleteSiswa);

export default router;