import React, {useState, useEffect} from 'react'
import moment from "moment";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";





export default function Jobs(props) {

    const [jobList, setJobList]=useState(null)
    let anchorRef = React.createRef()


    const loadJobs = async () =>{
        let url = 'http://localhost:3001/jobs/'
        let data = await fetch(url)
        let result = await data.json(data)
        setJobList(result)
        console.log("job resuts", result)
    }

    useEffect(() => {
        loadJobs();
    }, [])

    if (jobList == null) {
		return <div>Loading</div>;
	}

    const goToDetail = () =>{
        console.log("worksss ")
    }

    return (
        <div>


           {jobList.map((item, index) =>{
               return(
                   <table className="jobBlock"  key={item.id}>
                        <Link to={`/jobs/${index}`}>
                        <tbody>
                            <tr>
                                {/* IMAGE */}
                                <td style={{width:"10%", padding:"20px"}}><img src={item.img}></img></td>
                                {/* TITLE */}
                                <td style={{width:"80%"}} className="blackLink"><h3>{item.title}</h3></td>
                                {/* HOT JOB */}
                    
                                {item.isHotjob==true ?<td style={{width:"10%", padding:"20px"}} align="center"><Badge variant="warning">Hot Job</Badge></td> : <td></td>}

                            </tr>
                            <tr>
                                <td></td>
                                {/* SALARY */}
                                <td className="blackLink">${item.salary}</td>
                                <td>
                                {/* LOCATION */}
                                    <div className="blackLink" align="center">{item.city}</div>
                                    <div className="blackLink" align="center">{item.district}</div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                {/* BENEFIT BULLETS */}
                                    <ul className="blackLink">
                                        {item.benefits.map(item =>{

                                            return(<li key={item}>{item}</li>)

                                        })}
                                    </ul>
                                </td>
                                {/* POSTED FROM TIME */}
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                {/* BUTTON TAGS */}
                                <td className="box">
                                    {item.tags.map(item =>{
                                        return(
                                            <span style={{paddingLeft:"5px"}}>
                                            <Badge pill variant="secondary">
                                                {item}
                                            </Badge>
                                            </span>
                                    )
                                    })}
                                </td>
                                <td className="blackLink" style={{paddingBottom:"20px"}} align="center">{moment(item.time).fromNow()}</td>
                            </tr>
                        </tbody>
                    </Link>
                    </table>
                    
                    )
           })} 
        </div>
    )
}
