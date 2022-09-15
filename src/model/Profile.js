let data  = {
    nome:"Everaldo",
    avatar:'https://avatars.githubusercontent.com/u/109829098?v=4',
    "monthly-bud get": 3000,
    "days-per-week":5,
    "hours-per-day":5,
    "vacation-per-year": 4,
    "value-hour": 75,
};
module.exports = {
    get(){
        return data;
    },
    update(newData){
      data = newData;  
    }
}


