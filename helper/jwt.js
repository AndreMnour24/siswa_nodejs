const jwt = require('jsonwebtoken')
const message = "Tidak memiliki Akses"

exports.verifyTokenSiswa = (req, res, next) => {
    let token = req.headers['token']
    if (token) {
        const decode = jwt.decode(token)
        if (decode) {

            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: message })
                }
                req.id = decoded.data.id
                req.type = 'Siswa'
                next()
            })
        } else {
            return res.status(401).json({ message: message })
        }
    } else {
        return res.status(401).json({ message: message })
    }
}
exports.verifyTokenAdmin = (req, res, next) => {
    let token = req.headers['token']
    if (token) {
        const decode = jwt.decode(token)
        if (decode) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: message })
                }
                req.id = decoded.data.id
                req.type = 'Admin'
                next()
            })
        } else {
            return res.status(401).json({ message: message })
        }
    } else {
        return res.status(401).json({ message: message })
    }
}
exports.verifyTokenAdminUser = (req, res, next) => {
    let token = req.headers['token']
    if (token) {
        const decode = jwt.decode(token)
        if (decode && decode.type.includes('Admin')) {
            jwt.verify(token, process.env.USER_TOKEN, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: message })
                }
                if (!decoded.data.active) return res.status(401).json({ message: "Akun tidak aktif, silahkan login ulang/hubungi admin" })
                req.id = decoded.data.id
                req.type = 'Admin'
                next()
            })
        } else if (decode && decode.type.includes('User')) {
            jwt.verify(token, process.env.USER_TOKEN, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: message })
                }
                if (!decoded.data.active) return res.status(401).json({ message: "Akun tidak aktif, silahkan login ulang/hubungi admin" })
                req.id = decoded.data.id
                req.type = 'User'
                next()
            })
        } else {
            return res.status(401).json({ message: message })
        }
    } else {
        return res.status(401).json({ message: message })
    }
}