import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            console.log(email,password);
            const response = await axios.post("http://localhost:8080/auth/login",{email,password});
            const token = response.data.token;
            localStorage.setItem("token",token);

            router.push("/products");
        }
        catch(err){
            alert("login failed");
        }

    }

    return(
        <form  className ="max-w-md mx-auto mt-30 bg-white p-10 rounded shadow-md space-y-6 " onSubmit={handleSubmit}>
        <div>
            <h2 className="text-2xl font-semibold p-8 text-center text-green-700">Login to Agribridge</h2>
                <div className="flex items-center gap-11">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input className="pl-2 focus:outline-none" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
       </div>
       <div>
            <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input className="pl-2 focus:outline-none" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
       </div>

       <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition" type="submit">Login</button>
       </form>
    );
}
