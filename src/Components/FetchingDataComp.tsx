import React, { useEffect, useState } from 'react';
import { TableComp } from './TableComp';
import axios from "axios";
import { IEmployee } from '../model/model';

export const FetchingDataComp:React.FC = () => {
    const [employee, setEmployee] = useState<IEmployee[]>()
    const [updateStatus, setUpdateStatus]=useState<string | null>(null)
    
    useEffect(()=>{
        fetchData()
    }, [updateStatus])

    const fetchData=async ()=>{
        const url ="http://localhost:3000/employee"
        try {
            const res=await axios.get(url)
            setEmployee(res.data)
            setUpdateStatus(res.data.name+" is created ")
        } catch (error:any) {
            console.log(error.message)
        }
    }

    const handleDelete = async (id:number|null)=>{
        const url = `http://localhost:3000/employee/${id}`
        try {
            const res=await axios.delete(url)
            setUpdateStatus(res.data.name+" is deleted ")
        } catch (error: any) {
            console.log(error.message)
        }
    }
  return (
    <>
          <TableComp employees={employee} handleDelete={handleDelete} setUpdateStatus={setUpdateStatus }/>
    </>
  )
}
