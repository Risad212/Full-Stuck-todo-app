import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import {  useEffect, useState } from 'react';
import Logo from '../../logo.svg'
import './Todo.css'



   
const Todo = () => {
    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState([])
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [isEditItem , setIsEditItem] = useState(null)

    // add items button
    const addItems = () =>{
        if(!inputData){
         // return nothing if input will be empty
        }
        else if(inputData && !toggleSubmit){
             setItems(
                items.map((elem) =>{
                    if(elem._id === isEditItem){
                      return {elem, inputData:inputData}
                    }
                    return elem
                })
             )
             setToggleSubmit(true)
             setInputData('')
             setIsEditItem('')

             // Call api for update
             fetch(`http://localhost:5000/update/${isEditItem}`, {
                method: 'PATCH',
                body: JSON.stringify({inputData}),
                headers: {'Content-Type': 'application/json'},
             })
             .then(res => res.json())
             .then(result => {
                 console.log(result)
            })
        }
        else{
            passData() 
        }
    }
    const passData = () =>{
        fetch('http://localhost:5000/addItems', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({inputData})     
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            setInputData('')
    }

    // call data from sarver
    useEffect(() =>{
     fetch('http://localhost:5000/items')
    .then(res => res.json())
    .then(data => setItems(data))
    },[])


    // delate items
    function delateItem(event,id){
        fetch(`http://localhost:5000/delate/${id}`,{
            method: 'DELETE',
        })
        .then(res => res.json)
        .then(result => {
            if(result){
             event.target.parentNode.parentNode.parentNode.style.display = 'none'
          }
        })
    }


    // Edit Item
    function EditItem(editId){
         const newEditId = items.find((elem) =>{
              return elem._id === editId
         })
        setInputData(newEditId.inputData)
        setToggleSubmit(false)
        setIsEditItem(editId)
    }


    return (
        <>
         <div className="main">
            <div className="container">
               <img src={Logo} alt="" />
                   <input type="text" placeholder='add Items' value={inputData} onChange={(e) => setInputData(e.target.value)}/>
                   {toggleSubmit ? <button className='addButton'><FontAwesomeIcon icon={faPlus} onClick={addItems}/></button>:
                   <button className='addButton'><FontAwesomeIcon icon={faEdit} onClick={addItems}/></button>}
                 {/*----- show item ----- */}
                 <div className="showItem">
                   {
                    items.map((elem) =>{
                        const {inputData, _id} = elem
                        return (
                           <>
                             <div className='eachItem'>
                                <h3>{inputData}</h3>
                                 <div>
                                     <FontAwesomeIcon icon={faEdit} className="edit" onClick={() => EditItem(_id)}/>
                                     <FontAwesomeIcon icon={faTrashAlt} className="delate" onClick={(event) => delateItem(event, _id)}/>
                                      <span></span>
                                 </div>
                             </div>
                           </>
                        )
                     })
                   }
                 </div>
             </div>
         </div> 
        </>
    );
};

export default Todo;