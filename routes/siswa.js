const b = require('../controllers/siswa')
const p = require('../helper/upload')
const jwt = require('../helper/jwt')

module.exports = (route) => {
    route.post('/api/siswa', b.buatSiswa)
    route.get('/api/carisiswa', jwt.verifyTokenSiswa, b.allDataSiswa)
    route.get('/api/ambilsiswa/:id', jwt.verifyTokenSiswa, b.ambilSiswa)
    route.put('/api/updatesiswa/:id', b.updateSiswa)
    route.delete('/api/hapussiswa/:id', b.hapusSiswa)
    route.put("/api/uploadfoto/:id", p.uploadImage.single('image'), b.uploadProfilePicture)
    route.post('/api/loginsiswa', b.loginSiswa)
}