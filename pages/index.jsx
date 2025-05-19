import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// import { useRouter } from 'next/router';



const index = () => {
  const [productName, setProductName] = useState('');
  const [productDes, setProductDes] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [apiLoad, setApiLoad] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const router = useRouter();

  const baseURl = "https://ecommerce-server-live.vercel.app";

  /////////////// updaate product ////////////////////////
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

      //     //////////////////////// Add product /////////////////////////////////////////
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

  const resetForm = () => {
    setProductName('');
    setProductPrice('');
    setProductDes('');
    setEditProductId(null);
    setShowPopup(false);
  };

  // const openPopupForEdit = (product) => {
  //   setProductName(product.name);
  //   setProductPrice(product.price);
  //   setProductDes(product.description); setEditProductId(product.id);
  //   setShowPopup(true);
  // };

  //   ///////////////////////// deleted product //////////////////////////
  // const deleteProduct = (productId) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: "Your file has been deleted.",
  //         icon: "success"
  //       });
  //     }
  //   });
  //   axios.delete(`${baseURl}/delete-product/${productId}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setApiLoad(!apiLoad);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // /////////////////////get product////////////////////
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
    
      <div className='container'>
        <div className='header'>
          <h1>Product Cards</h1>
          <button>All Cards</button>
        </div>
        <div className='parent'>
          <div className='child'>

            <form onSubmit={addOrUpdateProduct}>
              <div>
                <h1 className='head'>
                  Add Product
                </h1>
              </div>

              <div className='inner'>
                <div className="product">
                  <label><p>Product Name</p></label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>


                <div className='price'>
                  <label><p>Product Price</p></label>
                  <input
                    type="text"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>

                <div className='des'>
                  <label><p>Product Description</p></label>
                  <input
                    type="text"
                    value={productDes}
                    onChange={(e) => setProductDes(e.target.value)}
                  />
                </div>

                <div className='add-btn'>
                  <button>{editProductId ? 'Update' : 'Add'} Product</button>
                </div>

              </div>
           
          </form>
          

        </div>

        {/* <div>
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
        </div> */}
      </div>

      {/* {showPopup && (
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
      )} */
      }
    </div >
  );
};

export default index;

