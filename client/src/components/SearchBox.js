import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import Pagination from "./Pagination";
import axios from "axios";

const SearchBar = () => {
    const [devices, setDevices] = useState([])
    const [search, setSearch] = useState('') 
    const LoadDevices = async () => {
        let result = await axios.get(`http://127.0.0.1:8000/api/devices?search=${search.search}`)
        console.log("Submit Resu;lt", result, search)
        setDevices(result.data.results)
    }
    const onChange = (e) => {
        setSearch({...search, [e.target.name]: e.target.value})
        console.log("search", search)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        LoadDevices(search)
    }

    const ChangeStatus = async (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axios.post(`http://127.0.0.1:8000/api/status/${id}/`, config)
        LoadDevices(search)
    }
    const deleteDevice = (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`http://127.0.0.1:8000/api/delete/${id}/`, config)
        LoadDevices()
    }

    return (
        <div className="container">
            <form onSubmit={(e) => onSubmit(e)} className="align-items-center mt-4" style={{textAlign: 'center'}}>
                <input onChange={(e) => onChange(e)} name="search"
                       className="align-items-center justify-content-center form-control" style={{textAlign: 'center'}}
                       type="text"
                       placeholder="Device Name"/>
            </form>
            <table className="table border shadow mt-4">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col"> Device Type</th>
                    <th scope="col">Device Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    devices.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.device_type}</td>
                            <td>
                                <button onClick={() => ChangeStatus(item.id)} style={{width: 100}}
                                        className="btn btn-info">{item.status ? "Active" : "Inactive"}</button>
                            </td>
                            <td>
                                <Link to={`/edit/${item.id}`} className="btn btn-info mr-2">Update</Link>
                                <button onClick={() => deleteDevice(item.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))
                }
                {/*<tr>*/}
                {/*    <Pagination*/}
                {/*        itemPerPage={5}*/}
                {/*        previous={previous_number}*/}
                {/*        next={next_number}*/}
                {/*    />*/}
                {/*</tr>*/}
                </tbody>

            </table>
        </div>
    )
}
export default SearchBar