import React, { Fragment } from 'react';
import lifecycle from 'react-pure-lifecycle';
import { Link } from 'react-router-dom';
import { constants } from '../common';
import '../style/admindashboard.css';

const methods = {
  componentWillMount({
    fetchCurrentUser,
    fetchallUsers,
    fetchSaleRecord,
    fetchProducts,
    userData,
    saleRecord,
    products
  }) {
    if (!userData.currentUser) {
      fetchCurrentUser();
      fetchallUsers();
      fetchSaleRecord();
      fetchProducts();
    }
  }
};

const DashboardComponent = ({
  userData,
  saleRecord,
  products,
  fetchProductsState,
  fetchSaleRecordState
}) => {
  const userProfile = () => {
    const { currentUser } = userData;
    return (
      <figure className="profile">
        <div className="profile-image">
          <img src= {currentUser.userimage} alt="User Image" />
        </div>
        <figcaption>
          <h3>{currentUser.fullname}</h3>
          <h4>Store {currentUser.role}</h4>
        </figcaption>
      </figure>
    )
  }

  const latestProducts = () => {
    const { data } = products;
    data.reverse();
    return (
      data.slice(0, 4).map(product => (
        <Link className="col-md-6 col-sm-12"
          to={`/product/${product.id}`}>
          <img src={product.productimage} width='100' />
        </Link>
      ))
    )
  }

  const storeAttendants = () => {
    const { allUsers } = userData;
    allUsers.reverse();
    return (
      allUsers.slice(0, 4).map(user => (
        <li>
          <Link className="list" to={`/profile/${user.id}`}>{user.fullname}</Link>
        </li>
      ))
    )
  }

  const sales = () => {
    const { data } = saleRecord;
    data.reverse();
    return (
      data.slice(0, 4).map(saleRecord => (
        <li>
          <Link className="list" to={`/product/${saleRecord.productid}`}>{saleRecord.productname}</Link>
        </li>
      ))
    )
  }

  return(
    <Fragment>
      <div className="row" id="dashboardColumns">
        <div className='product'>
          {userData.currentUser && userProfile()}
        </div>
        <div className='product'>
          <div className="product-item tp">
            <h3>Latest Products</h3>
            <div className="t-products">
              {products.data && latestProducts()}
            </div>
            <Link className="green-button" to="/products">See All Products</Link>
          </div>
        </div>

        <div className='product'>
          <div className="product-item tp">
            <h3>Store Attendants</h3>
            <ul className="user-list">
              {userData.allUsers && storeAttendants()}
            </ul>
            <Link className="green-button" to="/users">See All</Link>
          </div>
        </div>

        <div className='product'>
          <div className="product-item tp">
            <h3>New Sales</h3>
            <ul className="user-list">
              {saleRecord.data && sales()}
            </ul>
            <Link className="green-button" to="/sales">See All Sale Record</Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default lifecycle(methods)(DashboardComponent);
