import {Form,Button} from 'react-bootstrap';
import {useNavigate, Link , useParams} from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {toast} from 'react-toastify';
import { useUpdateUserMutation,useGetUserDetailsQuery , } from '../../slices/usersApiSlice';
import { useEffect, useState } from 'react';



const UserEditScreen = () => {
    const {id:userId} = useParams()
    const navigate = useNavigate()

    const [name ,setName]= useState('');
    const [email,setEmail] = useState('');
    const [isAdmin,setIsAdmin] = useState(false);
   
    
    const {data:user , isLoading , error, refetch} = useGetUserDetailsQuery(userId);

    const [updateUser,{isLoading:loadingUpdate}] = useUpdateUserMutation()

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    },[user])

    const submitHandler = async (e) =>{
        e.preventDefault();
       try {
        await updateUser({ userId ,name,email,isAdmin}) ;
       
        toast.success('User updated successfully');
        refetch()
        navigate('/admin/userslist')
 
       } catch (err) {
        toast.error(err?.data?.message || "err.error")
        
       }
    }


  return (
    <>
        <Link to='/admin/userslist' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer>
            <h1 className="text-primary">Edit User</h1>
            {loadingUpdate && <Loader/>}
            {isLoading ? <Loader/> : error? (<Message variant='danger'> {error?.data?.message || error.error}</Message>):(
                <Form onSubmit={submitHandler} className="text-black">
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' value={name} placeholder='Enter name' onChange={(e)=>setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email' className='my-2'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' value={email} placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isAdmin' className='my-2'>
                        <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}></Form.Check>
                    </Form.Group>
                   
                    <Button type='submit' className='my-3' variant='primary'>Update</Button>
                </Form>
            )}
        </FormContainer>
    </>


  )
}

export default UserEditScreen