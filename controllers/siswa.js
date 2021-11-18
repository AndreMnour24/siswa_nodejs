const db = require('../models/index.js')
const Op = require('sequelize').Op
const er = require('http-errors')
const b = require('bcryptjs')
const jwt = require('jsonwebtoken')
const resize = require('../helper/resize')
const path = require('path')


exports.buatSiswa = async (req,res,next) => {
    try {
        const data = await db.siswa.create({
            "nama": req.body.nama,
            "alamat": req.body.alamat,
            "umur": req.body.umur,
            "password": await b.hash(req.body.password, 10),
            "kelas_id": req.body.kelas_id
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
        const alamat = req.query.alamat ? { alamat: { [Op.like]: `%${req.query.alamat}%` } } : {}
        const nama = req.query.nama ? { nama: { [Op.like]: `%${req.query.nama}%` } } : {}
        const order = req.query.order ? req.query.order : 'ASC'
        const orderBy = req.query.order_by ? req.query.order_by : 'id'
        const page = req.query.page ? parseInt(req.query.page) : {}
        const perPage = req.query.per_page ? parseInt(req.query.per_page) : {}
        let options = {
            order: [[orderBy, order]],
            where: { ...alamat, ...nama},
            include:[{model:db.kelas}] 
        }
        options.offset = req.query.page && (page - 1) * perPage
        options.limit = req.query.per_page && perPage
        const dj = await db.siswa.findAndCountAll(options)
        return res.status(200).json({
            data: dj.rows,
            page: parseInt(req.query.page) || 'Tidak ditentukan',
            per_page: parseInt(req.query.per_page) || 'Tidak ditentukan',
            total_page: Math.ceil(dj.count / options.limit) || 1,
            total_count: dj.rows.length
        })
    } catch (error) {
        next(error)
    }

}
exports.ambilSiswa = async (req,res,next) => {
    try {
        const jd = await db.siswa.findByPk(req.params.id,{include:[{model:db.kelas}]})
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
            "umur": req.body.umur,
            "password": req.body.password,
            "kelas_id": req.body.kelas_id
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
            massage: 'Data berhasil dihapus'
        })

    } catch (error) {
        next(error)
    }
}
exports.uploadProfilePicture = async (req,res,next) => {
    try {
        const upp = await db.siswa.findOne({where:{id:parseInt(req.params.id)}})
        if(!upp) throw er(400, "Data siswa tidak ditemukan")
        if (!req.file) throw er(400, "Foto tidak ditemukan")
        const width = req.body.width ? parseInt(req.body.width) : 500
        const length = req.body.length ? parseInt(req.body.length) : 500
        const folder = path.join(__basedir, 'assets/image/')
        const file = await new resize(folder, width, length).save(req.file.buffer)
        const pathFix = file ? "/image/siswa/" + file : false
        if (!pathFix) throw er(400, "Gambar tidak dapat diproses")
            await upp.update({ profpic: pathFix })
            return res.status(201).json({ data:pathFix })
    } catch (error) {
        next(error)
    }
}
exports.loginSiswa = async (req,res,next) => {
    try {
        const ls = await db.siswa.findOne({where:{nama:req.body.nama}})
        if(!ls) throw er(400,"id tidak ditemukan")
        const lsp = await b.compare(req.body.password, ls.password)
        if(!lsp) throw er(400,"password salah")
        const lc = jwt.sign(
            {
                data: ls
            },
            process.env.SECRET_KEY,
            { expiresIn: '30d' }
        )
        ls.password = null
        return res.json({
            data: ls,
            token: lc
        })
    } catch (error) {
        next(error)
    }
}