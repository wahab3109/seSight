const express= require("express");

const  router = express.Router();
const {addTodo,getTodo, deleteTodo, updateTodo}=require("../controller/todo-controller");

router.post("/addTodo",addTodo)
router.get("/getTodo",getTodo);
router.delete("/deleteTodo/:id",deleteTodo)
router.patch("/updateTodo/:id",updateTodo)
module.exports=router;