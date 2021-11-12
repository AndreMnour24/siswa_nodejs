const { response } = require('express')
const db = require('../models/index.js')

exports.buatSiswa = async (req,res,next) => {
    try {
        const data = await db.siswa.create({
            "nama": req.body.nama,
            "alamat": req.body.alamat,
            "umur": req.body.umur
        }) 
        return res.status(201).json({
            data: data
        })
    } catch (error) {
    next(error)
    }
}

exports.allDataSiswa = async (req,res,next) => {
    try {
        const dj = await db.siswa.findAll()
        return res.status(200).json({
            data: dj
        })
    } catch (error) {
        next(error)
    }

}
exports.ambilSiswa = async (req,res,next) => {
    try {
        const jd = await db.siswa.findByPk(req.params.id)
        if (!jd) throw new Error('id tidak ada')
        return res.status(200).json ({
            data: jd
        })
    } catch (error) {
        next(error)
    }
}
exports.updateSiswa = async (req,res,next) => {
    try {
        const ad = await db.siswa.findOne({where:{id:req.params.id}})
        if(!ad) throw new Error('id tidak ditemukan')
        await ad.update({
            "nama": req.body.nama,
            "alamat": req.body.alamat,
            "umur": req.body.umur
        }) 
        return res.status(200).json({
            data: ad
        })
    } catch (error) {
        next(error)
    }
}
exports.hapusSiswa = async (req,res,next) => {
    try {
        const ed = await db.siswa.findOne({where:{id:req.params.id}})
        if (!ed) throw new Error ('id tidak diterima')
        await ed.destroy()
        return res.status(200).json({
            massage: 'Berhasil'
        })

    } catch (error) {
        next(error)
    }
}