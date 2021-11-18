const db = require("../models/index")
const er = require("http-errors")

exports.buatGuru = async (req,res,next) => {
    try {
        const bg = await db.guru.create({
            "nama_guru": req.body.namaGuru,
            "mata_pelajaran": req.body.mataPelajaran
        })
        if (req.body.kelas.length > 0) {
            await db.guru_kelas.bulkCreate(req.body.kelas.map((v) => {
              return {
                guru_id: bg.id,
                kelas_id: v
              }
            }))
          }
        return res.status(201).json({
            data: bg,
            massage:"anda berhasil mengisikan data"
        })
    } catch (error) {
        next(error)
    }
}
exports.allGuru = async (req,res,next) => {
    try {
        const guru = req.query.nama_guru ? { nama_guru: { [Op.like]: `%${req.query.nama_guru}%` } } : {}
        const matapelajaran = req.query.mata_pelajaran ? { mata_pelajaran: { [Op.like]: `%${req.query.mata_pelajaran}%` } } : {}
        const order = req.query.order ? req.query.order : 'ASC'
        const orderBy = req.query.order_by ? req.query.order_by : 'id'
        const page = req.query.page ? parseInt(req.query.page) : {}
        const perPage = req.query.per_page ? parseInt(req.query.per_page) : {}
        let options = {
            order: [[orderBy, order]],
            where: { ...guru, ...matapelajaran},
            include:[{model:db.kelas}]
        }
        options.offset = req.query.page && (page - 1) * perPage
        options.limit = req.query.per_page && perPage
        const ag = await db.guru.findAndCountAll(options)
        return res.status(200).json({
            data: ag.rows,
            page: parseInt(req.query.page) || 'Tidak ditentukan',
            per_page: parseInt(req.query.per_page) || 'Tidak ditentukan',
            total_page: Math.ceil(ag.count / options.limit) || 1,
            total_count: ag.rows.length
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
}
exports.ambilGuru = async (req,res,next) => {
    try {
        const tg = await db.guru.findByPk(req.params.id)
        if(!tg) throw er("data tidak ditemukan")
        return res.status(200).json({
            data:tg
        })
    } catch (error) {
        next(error)
    }
}
exports.updateGuru = async (req,res,next) => {
    try {
        const ug = await db.guru.findOne({where:{id:req.params.id}})
        if(!ug) throw er("data tidak ditemukan")
        await ug.update({
            "nama_guru": req.body.namaGuru,
            "mata_pelajaran": req.body.mataPelajaran
        })
        return res.status(200).json({
            data:ug
        })
    } catch (error) {
        next(error)
    }
}
exports.hapusGuru = async (req,res,next) => {
    try {
        const dg = await db.guru.findOne({where:{id:req.params.id}})
        if(!dg) throw er("data tidak ditemukan")
        await dg.destroy()
        return res.status(200).json({
            data: dg,
            massage:"data sudah dihapus"
        })
    } catch (error) {
        next(error)
    }
}