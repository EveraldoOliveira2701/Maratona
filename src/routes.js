const express = require("express");
const routes = express.Router()
const views = __dirname + "/views/"
const profile = {
    nome:"Everaldo",
    avatar:'https://avatars.githubusercontent.com/u/109829098?v=4',
    "monthly-bud get": 3000,
    "days-per-week":5,
    "hours-per-day":5,
    "vacation-per-year": 4
}
routes.get('/',(req,res) => res.render(views + "index"))
routes.get('/job',(req,res) => res.render(views + "job"))
routes.get('/job/edit',(req,res) => res.render(views + "job-edit"))
routes.get('/profile',(req,res) => res.render(views + "profile",{profile}))
module.exports = routes;