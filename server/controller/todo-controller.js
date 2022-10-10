const mongoose = require("mongoose");
const Todo = require("../modal/todo");


async function addTodo(req,res,next){
    let todo;
    todo = new Todo({
        text:req.body.text,
        status:req.body.status
    })
    try{
        todo.save();
    }
    catch(err){
        console.log(err);
        res.status(404).json({message:'error creating todo'})

    }
    res.status(200).json({message:"todo added successfully"})

}
const getTodo = async (req,res,next)=>{
    let todo;
    try{
       todo = await Todo.find()
    }
    catch(err){
      console.log(err)
    }
    return res.status(200).json({todo:todo})
  }
  async function deleteTodo(req, res) {
    const todoId = req.params.id;
    try {
      await Todo.findByIdAndDelete(todoId);
      res.status(200).json({ msg: "Todo deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err.message });
    }
  }
  async function updateTodo (req,res){
    const todoId = req.params.id;
    try{
     const x =  await Todo.findByIdAndUpdate(todoId,{...req.body,text:req.body.text,status:req.body.status})
     res.json({ msg: "todo Updated" });

    }
    catch(err){
      console.log(err)
      return res.status(500).json({ msg: err.message });

    }
  }

exports.getTodo=getTodo;
exports.addTodo=addTodo;
exports.deleteTodo=deleteTodo;
exports.updateTodo=updateTodo;