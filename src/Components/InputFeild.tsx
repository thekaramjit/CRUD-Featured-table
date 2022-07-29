import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { ISubEmployee } from '../model/model';
import axios from 'axios';
import "./TableContainer.css"

type props = {
    employeesLength?: number
    setFlag: React.Dispatch<React.SetStateAction<boolean>>
    employeeId?: number
    employee?: ISubEmployee
    operationToPerform: string
    setUpdateStatus: React.Dispatch<React.SetStateAction<string | null>>
    setEditEmployeeId: React.Dispatch<React.SetStateAction<number | null>>
}


export const InputFeild: React.FC<props> = ({ employeesLength, setFlag, employeeId, employee, operationToPerform, setUpdateStatus, setEditEmployeeId }) => {


    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ISubEmployee>();
    const totalEmployees = employeesLength === undefined ? 0 : employeesLength

    useEffect(() => {
        setValue("name", employee?.name || '')
        setValue("fName", employee?.fName || '')
        setValue("profile", employee?.profile || '')
        setValue("age", employee?.age || null)
    }, [])

    const onSubmit = (data: ISubEmployee) => {
        operationToPerform === "update" ? handleUpdate(data) : createEmployee(data)
    };

    const handleUpdate = async (data: ISubEmployee) => {
        const url = `http://localhost:3000/employee/${employeeId}`
        try {
            const res = await axios.put(url, data)
            setUpdateStatus(res.data.name + "is updated")
            setEditEmployeeId(null)
        } catch (error: any) {
            throw Error(error);
        }

    }

    const createEmployee = async (data: ISubEmployee) => {
        const url = `http://localhost:3000/employee`
        try {
            const res = await axios.post(url, data)
            setUpdateStatus(res.data.name + "is created")
            setFlag(false)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <>
            <tr>
                <td>{employeeId ? employeeId : totalEmployees + 1}</td>
                <td><input className="form-control" placeholder='Name' {...register("name", { required: true, minLength: 5 })} />
                    {errors.name && errors.name.type === "required" && <span className="text-danger">This field is required</span>}
                    {errors.name && errors.name.type === "minLength" && <span className="text-danger">Too Short!</span>}
                </td>
                <td><input className="form-control" placeholder='Father name' {...register("fName", { required: true, minLength: 5 })} />
                    {errors.fName && errors.fName.type === "required" && <span className="text-danger">This field is required</span>}
                    {errors.fName && errors.fName.type === "minLength" && <span className="text-danger">Too Short!</span>}
                </td>
                <td>
                    <select {...register("profile", { required: true })}>
                        <option value="">None</option>
                        <option value="React.js">React.js</option>
                        <option value="PHP">PHP</option>
                        <option value="Angular.js">Angular.js</option>
                        <option value="Node.js">Node.js</option>
                        <option value="Next.js">Next.js</option>
                        <option value="Dot Net">Dot Net</option>
                        <option value="Laravel">Laravel</option>
                        <option value="Web designer">Web designer</option>
                    </select>
                    {errors.profile && <span className="text-danger">This field is required</span>}
                </td>
                <td><input className="form-control" placeholder='age' type="number" onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} {...register("age", { required: true, min: 18, max: 100 })} />
                    {errors.age && errors.age.type === "required" && <span className="text-danger">This field is required</span>}
                    {errors.age && errors.age.type === "min" && <span className="text-danger">Age cant be less then 18</span>}
                    {errors.age && errors.age.type === "max" && <span className="text-danger">Age cant be greater then 100</span>}
                </td>
                <td>
                    <button className="btn btn-outline-danger" onClick={() => { operationToPerform === "update" ? setEditEmployeeId(null): setFlag(false)}}>
                        <FontAwesomeIcon icon={faCancel} />
                    </button>
                    <button className="btn btn-outline-primary mx-3" onClick={handleSubmit(onSubmit)}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                </td>
            </tr>
        </>
    )
}
