import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import Pagination from "./Pagination";

const Devices = () => {
    const [devices, setDevices] = useState([])
    // const [count, setCount] = useState(0);
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
    const [active, setActive] = useState(1);

    useEffect(() => {
        LoadDevices()
    }, [])

    const LoadDevices = async () => {
        let result = await axios.get('http://127.0.0.1:8000/api/devices/?page=1');
        console.log(result.data)
        setDevices(result.data.results)
        setPrevious(result.data.previous);
        setNext(result.data.next);
    }

    const previous_number = () => {
        axios.get(previous)
            .then(res => {
                setDevices(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                // if (previous)
                //     setActive(active - 1);
            })
            .catch(err => {

            });
    };

    const next_number = () => {
        axios.get(next)
            .then(res => {
                setDevices(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
                // if (next)
                //     setActive(active + 1);
            })
            .catch(err => {

            });
    };
    const ChangeStatus = async (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axios.post(`http://127.0.0.1:8000/api/status/${id}/`, config)
        LoadDevices()
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
            <div className="py-4">
                <h1 className="text-info text-center">Home Page</h1>
                <table className="table border shadow">
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
                                    <button onClick={() => deleteDevice(item.id)} className="btn btn-danger">Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                        <Pagination
                            itemPerPage={5}
                            previous={previous_number}
                            next={next_number}
                        />

                    </tbody>

                </table>
            </div>
        </div>
    )
}
export default Devices;