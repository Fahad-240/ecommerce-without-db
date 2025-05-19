// pages/product-list.js
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productName, setProductName] = useState('');
    const [productDes, setProductDes] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [showPopup, setShowPopup] = useState(false);
      const [apiLoad, setApiLoad] = useState(false);
        const [editProductId, setEditProductId] = useState(null);
      

     const baseURl = "https://ecommerce-server-live.vercel.app";

  useEffect(() => {
    axios.get("https://ecommerce-server-live.vercel.app/get-products")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));
  }, []);


  const deleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
    axios.delete(`${baseURl}/delete-product/${productId}`)
      .then((res) => {
        console.log(res.data);
        setApiLoad(!apiLoad);
      })
      .catch((err) => {
        console.log(err);
      });
  };

   const addOrUpdateProduct = (e) => {
    e.preventDefault();
    if (editProductId) {
      axios.put(`${baseURl}/edit-product/${editProductId}`, {
        name: productName,
        price: productPrice,
        description: productDes,
      })
        .then((res) => {
          console.log(res.data);
          resetForm();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          setApiLoad(!apiLoad);
          router.push('/Product-list'); // 
        })
        .catch((err) => {
          console.log(err, 'error');
        });
    } else {

      //////////////////////// Add product /////////////////////////////////////////
      axios.post(`${baseURl}/add-product`, {
        name: productName,
        price: productPrice,
        description: productDes,
      })
        .then((res) => {
          console.log(res.data);
          resetForm();
          setApiLoad(!apiLoad);
              router.push('/Product-list');
        })
        .catch((err) => {
          console.log(err, 'error');
        });
    }
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
    setProductDes(product.description); setEditProductId(product.id);
    setShowPopup(true);
  };
  return (
    <>
    <div>
      <h1>All Products</h1>
      {allProducts.map(eachProduct => (
        <div key={eachProduct.id}>
             <button onClick={() => deleteProduct(eachProduct.id)}>Delete</button>
              <button onClick={() => openPopupForEdit(eachProduct)}>Edit</button>
          <h2>{eachProduct.name}</h2>
          <p>Price: {eachProduct.price}</p>
          <p>{eachProduct.description}</p>
        </div>
      ))}


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
    </>
    
  );
};

export default ProductList;
