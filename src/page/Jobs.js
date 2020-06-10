import React, {useState, useEffect} from 'react'
import moment from "moment";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";



export default function Jobs(props) {

    let [jobList, setJobList]=useState(null)
    let anchorRef = React.createRef()
    let [originalList, setOriginalList]= useState(null)
    let history = useHistory
    let tempArray = []
    let query = useQuery();
    const QUERYSTR_PREFIX = "q";
    let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX))
    let user = useSelector((state) => state.user);





    const loadJobs = async () =>{
        let url = `${REACT_APP_BACKEND_SERVER_URL}/jobs/`
        let data = await fetch(url)
        let result = await data.json(data)
        setOriginalList(result)
        setJobList(result)
        tempArray = result
        searchByKeyword()
    }

    const searchByKeyword = (e) =>{
        if (e){
        e.preventDefault()
        history.push(`/jobs?${QUERYSTR_PREFIX}=${keyword}`)
        }
        let filteredList = tempArray
        if(keyword){
            filteredList = tempArray.filter(item => item.title.includes(keyword))
            console.log("list filter", filteredList)
        }
        setJobList(filteredList)
    }

    useEffect(() => {
        loadJobs();
    }, [])


    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }



    if (jobList == null) {
		return <div>Loading</div>;
	}

    return (
        <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <div className="container">
                        <Link to={`/`}>
                        <Navbar.Brand><img width="110px" src="/images/itviec.png"></img></Navbar.Brand>
                        </Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">

                     <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#link">Sign In</Nav.Link>
                    </Nav>
                    <Form inline onSubmit = { (e) => searchByKeyword(e) }>
                        <FormControl onChange={ (e) => setKeyword(e.target.value) } type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>

                    </Navbar.Collapse>
                    </div>
                </Navbar>
                    
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
