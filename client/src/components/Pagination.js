import React from 'react'

const Pagination = (props) => {
    console.log("paginnation", props)

    return (

        <>
            <ul className="pagination justify-content-center">
                <li onClick={() => props.previous()} className="page-item" >
                    <a className="page-link" href="#" tabIndex="-1">Previous</a>
                </li>
                <li onClick={() => props.next()} className="page-item" style={{marginLeft:'30%'}}>
                    <a className="page-link" href="#" tabIndex="-1">Next</a>
                </li>
            </ul>
        </>
    )
}
export default Pagination