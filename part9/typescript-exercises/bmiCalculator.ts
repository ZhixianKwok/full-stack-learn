
function calculateBmi(height:number,weight:number):string{
    let bmi:number = 0

    if(height<=0 || weight<=0){
        throw new Error('height and weight must be greater than zero')
    }
    bmi = weight / ((height / 100) ** 2)
    //BMI正常值在20至25之间，超过25为超重，30以上则属肥胖。
    switch(true){
        case bmi < 20:
            return `Slim (${height} ${weight})`
        case bmi >= 20 && bmi <=25:
            return `Normal (${height} ${weight})`
        default:
            return `Fat (${height} ${weight})`
    }
}

console.log(calculateBmi(180, 74))