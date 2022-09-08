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
const jobs = [
{
    id: 1,
    name: "Pizzaria Guloso",
    "daily-hours": 2,
    "total-hours": 60,
    createdAt: Date.now()
},
{
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    createdAt: Date.now()
}
]
function remainingDays(job) {
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    const Date = new createdDate(job.createdAt)
    const dueDay = createdDate.getDay() + Number(remainingDays)
    const dueDateInMs = createdDate.setDate(dueDay)
    const timeDiffInMs = dueDateInMs - Date.now()
    //transf.milli em dias
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.floor(timeDiffInMs / dayInMs)
    return dayDiff
}
routes.get('/',(req,res) =>{
    const updateJobs= jobs.map((job) => {
    const remaining = remainingDays(job)
    const status = remaining <= 0 ? 'done' : 'progress'
    return {
        ...job,
        remaining,
        status,
        budget: profile["value-hour"] * job["total-hours"]
    }
    })    
    return res.render(views + "index",{jobs: updateJobs})}
)
routes.get('/job',(req,res) => {res.render(views + "job")})
routes.post('/job',(req,res) => {
    const lastId = jobs[jobs.length - 1]?.id || 1;
    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        createdAt: Date.now()
    })
    return res.redirect('/')
})
routes.get('/job/edit',(req,res) => res.render(views + "job-edit"))
routes.get('/profile',(req,res) => res.render(views + "profile",{profile}))
module.exports = routes;