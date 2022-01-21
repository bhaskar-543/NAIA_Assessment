// var faker = require('faker');

var database = { patientDetails: [] };
let date = new Date();

for (var i = 1; i <= 5; i++) {
    // console.log('new Date().toDateString)

    database.patientDetails.push({
        id: i,
        name: 'Bhaskar',
        age: '20',
        sex: 'Male',
        checkIn: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
        history: {
            basicStats: {
                height: 10,
                weight: 20
            },
            smoking:"Non-Smoker",
            alcoholDrinking:"Non-Drinker",
            drugUsage:[],
            surgeries:[]
        }
    });
}

console.log(JSON.stringify(database));