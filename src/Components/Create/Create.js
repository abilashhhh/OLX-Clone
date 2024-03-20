import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { toast } from 'react-toastify';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [hourglassVisible, setHourglassVisible] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setImage(selectedFile);
      setErrors({ ...errors, image: '' }); // Clear any previous error message
    } else {
      setImage(null);
      setErrors({ ...errors, image: 'Please select a valid image file.' });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Product name is required.';
    }
    if (!category.trim()) {
      errors.category = 'Product category is required.';
    }
    if (!price.trim()) {
      errors.price = 'Product price is required.';
    }
    if (parseFloat(price) < 0) {
      errors.price = 'Product price should not be below 0.';
    }
    if (!image) {
      errors.image = 'Product image is required.';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    const db = getFirestore(firebase);

    try {
      setHourglassVisible(true);

      uploadTask.on('state_changed', (snapshot) => {
        console.log('Image uploading..');
      });

      // Upload image
      const snapshot = await uploadTask;
      console.log('Image uploaded');

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Download URL:', downloadURL);

      // Add product to Firestore
      const docRef = await addDoc(collection(db, "products"), {
        name,
        category,
        price,
        downloadURL,
        userId: user.uid,
        createdAt: new Date().toDateString()
      });
      console.log('Product added to Firestore with ID:', docRef.id);
      toast.success('Product added successfully..', { position: "top-right", autoClose: 3000 });

      setTimeout(() => {
        navigate("/");
        setHourglassVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error in creating product. Please try again.', { position: "top-right", autoClose: 3000 });
      setHourglassVisible(false);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <h2 style={{ marginBottom: '20px' }}>Create Page</h2>

        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span className="error">{errors.name}</span>}
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {errors.category && <span className="error">{errors.category}</span>}
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <span className="error">{errors.price}</span>}
        <br />
        <br />
        <div className='imgPreview'>
          <img
            alt="Preview Image"
            src={image ? URL.createObjectURL(image) : ''}
            style={image ? { width: "200px", height: "200px" } : {}}
          />
        </div>
        <br />
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <br />
        {errors.image && <span className="error">{errors.image}</span>}
        <br />
        <div className="hourglassBackground" style={{ display: hourglassVisible ? 'block' : 'none' }}>
        {/* <div class="hourglassBackground"> */}
      <div class="hourglassContainer">
        <div class="hourglassCurves"></div>
        <div class="hourglassCapTop"></div>
        <div class="hourglassGlassTop"></div>
        <div class="hourglassSand"></div>
        <div class="hourglassSandStream"></div>
        <div class="hourglassCapBottom"></div>
        <div class="hourglassGlass"></div>
      {/* </div> */}
    </div>
        </div>
        <button onClick={handleClick} type="submit" className="uploadBtn">Upload and Submit</button>
      </div>
    </Fragment>
  );
};

export default Create;
