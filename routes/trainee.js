const express = require('express');
const route = express.Router();

const { addTrainee, getAllTrainee, getTraineeById, updateTrainee, deleteTrainee } = require('./../controllers/trainee');

route.post("/add", addTrainee);

route.get("/getAll", getAllTrainee);

route.get("/:id", getTraineeById);

route.put("/updateTrainee/:id", updateTrainee);

route.delete("/deleteTrainee/:id", deleteTrainee);

module.exports = route;