import FormContainer from "../components/FormContainer"
import {Link} from 'react-router-dom';
import {Form , Button , Col, Row} from 'react-bootstrap'
import { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
const [email, setEmail] = useState('')
const [password , setPassword]= useState('')

const dispatch = useDispatch()
const navigate = useNavigate()
const [login,{isLoading} ]= useLoginMutation()

const {userInfo} = useSelector((state)=>state.auth)

const {search} = useLocation()
const sp = new URLSearchParams(search);
const redirect = sp.get('redirect') || '/'

useEffect(() => {
    
    if(userInfo){
        navigate(redirect)
    }
  
}, [userInfo,redirect,navigate])



const submitHandler = async (e) =>{
    e.preventDefault()
    try {
        const res = await login({email, password}).unwrap();
        dispatch(setCredentials({...res}))
        navigate(redirect)
    } catch (err) {
        toast.error(err?.data?.message || err.error)
        
    }
   
}

  return (
    <FormContainer>
        <h1 className="text-primary">Sign In</h1>
        <Form onSubmit={submitHandler} className="text-primary">
            <Form.Group controlId="email" className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" required value={email}
                onChange={(e)=>setEmail(e.target.value)}
                ></Form.Control>

            </Form.Group>

            <Form.Group controlId="password" className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" required value={password}
                onChange={(e)=>setPassword(e.target.value)}
                ></Form.Control>

            </Form.Group>
            <Button type='submit' variant="primary" className="mt-3" disabled={isLoading}>Sign In</Button>

            <Row className="py-3">
                <Col>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>Register</Link>
                </Col>
            </Row>
            
            {isLoading && <Loader/>}

        </Form>
    </FormContainer>
  )
}

export default LoginScreen