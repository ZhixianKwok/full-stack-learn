interface HealthStatus {
    height:number,
    weight:number, 
    bmi:string
}

function calculateBmi(height: number, weight: number): HealthStatus {
  let bmiIndex = 0,
      bmi  = "";

  if (height <= 0 || weight <= 0) {
    throw new Error("height and weight must be greater than zero");
  }
  bmiIndex = weight / (height / 100) ** 2;
  //BMI正常值在20至25之间，超过25为超重，30以上则属肥胖。
  switch (true) {
    case bmiIndex < 20:
        bmi = `Slim (${height} ${weight})`;
        break;
    case bmiIndex >= 20 && bmiIndex <= 25:
        bmi = `Normal (${height} ${weight})`;
        break;
    default:
        bmi = `Fat (${height} ${weight})`;
  }

  return {
    height,
    weight,
    bmi
  };
}

// const height = Number(process.argv[2]);
// const weight = Number(process.argv[3]);
//console.log(calculateBmi(height, weight));

export default calculateBmi;