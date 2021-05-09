interface TrainingEffeact {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

function calculateExercises(traningHoursOfDay: number[], target: number):TrainingEffeact {
    
    const periodLength = traningHoursOfDay.length,
          trainingDays = traningHoursOfDay.filter(item=>item > 0).length,
          sumTrainingHours = traningHoursOfDay.reduce((prev,next)=> prev + next, 0),
          average = sumTrainingHours / periodLength;

    let rating = 0,
        ratingDescription = "bad",
        success = false;
          
    
    if( average > target ) {
        rating = 2;
        success = true;
        ratingDescription = "very good";
    } else if (average >= target /2){
        rating = 1;
        success = true;
        ratingDescription = "good";
    } 

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}


// if(process.argv.length >= 2){
//     const args = process.argv.slice(2).map(item => Number(item));
//     const target = args.shift() || 2;
//     const traningHoursOfDay = args;
//     console.log(calculateExercises(traningHoursOfDay, target));
// }


export default calculateExercises;