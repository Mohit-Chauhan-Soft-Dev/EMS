import React, { useEffect, useState } from 'react'
import { getEmployees, deleteEmployee } from '../services/EmployeesService'
import { useNavigate } from 'react-router-dom'

const ListEmployees = () => {


    const [employees, setEmployees] = useState([])

    useEffect(() => {
        fetchEmployees()
    }, [])

    const fetchEmployees = () => {
        getEmployees().then((response) => {
            setEmployees(response.data)
        }).catch((error) => {
            console.error("Error fetching employees:", error)
        })
    }

    const navigate = useNavigate();

    const addNewEmployee = () => {
        navigate('/add-employee');
    }

    const updateEmployee = (id) => {
        navigate(`/update-employee/${id}`);
    }

    const removeEmployee = (id) => {

        console.log("Deleting employee with id:", id)

        deleteEmployee(id).then((response) => {
            fetchEmployees(); // Refresh the list after deletion
        }).catch((error) => {
            console.error("Error deleting employee:", error)
        })

    }

    // const dummyData = [
    //     { id: 'ABXY1', firstName: 'John', lastName: 'Doe', email: "johndoe@gmail.com" },
    //     { id: 'ABXY2', firstName: 'Jane', lastName: 'Smith', email: "janesmith@gmail.com"},
    //     { id: 'ABXY3', firstName: 'Alice', lastName: 'Johnson', email: "alicejohnson@gmail.com" },
    //     { id: 'ABXY4', firstName: 'Bob', lastName: 'Brown', email: "bobbrown@gmail.com"}
    // ]

    return (
        <div className="container mt-5">

            <h2 className="text-center">List of Employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add New Employee</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id.toUpperCase()}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td className>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} style={{margin:'10px'}}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployees
