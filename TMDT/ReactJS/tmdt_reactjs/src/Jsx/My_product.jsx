import React from 'react';

import '../Css/Base.css';
import '../Css/Grid.css';
import '../Css/Main.css';
import '../Css/My_product.css';
import Header from './Header';
import Footer from './Footer';
import SpecialBtn from './Special_btn';
import ProductItem from './Product_item';
import ProfileNavbar from './Profile_navbar';
import MyProductItem from './My_product_item';
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';

// import { Carousel, CarouselItemProps } from 'react-bootstrap'
import 'react-multi-carousel/lib/styles.css';
import { useGetMyProductsQuery } from '../services/productApis';

function MyProduct() {
  const { data: myProductsData, isFetching } = useGetMyProductsQuery();

  return (
    <>
      <ProfileNavbar />
      <div className="grid wide" style={{ position: 'relative' }}>
        <div className="row">
          <div className="column l-10 profile-main-content">
            <MyProductItem
              url="https://randomwordgenerator.com/img/picture-generator/55e1d6434c57aa14f1dc8460962e33791c3ad6e04e5074417c2f7dd59f4ac1_640.jpg"
              className="my-product-item"
              heading="Heading"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
          </div>
        </div>
        <Link to="/add-product">
          <SpecialBtn className="Add-product__btn" value="Add product" />
        </Link>
      </div>
    </>
  );
}
export default MyProduct;
