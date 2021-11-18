const dad = require('../models/index')
const b = require('bcryptjs')
const er = require('http-errors')
const jwt = require('jsonwebtoken')


exports.buatAdmin = async (req,res,next) => {
    try {
        const dt = await dad.admin.create({
            "nama": req.body.nama,
            "password": await b.hash(req.body.password, 10),
            "nip": req.body.nip
        })
        return res.status(201).json({
            data: dt
        })
    } catch (error) {
        next(error)
    }
}
exports.cariAdmin = async (req,res,next) => {
    try {
        const dab = await dad.admin.findAll()
        return res.status(200).json({
            data: dab
        })
    } catch (error) {
        next(error)
    }
}
exports.ambilAdmin = async (req,res,next) => {
    try {
        const dap = await dad.admin.findByPk(req.params.id)
        if (!dap) throw er(400,"id tidak ditemukan")
        return res.json({
            data:dap
        })
    } catch (error) {
        next(error)
    }
}
exports.updateAdmin = async (req,res,next) => {
    try {
        const dai = await dad.admin.findOne({where:{id:req.params.id}})
        if(!dai) throw er(400,"id tidak ada")
        await dai.update({
            "nama": req.body.nama,
            "password": await b.hash(req.body.password, 10),
            "nip": req.body.nip
        })
        return res.json({
            data: dai
        })
    } catch (error) {
        next(error)
    }
}
exports.deleteAdmin = async (req,res,next) => {
    try {
        const dak = await dad.admin.findOne({where:{id:req.params.id}})
        if(!dak) throw er(400,"Data tidak ditemukan")
        await dak.destroy()
        return res.json({
            massage: "data sudah dihapus"
        })
    } catch (error) {
        next(error)
    }
}
exports.loginAdmin = async (req,res,next) => {
    try {
        const dao = await dad.admin.findOne({where:{nip:req.body.nip}})
        if(!dao) throw er(400,"Nip tidak ditemukan")
        const doo = await b.compare(req.body.password, dao.password)
        if(!doo) throw er(400, "password salah")
        const tk = jwt.sign(
            {
                data: dao
            },
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        )
        dao.password = null
        return res.json({
            data: dao,
            token: tk,
            massage: "login berhasil"
        })
    } catch (error) {
        next(error)
    }
}