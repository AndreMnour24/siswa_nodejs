const da = require('../models/index.js')
const Op = require('sequelize').Op

exports.buatKelas = async (req,res,next) => {
    try {
        const dt = await da.kelas.create({
            "namaKelas": req.body.namaKelas,
            "mataPelajaran": req.body.mataPelajaran,
            "guru":req.body.guru
        })
        return res.status(200).json({
            data: dt
        })
    } catch (error) {
        next(error)
    }
} // memasukan atau membuat data kelas

exports.allDataKelas = async (req,res,next) => {
    try {
        const nKelas = req.query.namaKelas ? { namaKelas: { [Op.like]: `%${req.query.namaKelas}%` } } : {}
        const nGuru = req.query.guru ? { guru: { [Op.like]: `%${req.query.guru}%` } } : {}
        const order = req.query.order ? req.query.order : 'ASC'
        const orderBy = req.query.order_by ? req.query.order_by : 'id'
        const page = req.query.page ? parseInt(req.query.page) : {}
        const perPage = req.query.per_page ? parseInt(req.query.per_page) : {}
        let options = {
            order: [[orderBy, order]],
            where: { ...nKelas, ...nGuru},
            include:[{model:da.siswa},{model:da.guru}]
              
        }
        options.offset = req.query.page && (page - 1) * perPage
        options.limit = req.query.per_page && perPage
        const adt = await da.kelas.findAndCountAll(options)
        return res.status(200).json({
            data: adt.rows,
            page: parseInt(req.query.page) || 'Tidak ditentukan',
            per_page: parseInt(req.query.per_page) || 'Tidak ditentukan',
            total_page: Math.ceil(adt.count / options.limit) || 1,
            total_count: adt.rows.length
        })
    } catch (error) {
        next(error)
    }
} // menampilkan semua data with filter

exports.ambilKelas = async (req,res,next) => {
    try {
        const td = await da.kelas.findByPk(req.params.id,{include:[{model:da.siswa}]})
        return res.status(200).json({
            data: td
        })
    } catch (error) {
        next(error)
    }
} // menampilkan data yang dipilih berdasarkan ID

exports.updateKelas = async (req,res,next) => {
    try {
        const ud = await da.kelas.findOne({where:{id:req.params.id}})
        if(!ud) throw new Error('id tidak ditemukan')
        await ud.update({
            "nama kelas": req.body.namaKelas,
            "mata pelajaran": req.body.mataPelajaran,
            "guru":req.body.guru
        })
        return res.status(200).json({
            data: ud
        })
    } catch (error) {
        next(error)
    }
} // update data 

exports.hapusKelas = async (req,res,next) => {
    try {
        const dd = await da.kelas.findOne({where:{id:req.params.id}})
        if(!dd) throw new Error('id tidak diketahui atau tidak ditemukan')
        await dd.destroy()
        return res.status(200).json({
            massage: 'Data sudah dihapus'
        })
    } catch (error) {
        next(error)
    }
} // menghapus data
