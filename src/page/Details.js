import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import moment from "moment";

export default function Details() {

    const { id } = useParams();
    const [detailPage, setDetailPage]=useState(null)

    const getDetailData = async () =>{
        let url = `http://localhost:3001/jobs/${id}`
        let deployUrl = ''
        let data = await fetch(url)
        let result = await data.json(data)
        console.log(result,"result hrrr")
        setDetailPage(result)
    }

    useEffect(()=>{
        getDetailData();
    },[])

    if (detailPage == null) {
		return <div>Loading</div>;
	}

    return (
        <table className="center">
            <tbody className="detailContainer">
                <tr>
                    <td>{detailPage.title}</td>
                </tr>
            </tbody>
        </table>
    )
}
