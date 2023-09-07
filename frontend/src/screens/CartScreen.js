import { useNavigate, Link } from "react-router-dom";
import React from "react";
import { FaTrash } from "react-icons/fa";
import {
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  Image,
  ListGroupItem,
  FormControl,
} from "react-bootstrap";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product,qty)=>{
    dispatch(addToCart({...product , qty}))
  }

  const removeToCartHandler = async(id) =>{
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () =>{
    navigate('/login?redirect=/shipping');

  }

  return (
    <Row>
      <Col md={8}>
        <h1 className="text-primary" style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="light">
            {cartItems.map((item) => (
              <ListGroupItem key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col>${item.price}</Col>
                  <Col md={2}>
                    <FormControl
                      as="select"
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item,Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light" onClick={()=>removeToCartHandler(item._id)}>
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
            <ListGroup variant="light">
                <ListGroupItem>
                    <h2 className="text-primary">Subtotal ({cartItems.reduce((acc,item)=>acc+item.qty , 0)}) items</h2>
                    ${cartItems.reduce((acc,item)=>acc + item.qty*item.price ,0).toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                    <Button type="button" className="btn btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Checkout</Button>
                </ListGroupItem>
            </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
