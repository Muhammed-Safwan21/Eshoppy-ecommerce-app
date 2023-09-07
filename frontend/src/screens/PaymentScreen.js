import { Form,Col,Button } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { savePymentMethod } from "../slices/cartSlice"
import { useEffect, useState } from "react"

const PaymentScreen = () => {
    const [paymentMethod,setPaymentMethod]=useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state)=>state.cart)
    const {shippingAddress} = cart;

    useEffect(() => {
      if(!shippingAddress){
        navigate('/shipping')
      }
    }, [shippingAddress,navigate])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1 className="text-primary">Payment Method</h1>
        <Form onSubmit={submitHandler} className="text-primary">
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                <Form.Check
                 type="radio" className="my-2" label='Paypal or credit card' id="paypal"
                name="paymentMethod" value='Paypal'  onChange={(e)=>setPaymentMethod(e.target.value)}>

                </Form.Check>
                </Col>
                <Col>
                <Form.Check
                 type="radio" className="my-2" label='Razorpay' id="razorpay"
                name="paymentMethod" value='Razorpay'  onChange={(e)=>setPaymentMethod(e.target.value)}>

                </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen