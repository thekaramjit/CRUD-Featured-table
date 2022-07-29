import React, { Fragment, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { IEmployee, ISubEmployee } from '../model/model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { InputFeild } from './InputFeild';
import { Button } from 'react-bootstrap';
import { DialougBox } from './DialougBox';
import "./TableContainer.css"


type props = {
    employees: IEmployee[] | undefined
    handleDelete: (id: number | null) => Promise<void>
    setUpdateStatus: React.Dispatch<React.SetStateAction<string | null>>
}

export const TableComp: React.FC<props> = ({ employees, handleDelete, setUpdateStatus }) => {
    const [flag, setFlag] = useState(false)
    const [editEmployeeId, setEditEmployeeId] = useState<number | null>(null)
    const [show, setShow] = useState(false);
    const [idToBeDelete, setIdToBeDelete] = useState<number | null>(null)
    const [nameToBeDelete, setNameToBeDelete] = useState("")

    const handleClose = () => {
        setShow(false)
        setIdToBeDelete(null)
    };

    const handleShow = (id: number) => {
        setShow(true)
        setIdToBeDelete(id)
    }

    const handleAgree = () => {
        setShow(false)
        handleDelete(idToBeDelete)
    }

    return (
        <>
            <button className='btn btn-primary float-end my-3 mx-5' onClick={() => setFlag(true)}>ADD</button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Name</th>
                        <th>Father Name</th>
                        <th>Profile</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{employees?.map((employee, index: number) => {
                    const { id, name, fName, profile, age } = employee
                    return editEmployeeId !== id ? (<tr key={id}>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{fName}</td>
                        <td>{profile}</td>
                        <td>{age}</td>
                        <td>
                            <Button variant="danger" onClick={() => { handleShow(id); setNameToBeDelete(name) }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                            <button className="btn btn-outline-primary mx-3" onClick={() => { setEditEmployeeId(id) }}><FontAwesomeIcon icon={faEdit} /></button></td>
                    </tr>)
                        : (<InputFeild key={id} employeesLength={employees?.length} employee={employee} setFlag={setFlag} employeeId={id} operationToPerform="update" setUpdateStatus={setUpdateStatus} setEditEmployeeId={setEditEmployeeId} />)
                })}
                    {flag && <InputFeild  employeesLength={employees?.length} setFlag={setFlag} operationToPerform="create" setUpdateStatus={setUpdateStatus} setEditEmployeeId={setEditEmployeeId} />}
                </tbody>
            </Table>
            {employees?.length === 0 && <p className='text-danger noDataFound'>NO DATA FOUND!</p>}
            <DialougBox nameToBeDelete={nameToBeDelete} show={show} handleClose={handleClose} handleAgree={handleAgree} />
        </>
    )
}
