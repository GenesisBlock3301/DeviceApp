import React, {useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom'
import axios from "axios";

const EditDevice = () => {
    let history = useHistory()
    // console.log("Edit param",useParams())
    const {id} = useParams()
    const [device, setDevice] = useState({
        name: '',
        device_type: '',
        status: ''
    })
    useEffect(() => {
        LoadUser()
    }, [])
    const LoadUser = async () => {
        const result = await axios.get(`http://127.0.0.1:8000/api/device/${id}/`)
        console.log(result)
        setDevice(result.data)

    }
    const onChange = (e) => {
        setDevice({...device, [e.target.name]: e.target.value})
        console.log(device)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // console.log("On submit", device)
        let new_stat = false
        if (device.status === 'on') {
            new_stat = true
        }
        const body = JSON.stringify({id: id, name: device.name, device_type: device.device_type, status: new_stat})
        console.log("Add device body", body)
        await axios.post(`http://127.0.0.1:8000/api/update/${id}/`, body, config)
        history.push('/')
    }
    const {name, device_type} = device
    return (
        <div className="card container mt-5">
            <form className="mt-5 pb-4" onSubmit={e => onSubmit(e)}>
                <div className="mb-3">
                    <input type="text" value={name} name="name" placeholder="Device Name" onChange={e => onChange(e)}
                           className="form-control" id="exampleInputEmail1"
                           aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <select defaultValue={device_type} onChange={e => onChange(e)} name="device_type"
                            className="form-select" aria-label="Default select example">
                        {/*<option>Device Type</option>*/}
                        <option value="Mobile">Mobile</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                    </select>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" name="status"
                           className="form-check-input" onChange={e => onChange(e)} id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default EditDevice;