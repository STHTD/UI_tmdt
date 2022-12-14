import React, { useState, useEffect, useRef } from 'react';

import '../Css/Base.css';
import '../Css/Grid.css';
import '../Css/Main.css';
import '../Css/Add_product.css';

import SpecialBtn from './Special_btn';
import ProfileNavbar from './Profile_navbar';

import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';
import PaymentForm from './PaymentStripe';

import { useAddProductMutation } from '../services/productApis';
import { useGetCategoriesQuery } from '../services/categoryApis';
import StripeCheckout from 'react-stripe-checkout';

function AddProduct({ showCheckoutForm }) {
  const layoutOverlay = useRef(null); // --> ref to "js-layout__overlay" div

  const { data: catsData, isFetching: isFetchingCatsData } = useGetCategoriesQuery();

  function showCheckoutForm() {
    layoutOverlay.current.classList.add('show');
  }

  function hideCheckoutForm() {
    layoutOverlay.current.classList.remove('show');
  }

  const [formData, setFormData] = useState({
    name: '',
    minPrice: '',
    step: '',
    description: '',
    category: '6397027f1486b02abc2c3cc5',
    mainImage: '',
    subImage1: '',
    subImage2: '',
    subImage3: '',
    endTime: '',
    shortDescription: '',
  });

  const nameInput = useRef(null);
  const minPriceInput = useRef(null);
  const stepInput = useRef(null);
  const descriptionInput = useRef(null);
  const categoryInput = useRef(null);
  const mainImage = useRef(null);
  const subImage1 = useRef(null);
  const subImage2 = useRef(null);
  const subImage3 = useRef(null);
  const endTimeInput = useRef(null);
  const shortDescriptionInput = useRef(null);

  const handleClick = (mainImgInput) => {
    mainImgInput.click();
  };

  const handleChange = (ImgInput, Img, e) => {
    const [file] = ImgInput.files;
    const fileURL = URL.createObjectURL(file);
    if (file) Img.style.backgroundImage = `url(${fileURL})`;

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setFormData((prev) => ({ ...prev, [e.target.id]: reader.result }));
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const [addProduct, { isLoading }] = useAddProductMutation();

  async function onToken(token) {
    const product = {
      name: formData.name,
      minPrice: formData.minPrice,
      step: formData.step,
      description: formData.description,
      category: formData.category,
      mainImage: formData.mainImage,
      subImage1: formData.subImage1,
      subImage2: formData.subImage2,
      subImage3: formData.subImage3,
      endTime: formData.endTime,
      shortDescription: formData.shortDescription,
      token,
    };

    const res = await addProduct(product);

    if (res?.error) {
      const {
        error: { data },
      } = res;
      alert(data.message);
    } else {
      alert('Auction product created');
      window.location.reload();
    }
  }

  function Validate(e) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.minPrice ||
      !formData.step ||
      !formData.description ||
      !formData.category ||
      !formData.mainImage ||
      !formData.subImage1 ||
      !formData.subImage2 ||
      !formData.subImage3 ||
      !formData.shortDescription ||
      !formData.endTime
    ) {
      alert('Please fill out all fields');
      console.log(formData)
      return e.stopPropagation();
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <ProfileNavbar />
      <div className="grid wide">
        <div className="row">
          <div className="column l-10 profile-main-content">
            <form
              // onSubmit={Validate}
              className="add-product__form"
            >
              <div className="row">
                <h1 className="column l-12 add-product__heading">
                  Add product
                </h1>
                <div className="column l-12 add-product-main-content">
                  <div className="row">
                    <div className="column l-3">
                      <div className="add-product__img-container">
                        <div
                          className="add-product__img add-product-main__img js-add-product-main__img"
                          onClick={() =>
                            handleClick(
                              document.querySelector(
                                '.js-add-product-main-img__input'
                              )
                            )
                          }
                        ></div>
                      </div>
                    </div>
                    <div className="column l-9">
                      <div className="add-product-right">
                        <div className="add-product-header">
                          <div
                            className="row"
                            style={{ justifyContent: 'space-between' }}
                          >
                            <input
                              type="text"
                              className="column l-3 add-product__input add-product-name__input"
                              placeholder="Product name"
                              ref={nameInput}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                            />
                            <input
                              type="number"
                              className="column l-2 add-product__input add-product-start-price__input"
                              placeholder="Start price"
                              datatype="currency"
                              ref={minPriceInput}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  minPrice: e.target.value,
                                }))
                              }
                            />
                            <input
                              type="number"
                              className="column l-2 add-product__input add-product-step-price__input"
                              placeholder="Step price"
                              datatype="currency"
                              ref={stepInput}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  step: e.target.value,
                                }))
                              }
                            />
                            <input
                              type="date"
                              name=""
                              className="column l-3 add-product__input add-product-date__input"
                              ref={endTimeInput}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  endTime: e.target.value,
                                }))
                              }
                            />
                            <select
                              className="add-product-category__input"
                              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                              defaultValue="" 
                            >
                              <option value="" disabled hidden>Category</option>
                              {catsData?.categories.map((category, i) => (
                                <option key={i} value={category?._id}>{category?.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <textarea
                            name=""
                            rows="3"
                            className="column l-12 add-product-description__input add-product-short-description__input"
                            placeholder="Short description"
                            ref={shortDescriptionInput}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                shortDescription: e.target.value,
                              }))
                            }
                          ></textarea>
                          <textarea
                            name=""
                            rows="5"
                            className="column l-12 add-product-description__input add-product-details-description__input"
                            placeholder="Defaults description"
                            ref={descriptionInput}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-product-bottom">
                <div className="row">
                  <div className="column l-6 add-product-sub__img-list">
                    <div className="row">
                      <div className="column l-4">
                        <div className="add-product__img-container add-product-sub__img-container">
                          <div
                            className="column add-product__img add-product-sub__img js-add-product-sub__img1"
                            onClick={() =>
                              handleClick(
                                document.querySelector(
                                  '.js-add-product-sub-img__input1'
                                )
                              )
                            }
                          ></div>
                        </div>
                      </div>
                      <div className="column l-4">
                        <div className="add-product__img-container add-product-sub__img-container">
                          <div
                            className="column add-product__img add-product-sub__img js-add-product-sub__img2"
                            onClick={() =>
                              handleClick(
                                document.querySelector(
                                  '.js-add-product-sub-img__input2'
                                )
                              )
                            }
                          ></div>
                        </div>
                      </div>
                      <div className="column l-4">
                        <div className="add-product__img-container add-product-sub__img-container">
                          <div
                            className="column add-product__img add-product-sub__img js-add-product-sub__img3"
                            onClick={() =>
                              handleClick(
                                document.querySelector(
                                  '.js-add-product-sub-img__input3'
                                )
                              )
                            }
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-product__btn-container">
                <Link to="/my-products">
                  <button className="btn add-product__btn cancel-add-product__btn">
                    Cancel
                  </button>
                </Link>
                {!isLoading ? (
                  <StripeCheckout
                    amount={formData.minPrice * 0.02 * 100}
                    token={onToken}
                    currency="USD"
                    stripeKey="pk_test_51LhTmHDGOQhsYLL1AGMaaqbRNEB4CKIIou69IljUChMBjvkf1OQEa1SMjADKv3x9vs8Z1IOceHacX7LhfFX1ZvdU00lyYntqcX"
                  >
                    <SpecialBtn
                      value="Checkout"
                      // type="submit"
                      className="add-product__btn add-product-save__btn"
                      onClick={Validate}
                    />
                  </StripeCheckout>
                ) : (
                  <SpecialBtn
                    value="Checkout"
                    // type="submit"
                    className="add-product__btn add-product-save__btn"
                    // onClick={() => console.log(formData)}
                    isDisabled={true}
                  />
                )}
                <input
                  id="mainImage"
                  accept="image/png, image/jpeg"
                  type="file"
                  className="add-product-main-img__input js-add-product-main-img__input"
                  style={{ display: 'none' }}
                  ref={mainImage}
                  onChange={(e) =>
                    handleChange(
                      document.querySelector('.js-add-product-main-img__input'),
                      document.querySelector('.js-add-product-main__img'),
                      e
                    )
                  }
                />
                <input
                  id="subImage1"
                  accept="image/png, image/jpeg"
                  type="file"
                  className="add-product-sub-img__input1 js-add-product-sub-img__input1"
                  style={{ display: 'none' }}
                  ref={subImage1}
                  onChange={(e) =>
                    handleChange(
                      document.querySelector('.js-add-product-sub-img__input1'),
                      document.querySelector('.js-add-product-sub__img1'),
                      e
                    )
                  }
                />
                <input
                  id="subImage2"
                  accept="image/png, image/jpeg"
                  type="file"
                  className="add-product-sub-img__input2 js-add-product-sub-img__input2"
                  style={{ display: 'none' }}
                  ref={subImage2}
                  onChange={(e) =>
                    handleChange(
                      document.querySelector('.js-add-product-sub-img__input2'),
                      document.querySelector('.js-add-product-sub__img2'),
                      e
                    )
                  }
                />
                <input
                  id="subImage3"
                  accept="image/png, image/jpeg"
                  type="file"
                  className="add-product-sub-img__input3 js-add-product-sub-img__input3"
                  style={{ display: 'none' }}
                  ref={subImage3}
                  onChange={(e) =>
                    handleChange(
                      document.querySelector('.js-add-product-sub-img__input3'),
                      document.querySelector('.js-add-product-sub__img3'),
                      e
                    )
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddProduct;
