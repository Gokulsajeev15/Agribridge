import { useState } from "react";

export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(email);
        console.log(password);
    }

    return(
        <form onSubmit={handleSubmit}>
        <div>
            <label>email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <p>you typed: {email}</p>

       </div>
       <div>
            <label>password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

            <p>you typed: {password}</p>

       </div>

       <button type="submit">Login</button>
       </form>
    );
}
