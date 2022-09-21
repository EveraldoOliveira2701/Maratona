const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')
module.exports = {
    index(req, res){
        const jobs = Job.get();
        const profile = Profile.get();
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length //leitura de quantidade de jobs dentro do array
        }

        //total de hr/dia em progress
        let jobTotalHours = 0
        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress';
            //somando a quantidade de status
            statusCount[status] += 1;
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']): jobTotalHours
            return {
            ...job,
            remaining,
            status,
            budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        }) 
        //qtd de hrs que quero trabalhar menos qtd h/dia de cada job progres

        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return res.render("index",{jobs: updatedJobs, profile:profile, statusCount:statusCount, freeHours: freeHours})
    }
}
