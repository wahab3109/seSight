import React,{useState,useEffect}from 'react'
import axios from "axios";
import UpdateTodo from './UpdateTodo';
export const Todo = () => {
    const [addItemBar,setAddItemBar]=useState(false);
    const [check,setCheck]=useState(false);
    const [search,setSearch]=useState('');
    const [todoId,setToDoId]=useState("");
    const [updateTodomodal,setUpdateTodoModal]=useState(false)
    const [todo,setTodo]=useState({
        text:"",
        status:"Pending"
    });
    const [data,setData]=useState([
        {text:"",
        status:""}
    ])
    const showAddItemBar=()=>{
            setAddItemBar(true);
    }
    const hideShowItemBar=()=>{
        setAddItemBar(false)
    }
    const addTodoHandler=(e)=>{
        const {name,value}=e.target;
        setTodo(prev=>{
            return {
                ...prev,
                [name]:value,
            }
        })

    }
    const addTodobutton=(e)=>{
        // setTodo(prev=>{
        //     return [...prev,e.target.value]
        // })
        console.log("tod ahdhasd",todo)
       addTodotoServer().then(()=>{
        setCheck(!check);
       })
    }
    useEffect(()=>{
        getDatafromServer().then(data=>{
            setData(data?.todo)
        })
        console.log("iteam data ha",data)
    },[check])
    // showing update todo modal
    const showUpdateTodoModal=(id)=>{
        setToDoId(id);
        setUpdateTodoModal(true)
    }
    // hide update todo modal
    const hideUpdataTodoModal=()=>{
        setUpdateTodoModal(false)
    }
    // posting data
    const addTodotoServer= async()=>{
        const res = await axios.post("http://localhost:5000/api/addTodo",{
            text:todo.text,
            status:todo.status
        })
        .catch(err=>{
            console.log('err is'.err)
        }
        )
        const data  = await res.data;
        return data;

    }
    // getting data
    const getDatafromServer = async ()=>{
        const res = await axios.get("http://localhost:5000/api/getTodo").
        catch(err=>{
            console.log("err is",err)
        })
        const data = await res.data;
        return data;
    } 

    // search change 
    const searchChangeHandler =(e)=>{
        setSearch(e.target.value)
    }
      return (
        <>
        {updateTodomodal && <UpdateTodo todoId={todoId} onChange={hideUpdataTodoModal}  data={data} check={check} setCheck={setCheck} />} 
    <div className='flex justify-center items-center pt-[5rem] '>
        <div className='sm:w-3/5 w-full m-auto flex bg-blue-400 rounded-md flex-col justify-center gap-4 pt-4'>
            <h1 className='text-4xl text-center font-bold'>TODO LIST</h1>
            <div className='sm:w-3/5 w-full  m-auto text-center flex flex-col justify-center items-center gap-4'>
            <input onChange={searchChangeHandler} type="text" className='focus:outline-none w-3/4 p-2 rounded-md' placeholder='Seach for a todo'></input>

            <button  onClick={showAddItemBar} className='bg-green-800 p-2 text-white  rounded-md'>Add New Item</button>

           {addItemBar && <div className=' w-3/4'>  <input name="text" onChange={addTodoHandler} type="text" className='focus:outline-none w-full p-2 rounded-md' placeholder='Add item'></input>
           <div className='flex flex-row justify-between mt-4 mb-8'>
          <button  onClick={addTodobutton}  className='bg-green-600 p-2 text-white  rounded-md'>Add Item</button>
          <button  onClick={hideShowItemBar}  className='bg-blue-600 p-2 text-white  rounded-md'>Close</button>

          </div>
</div>}
            </div>
                
            {data?.filter(y=>{
                if(search===""){
                    return y
                }
                else if(y.text.toLowerCase().includes(search.toLowerCase())){
                    return y;
                }
                
            })
            
            .map((x)=>{
                var bgClass=(x.status==="Completed")? "flex flex-row  gap-2 justify-around  p-1 rounded-md m-1 bg-green-400 " : "flex flex-row  gap-2 justify-around  p-1 rounded-md m-1 bg-red-500"
            return ( <div key={x._id} className={bgClass}>

                <h3 className='sm:text-2xl text-md font-semibold text-gray-700 w-4/5 pl-4'>{x?.text}</h3>
                <h3 className='sm:text-2xl text-md font-semibold text-gray-700 w-3/5 pl-4'>{x?.status}</h3>              
                    <button className='bg-blue-700 p text-white w-2/5 rounded-md' onClick={()=>{showUpdateTodoModal(x._id)}}>Open</button>
            </div>
           )}   
           )} 


        </div>
    </div>
    </>
  )
}
