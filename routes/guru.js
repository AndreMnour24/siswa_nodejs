const a = require("../controllers/guru")

module.exports = (route) => {
    route.post("/api/buatguru", a.buatGuru)
    route.get('/api/cariguru', a.allGuru)
    route.get('/api/ambilguru/:id', a.ambilGuru)
    route.put('/api/updateguru/:id', a.updateGuru)
    route.delete('/api/hapusguru/:id', a.hapusGuru)
}