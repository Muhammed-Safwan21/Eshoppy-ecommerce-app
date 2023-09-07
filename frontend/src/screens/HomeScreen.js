import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { FaPaypal, FaCcVisa, FaCcMastercard,FaGooglePay } from "react-icons/fa";
import { SiRazorpay ,SiPaytm} from "react-icons/si";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1 className="text-primary">Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
          <div className="my-5 text-center ">
            <h6 className="text-primary">
              We accept the following payment methods
            </h6>
            <div className="icons">
              
            <FaPaypal /> <FaCcVisa /> <SiRazorpay /> <FaCcMastercard /> <FaGooglePay/> <SiPaytm/>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default HomeScreen;
