//import { input } from 'postcss'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Signup = () => {
    const [input, setInput] = useState({
        username:"",
        email:"",
        password:""
    });
    const [loding, setLoding] = useState(false);
    const {user} = useSelector(store=>store.auth)
    const navigate = useNavigate();

    const changeEventHandler = (e) =>{
        setInput({...input, [e.target.name]:e.target.value});
    }
    const SignupHandler = async(e) =>{
        e.preventDefault();
        console.log(input);
    try{
      setLoding(true);
      const res = await axios.post('http://localhost:8000/api/v1/user/register',input,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          username:"",
          email:"",
          password:""
        });
      }
}catch(reeor){
console.log(error);
toast.error(error.response.data.message);
}  finally{
  setLoding(false);
}   
    }
    useEffect(()=>{
          if(user){
            navigate("/");
          }
        },[])
  return (
    <div className='flex items-center w-screen h-screen justify-center'>
      <form onSubmit={SignupHandler} className='shadow-lg flex flex-col gap-5 p-8'>
        <div className='my-4'>
            <h1>Logo</h1>
            <p>Signup to see photos & video from your frend</p>
            <div>
            <span className='py-2 font-medium'>Username</span><br></br>
            <input
            type="text" 
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
            />
            </div>
            <div>
            <span className='py-2 font-medium'>Email</span><br></br>
            <input
            type="text" 
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
            />
            </div>
            <div>
            <span className='py-2 font-medium'>Password</span><br></br>
            <input
            type="password" 
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
            />
            </div>
            {
              loding ? (
                <Button>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                please wait
                </Button>
              ):(
                <Button type='submit'>Signup</Button>
              )
            }
            
            
          <span className='text-center'>allready have an account?<Link to="/login" className='text-blue-600'>Login</Link></span>
            

        </div>
      </form>
    </div>
  )
}

export default Signup
