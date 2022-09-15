const Job = require('../model/job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')
module.exports = {
    index(req,res){
        const jobs = Job.get();
        const profile = Profile.get();
        const statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length //leitura de quantidade de jobs dentro do array
        }
        const updatedJobs = jobs.map((job) => {
        const remaining = JobUtils.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
        return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
        }
        }) 
        return res.render("index",{jobs: updatedJobs, profile:profile, statusCount:statusCount})
    }
}