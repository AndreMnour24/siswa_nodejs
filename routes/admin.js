const c = require('../controllers/admin')
const jwt = require('../helper/jwt')

module.exports = (route) => {
    route.post("/api/buatadmin", c.buatAdmin)
    route.get("/api/cariadmin", jwt.verifyTokenAdmin, c.cariAdmin)
    route.get("/api/ambiladmin/:id", jwt.verifyTokenAdmin, c.ambilAdmin)
    route.put("/api/updateadmin/:id", c.updateAdmin)
    route.delete("/api/hapusadmin/:id", c.deleteAdmin)
    route.post("/api/loginadmin", c.loginAdmin)
}