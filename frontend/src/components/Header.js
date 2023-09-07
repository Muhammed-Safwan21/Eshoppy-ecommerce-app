import React from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import eshoppy from "../assets/eshoppy.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import SearchBox from "./SearchBox";
import { resetCart } from '../slices/cartSlice';

const Header = () => {

  const {cartItems} = useSelector((state) =>state.cart)
  // console.log(cartItems)
  const {userInfo} = useSelector((state)=>state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async() =>{
      try {
        await logoutApiCall().unwrap()
        dispatch(logout())
        dispatch(resetCart());
        navigate('/login')
        
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <header className="header">
      <Navbar variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={eshoppy} className="main-logo"  alt="eshoppy"></img>
           
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox/>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="warning" style={{marginLeft:'5px'}}>
                      {cartItems.reduce((a,c)=> a + c.qty,0) }
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown id="username" title={userInfo.name}>
                  <LinkContainer  to='/profile'>
                    <NavDropdown.Item className="nav-link-item">Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item className="nav-link-item" onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )
               : (
                <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>)}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id="adminmenu" >
                  <LinkContainer to='admin/productslist/'>
                    <NavDropdown.Item className="nav-link-item" >
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='admin/userslist/'>
                    <NavDropdown.Item className="nav-link-item" >
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='admin/orderslist/'>
                    <NavDropdown.Item className="nav-link-item" >
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
