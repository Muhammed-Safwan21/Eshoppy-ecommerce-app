import {Form,Button} from 'react-bootstrap';
import {useNavigate, Link , useParams} from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {toast} from 'react-toastify';
import { useUpdateProductMutation,useGetProductDetailsQuery , useUploadProductImageMutation } from '../../slices/productApiSlice';
import { useEffect, useState } from 'react';


const ProductEditScreen = () => {
    const {id:productId} = useParams()
    const navigate = useNavigate()

    const [name ,setName]= useState('');
    const [price,setPrice] = useState(0);
    const [brand,setBrand] = useState('');
    const [category,setCategory] = useState('');
    const [image , setImage] = useState('');
    const [countInStock ,setCountInStock] = useState(0);
    const [description , setDescription] = useState('')
    
    const {data:product , isLoading , error, } = useGetProductDetailsQuery(productId);

    const [updateProduct,{isLoading:loadingUpdate}] = useUpdateProductMutation();

    const [uploadProductImage] = useUploadProductImageMutation()

    useEffect(()=>{
        if(product){
            setName(product.name);
            setPrice(product.price);
            setBrand(product.brand);
            setCategory(product.category);
            setImage(product.image);
            setCountInStock(product.countInStock);
            setDescription(product.description)
        }
    },[product])

    const submitHandler = async (e) =>{
        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            brand,
            category,
            image,
            countInStock,
            description
        }

        const result = await updateProduct(updatedProduct);
        if(result.error){
            toast.error(result.error)
        }else{
            toast.success("Product Updated");
            navigate('/admin/productslist')
        }

    }
    const uploadFileHandler = async (e) =>{

        // console.log(e.target.files[0])
        const formData = new FormData();
        formData.append('image',e.target.files[0]);
        // for (let i = 0; i < e.target.files.length; i++) {
        //     formData.append('images', e.target.files[i]);
        // }
    

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        

    }

  return (
    <>
        <Link to='/admin/productslist' className='btn btn-light my-3'>Go Back</Link>
        <FormContainer >
            <h1 className="text-primary">Edit Product</h1>
            {loadingUpdate && <Loader/>}
            {isLoading ? <Loader/> : error? (<Message variant='danger'>{error.data.message}</Message>):(
                <Form onSubmit={submitHandler} className="text-black">
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' value={name} placeholder='Enter name' onChange={(e)=>setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='price' className='my-2'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' value={price} placeholder='Enter price' onChange={(e)=>setPrice(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image' className='my-2'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='text' value={image} placeholder='Enter image url' onChange={(e)=>setImage(e.target.value)}></Form.Control> 
                        <Form.Control type='file' label='choose files' multiple onChange={uploadFileHandler} ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='brand' className='my-2'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' value={brand} placeholder='Enter brand' onChange={(e)=>setBrand(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='category' className='my-2'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='text' value={category} placeholder='Enter category' onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock' className='my-2'>
                        <Form.Label>Count in stock</Form.Label>
                        <Form.Control type='number' value={countInStock} placeholder='Enter countInStock' onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description' className='my-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' value={description} placeholder='Enter description' onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' className='my-3' variant='primary'>Update</Button>
                </Form>
            )}
        </FormContainer>
    </>


  )
}

export default ProductEditScreen