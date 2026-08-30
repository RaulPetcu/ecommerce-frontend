import ProductCard from "./shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/actions";
import Loader from "./shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import ecommerceImage from "../assets/ecommerce.jpg";

const About = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
        About Us
      </h1>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-lg mb-4">
            Welcome to our e-commerce store! We are dedicated to providing the
            best products and services to our customers. Our mission is to offer
            a seamless shopping experience while ensuring the highest quality of
            our offerings.
          </p>
        </div>

        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src={ecommerceImage}
            alt="About Us"
            className="w-4/5 h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          ></img>
        </div>
      </div>

      <div className="py-7 space-y-8">
        <h1 className="text-slate-800 text-4xl font-bold text-center">
          Our Products
        </h1>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products && 
                        products?.slice(0,4)
                                    .map((item, i) => <ProductCard key={i} {...item} />
                            )}
                </div> */}

        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <div className="flex justify-center items-center h-[200px]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">
              {errorMessage}
            </span>
          </div>
        ) : (
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products
                ?.slice(0, 4)
                .map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
        )}
      </div>

      <div className="flex text-sm gap-1 flex-col items-center">
        <Link
          to="/"
          className="flex gap-2 items-center text-blue-500 hover:text-blue-600 transition"
        >
          <MdArrowBack size={24} />
          <span className="font-medium">Start Shopping</span>
        </Link>
      </div>
    </div>
  );
};

export default About;
