import React, { useState } from 'react'
import axios from "axios"
const UpdateTodo = (props) => {
  console.log("props is",props.data)
  const id = props.data.find(x=>{
    return x._id===props.todoId});
  const [todaData,setTodoData]=useState({
    text:id?.text,
    status:id?.status
  })
  const [status,setStatus]=useState(todaData.status)
  const [todo,setTodo]=useState("")
  const inputChangeHandler=(e)=>{
    setTodo(e.target.value);
  }
      //dleting todo
      const deleteItemHandler= async (id)=>{
        const res = await axios.delete("http://localhost:5000/api/deleteTodo/"+id)
        .catch(err=>{
           console.log("error is",err)
        })
        props.setCheck(!props.check)
   }
   //update user text
   const updateTodoStatusHandler=async(id)=>{
      await axios.patch("http://localhost:5000/api/updateTodo/"+id,{
        text:todo,
        status:status
      }).catch(err=>{
        console.log(err)
      })
      props.setCheck(!props.check)


  }
  // update user  status
  const updateTodoStatHandler=async(id)=>{
    await axios.patch("http://localhost:5000/api/updateTodo/"+id,{
      text:setTodoData.text,
      status:"Completed"
    }).catch(err=>{
      console.log(err)
    })
    setStatus("Completed")
    props.setCheck(!props.check)


}
   const formSubmitHandler=(e)=>{
    e.preventDefault();
   }
  return (
    <div className='flex justify-center items-center w-full h-full fixed z-10 before:bg-black before:opacity-80 before:w-full before:h-[150%] -mt-16 before:content-[""] before:absolute border-2' >
        <div className='z-20 lg:w-2/5 md:w-3/5  m-auto flex flex-col bg-gray-100 gap-4 p-8 rounded-2xl pt-12 animate-spin-slow'>
            <form onSubmit={formSubmitHandler} className='flex flex-col gap-4 w-full '>
            <h1 className='text-center font-semibold text-4xl mb-2'>Update Item</h1>
               <input placeholder='update Item' defaultValue={todaData.text} onChange={inputChangeHandler} className='w-full rounded-md p-2 focus:outline-none' type="text"></input>
               <div className='flex flex-row gap-4 '>
               <button className='bg-green-300 rounded-md font-semibold w-full p-2 ' onClick={()=>{
                updateTodoStatusHandler(props.todoId)
               }}>Save</button> 
               <button className='bg-pink-700 rounded-md font-semibold w-full p-2' onClick={()=>{
                updateTodoStatHandler(props.todoId)
               }}>Mark As Complete</button> 
               <button onClick={()=>{deleteItemHandler(props.todoId)}} className='bg-pink-700 rounded-md font-semibold w-full p-2 '>Delete</button> 
               <button className='bg-red-700 rounded-md font-semibold w-full p-2' onClick={props.onChange}>Close</button> 

               </div>

            </form>
        </div>
    </div>
  )
}

export default UpdateTodo