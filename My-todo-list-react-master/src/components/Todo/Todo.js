import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import {  useEffect, useState } from 'react';
import Logo from '../../logo.svg'
import './Todo.css'



   
const Todo = () => {
    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState([])
    // add items button
    const addItems = () =>{
        if(!inputData){
         // return nothing if input will be empty
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



    return (
        <>
         <div className="main">
            <div className="container">
               <img src={Logo} alt="" />
                   <input type="text" placeholder='add Items' value={inputData} onChange={(e) => setInputData(e.target.value)}/>
                   <button className='addButton'><FontAwesomeIcon icon={faPlus} onClick={addItems}/></button>
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
                                     <FontAwesomeIcon icon={faEdit} className="edit"/>
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