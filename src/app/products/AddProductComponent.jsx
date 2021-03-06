import React from 'react';
import Notifications from 'react-notify-toast';
import { EllipsisLoaderComponent } from '../common'
import { constants } from './duck';
import './addProduct.css';

const AddProductComponent = ({ addProduct, addProductState }) => {
  const onFormSubmit = e => {
    e.preventDefault();
    const productDetails = {
      productname: e.target.elements.productName.value.trim(),
      description: e.target.elements.description.value.trim(),
      productimage: e.target.elements.productImage.value.trim(),
      price: e.target.elements.price.value.trim(),
      quantity: e.target.elements.quantity.value.trim(),
      minallowed: e.target.elements.minAllowed.value.trim(),
    }
    addProduct(productDetails);
  };

  const submitButton = <button id="addProductBtn" type="submit">Add product</button>
  return (
    <>
      <Notifications />
      <form id="addproductForm" autoComplete="on" onSubmit={onFormSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Product Name" id="productName" />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Description" id="description" />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Price" id="price" />
        </div>
        <div className="form-group">
          <input type="number" placeholder="Quantity" id="quantity" />
        </div>
        <div className="form-group">
          <input type="number" placeholder="Minimum quantiy allowed" id="minAllowed" />
        </div>
        <div id="selectImage">
          <input type="text" placeholder="Input product image url" id="productImage" />
        </div>
          {addProductState !== constants.ADDING_PRODUCT && submitButton}
          {addProductState === constants.ADDING_PRODUCT && <EllipsisLoaderComponent />}
      </form>
    </>
  );
};

export default AddProductComponent;
