const a = require('../controllers/kelas')

module.exports = (route) => {
    route.post('/api/kelas', a.buatKelas)
    route.get('/api/carikelas', a.allDataKelas)
    route.get('/api/ambilkelas/:id', a.ambilKelas)
    route.put('/api/updatekelas/:id', a.updateKelas)
    route.delete('/api/hapuskelas/:id', a.hapusKelas)
}