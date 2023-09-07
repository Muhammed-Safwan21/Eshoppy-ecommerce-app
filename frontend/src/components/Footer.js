import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import {FaInstagram,FaFacebookSquare,FaYoutube,FaTwitter} from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer pt-4 text-warning ">
      <Container >   
        <Row>
          <Col className="text-center py-3">
          Follow us on : <FaInstagram/> <FaFacebookSquare/> <FaYoutube/> <FaTwitter/>
          </Col>
            <Col className="text-center py-3">
                <p>Eshoppy &copy; {currentYear}</p>
            </Col>
            <Col className="text-center py-3"> Terms & Conditions | Privacy Policy | FAQ </Col>
        </Row>
        </Container>
    </footer>
  );
};

export default Footer;
