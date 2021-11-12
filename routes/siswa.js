const b = require('../controllers/siswa')

module.exports = (route) => {
    route.post('/api/siswa', b.buatSiswa)
    route.get('/api/carisiswa', b.allDataSiswa)
    route.get('/api/ambilsiswa/:id', b.ambilSiswa)
    route.put('/api/updatesiswa/:id', b.updateSiswa)
    route.delete('/api/hapussiswa/:id', b.hapusSiswa)
}
