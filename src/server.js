const express = require("express")
const server = express()
const routes = require("./routes")
// usando engine 
server.set("view engine", "ejs")
//habilitar arquivos staticos
server.use(express.static("public"))
//criando routes
server.use(routes)
//serve node  npm > rum > dev
server.listen(3000, () => console.log('rodando'))