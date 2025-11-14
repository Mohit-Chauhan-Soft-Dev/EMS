import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeesService'

const Employee = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const navigator = useNavigate()
    const { id } = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    useEffect(() => {
        if (id) {
            //fetch the employee and set the values
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
            }).catch((error) => {
                console.error("Error fetching employee data:", error)
            })
        }


    }, [id])

    // const handleFirstName = (e) => {
    //     setFirstName(e.target.value)
    // }

    // const handleLastName = (e) => {
    //     setLastName(e.target.value)
    // }

    // const handleEmail = (e) => {
    //     setEmail(e.target.value)
    // }

    const saveEmployee = (e) => {

        e.preventDefault();

        if (validateForm()) {

            const employee = { firstName, lastName, email };
            console.log(employee);

            if (id) {

                updateEmployee(id, employee).then((response) => {
                    console.log("Employee updated successfully", response.data)
                    navigator('/employees')
                }).catch((error) => {
                    console.error("Something went wrong", error)
                })

            } else {

                createEmployee(employee).then((response) => {
                    console.log("Employee added successfully", response.data)
                    navigator('/employees')
                }).catch((error) => {
                    console.error("Something went wrong", error)
                })

            }
        }

    }

    const validateForm = () => {
        let formIsValid = true;
        let errorsCopy = { ...errors }

        if (firstName.trim()) {
            errorsCopy.firstName = ''
        } else {
            formIsValid = false;
            errorsCopy.firstName = 'First Name is required'
        }

        if (lastName.trim()) {
            errorsCopy.lastName = ''
        } else {
            formIsValid = false;
            errorsCopy.lastName = 'Last Name is required'
        }

        if (email.trim()) {
            errorsCopy.email = ''
        } else {
            formIsValid = false;
            errorsCopy.email = 'Email is required'
        }

        setErrors(errorsCopy)

        return formIsValid;

    }

    const chagePageTitle = () => {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add New Employee</h2>
        }
    }

    return (
        <div className='container mt-5 padding-top'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        chagePageTitle()
                    }
                    <div className='card-body'>
                        <form action="">
                            <div className='form-group mb-2'>
                                <label className='form-label' for='fisrtName'>First Name : </label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee First Name'
                                    id='firstName'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label' for='lastName'>Last Name : </label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee Last Name'
                                    id='lastName'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label' for='email'>Email : </label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee Email'
                                    id='email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <div className='d-grid gap-2'>
                                <button className='btn btn-success' onClick={saveEmployee}>Submit</button>
                                <button className='btn btn-info' onClick={() => navigator('/employees')}>Back</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee
