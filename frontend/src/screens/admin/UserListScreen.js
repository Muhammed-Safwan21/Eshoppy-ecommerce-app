import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import { useDeleteUserMutation, useGetUsersQuery } from '../../slices/usersApiSlice'
import {FaTrash,FaCheck , FaEdit, FaTimes} from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {toast} from 'react-toastify';
 
const UserListScreen = () => {
  const {data:users , isLoading ,refetch, error} = useGetUsersQuery();
  const [deleteUser , {isLoading:loadingDelete}] = useDeleteUserMutation()

  const deleteHandler = async(id)=>{
    if(window.confirm('Are you sure?')){
        try {
            await deleteUser(id);
            refetch()
            toast.success('User Deleted ')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
  }

  return (
    <>
     <h2 className="text-primary">Users</h2>
     {loadingDelete && <Loader/>}
     {isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(

      <Table  hover responsive className='table-sm text-black'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user)=>(
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
              <td>{user.isAdmin?(<FaCheck style={{color:'green'}}/>) : (<FaTimes style={{color:'green'}}/>)}</td>
             
              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                <Button className='btn-sm' variant='light'><FaEdit/></Button>
                </LinkContainer>
                <Button className='btn-sm ' variant='danger' onClick={()=>{deleteHandler(user._id)}}>
                    <FaTrash style={{color:'white'}}/>
                    </Button>
              </td> 
              
            </tr>
          ))}
        </tbody>
      </Table>

     )}
    </>
  )
}

export default UserListScreen