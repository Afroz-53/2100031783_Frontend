import React,{useState} from 'react'
import Swal from 'sweetalert2';

import Head from './Head';
import List from './List';
import Addemp from './Addemp';
import Editemp from './Editemp';

import {employeesData} from '../../data';
function Board(){

    const [employees,setEmployees] = useState(employeesData);
    const [selectEmployee,setSelectedEmployee]=useState(null);
    const [isAdding,setIsAdding]= useState(false);
    const [isEditing,setIsEditing]= useState(false);




    const handleEdit=(id)=>{
        const [employee]= employees.filter(employee=>employee.id===id);


        setSelectedEmployee(employee);
        setIsEditing(true);

    }

    const handleDelete=(id)=>{
        Swal.fire({
            icon: 'Warning',
            title:'Confirmation to delte data!',
            text: "Once Deleted data can be retrived",
            showCancelButton:true,
            ConfirmButtonText:'I agree!',
            cancelButtonText:'No,cancel',


        }).then(resutl=>{
            if(resutl.value){
                const[employee]=employees.filter(employee=> employee.id===id);


                Swal.fire({
                    icon:'succesfull',
                    title:'deleted',
                    text:`${employee.firstName}${employee.lastName}your data has been deleted`,
                    showConfirmationButton:false,
                    time:700,
                });


                setEmployees(employees.filter(employee=>employee.id!==id));

            }
        });


    }


    return(
        <div className='container'>
            {!isAdding && !isEditing && (
                <>
                <Head
                    setIsAdding={setIsAdding}
                />
                <List
                employees={employees}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                />

                
                
                
                </>
            )}

            {isAdding &&(
                <Addemp

                employees={employees}
                setEmployees={setEmployees}
                setIsAdding={setIsAdding}
                />
            )}
            {isEditing &&(
                <Editemp
                employees={employees}
                setSelectedEmployee={setSelectedEmployee}
                setEmployees={setEmployees}
                setIsEditing={setIsEditing}
                
                />


            )}
            


        </div>
    )
}
export default Board