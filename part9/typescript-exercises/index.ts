/*
 * @Author: zhixian
 * @Date: 2021-05-09 17:48:08
 * @Description:
 */
import express from "express";
import bmiCalculator from "./bmiCalculator";
import calculateExercises from "./calculateExercises";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (undefined == req.query.height || undefined == req.query.weight) {
    res.send({
      error: "malformatted parameters",
    });
  } else {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    res.send(bmiCalculator(height, weight));
  }
});

app.post("/exercises", (req:{body:{daily_exercises:number[],target:number}}, res) => {
  const dailyExercises = req.body.daily_exercises;
  const target = req.body.target;
  if (undefined === dailyExercises || target === undefined) {
    res.send({
      error: "parameters missing",
    });
  } else if(Object.prototype.toString.call(dailyExercises) === "[object Array]" && Object.prototype.toString.call(target) === "[object Number]") {
    res.send(calculateExercises(dailyExercises, target));
  } else {
    res.send({
          error: "malformatted parameters",
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
