import axios from 'axios';
import React, { useEffect, useState } from 'react';

const index = () => {
  const [productName, setProductName] = useState('');
  const [productDes, setProductDes] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [apiLoad, setApiLoad] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const baseURl = "https://ecommerce-server-live.vercel.app";

  const addOrUpdateProduct = (e) => {
    e.preventDefault();

    if (editProductId) {
      // Update product
      axios.put(`${baseURl}/edit-product/${editProductId}`, {
        name: productName,
        price: productPrice,
        description: productDes,
      })
        .then((res) => {
          console.log(res.data);
          resetForm();
          setApiLoad(!apiLoad);
        })
        .catch((err) => {
          console.log(err, 'error');
        });
    } else {
      // Add product
      axios.post(`${baseURl}/add-product`, {
        name: productName,
        price: productPrice,
        description: productDes,
      })
        .then((res) => {
          console.log(res.data);
          resetForm();
          setApiLoad(!apiLoad);
        })
        .catch((err) => {
          console.log(err, 'error');
        });
    }
  };

  const resetForm = () => {
    setProductName('');
    setProductPrice('');
    setProductDes('');
    setEditProductId(null);
    setShowPopup(false);
  };

  const openPopupForEdit = (product) => {
    setProductName(product.name);
    setProductPrice(product.price);
    setProductDes(product.description);
    setEditProductId(product.id);
    setShowPopup(true);
  };
const deleteProduct = (productId) => {
    axios.delete(`${baseURl}/delete-product/${productId}`)
      .then((res) => {
        console.log(res.data);
        setApiLoad(!apiLoad);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get(`${baseURl}/get-products`)
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [apiLoad]);

  return (
    <div>
      <form onSubmit={addOrUpdateProduct}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label>Product Description</label>
          <input
            type="text"
            value={productDes}
            onChange={(e) => setProductDes(e.target.value)}
          />
        </div>
        <div>
          <label>Product Price</label>
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <button>{editProductId ? 'Update' : 'Add'} Product</button>
      </form>

      <div>
        {allProducts?.map((eachProduct) => (
          <div key={eachProduct.id}>
            <button onClick={() => deleteProduct(eachProduct.id)}>Delete</button>
            <button onClick={() => openPopupForEdit(eachProduct)}>Edit</button>
            <br />
            Name: {eachProduct?.name} <br />
            Price: {eachProduct?.price}
            <br />
            Description: {eachProduct?.description}
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popupLayout" onClick={resetForm}>
          <div className="customPopup" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={addOrUpdateProduct}>
              <div className="inputs">
                <label>
                 <p>Name</p>
                  <input
                    type="text"
                    required
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </label>
              </div>
              <div className="inputs">
                <label>
                  <p>price</p>
                  <input
                    type="number"
                    required
                    placeholder="Product Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </label>
              </div>
              <div className="inputs">
                <label>
                 <p>Description</p>
                  <textarea
                    required
                    value={productDes}
                    onChange={(e) => setProductDes(e.target.value)}
                  ></textarea>
                </label>
              </div>
              <div className='btn'>
              <button>{editProductId ? 'Update' : 'Add'} Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
