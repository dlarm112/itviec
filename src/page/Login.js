import React from 'react'
import { useSelector, useDispatch } from "react-redux";



export default function Login() {

    const dispatch = useDispatch();
    let state = useSelector((state)=>state)
    let emailInput
    let passwordInput


    const login = (e) => {
        let user = { email: emailInput, password: passwordInput};
        dispatch({ type: "LOGIN", payload: user });
        console.log("user", user)
        
        // history.goBack();
      };

    return (
        <div>
            <table align="center">
                <tbody align="center">
                    <tr>
                        <td>
                            <input onChange={ (e) => emailInput=(e.target.value) }></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input onChange={ (e) => passwordInput=(e.target.value) }></input>                     
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button style={{width:"200px",height:"50px"}}type="submit" onClick={()=>login()}></button>                         
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
