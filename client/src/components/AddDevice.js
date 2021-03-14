import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from "axios";


const AddDevice = () => {
    let history = useHistory()
    const [device, setDevice] = useState({
        name: '',
        device_type: '',
        status: ''
    })
    const {name, device_type, status} = device
    // console.log("History",history)
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
        console.log("On submit", device)
        let new_stat = false
        if (device.status === 'on') {
            new_stat = true
        }
        const body = JSON.stringify({name:device.name,device_type: device.device_type,status: new_stat})
        console.log("Add device body",body)
        await axios.post('http://127.0.0.1:8000/api/add/', body,config)
        history.push('/')
    }
    // console.log(device)
    return (
        <div className="container">
            <form onSubmit={e => onSubmit(e)} className="mt-5">
                <div className="mb-3">
                    <input type="text" value={name} name="name" placeholder="Device Name" onChange={e => onChange(e)}
                           className="form-control mt-5" id="exampleInputEmail1"
                           aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <select defaultValue={device_type} onChange={e => onChange(e)} name="device_type"
                            className="form-select" aria-label="Default select example">
                        <option>Device Type</option>
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
export default AddDevice;