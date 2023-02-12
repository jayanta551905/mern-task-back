const express = require("express");
const usersController = require("../controllers/usersController");
const tasksController = require("../controllers/tasksController");
const auth = require("../middleware/auth");
const router = express.Router();

//API endpoint here
// user controllers api
router.post("/registration", usersController.registration);
router.post("/login", usersController.login);
router.post("/profileUpdate",auth, usersController.profileUpdate);

// task controllers api
router.post("/createTask", auth, tasksController.createTask);
router.get("/updateTaskStatus/:id/:status", auth, tasksController.updateTaskStatus);
router.get("/listTaskByStatus/:status", auth, tasksController.listTaskByStatus);
router.get("/taskStatusCount", auth, tasksController.taskStatusCount);


module.exports=router;