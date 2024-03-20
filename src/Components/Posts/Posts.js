 
import React, { useEffect, useState, useContext } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts(props) {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(firebase);
      const productsCollection = collection(db, 'products');
      const snapshot = await getDocs(productsCollection);
      const productsData = snapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id
      }));
      setProducts(productsData);
    };
    fetchData();
  }, [firebase]);

  const handleSearch = (query) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.price.toString().toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setSearchQuery(query);
  };

  useEffect(() => {
    handleSearch(props.searchQuery);
  }, [props.searchQuery]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {(filteredProducts.length > 0 ? filteredProducts : products).map(product => (
            <div className="card" onClick={() => {
              setPostDetails(product);
              navigate('/view');
            }} key={product.id}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.downloadURL} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
    