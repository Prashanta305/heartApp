//import { input } from 'postcss'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';


const Login = () => {
    const [input, setInput] = useState({
        email:"",
        password:""
    });
    const [loding, setLoding] = useState(false);
    const {user} =useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) =>{
        setInput({...input, [e.target.name]:e.target.value});
    }
    const SignupHandler = async(e) =>{
        e.preventDefault();
        console.log(input);
    try{
      setLoding(true);
      const res = await axios.post('http://localhost:8000/api/v1/user/login',input,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
      if(res.data.success){
       dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
        setInput({
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
            <p>Login to see photos & video from your frend</p>
            
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
                <Button type='submit'>login</Button>
              )
            }
            
            <span className='text-center'>deos not have acound have an account?<Link to="/signup" className='text-blue-600'>Signup</Link></span>
            

        </div>
      </form>
    </div>
  )
}

export default Login
