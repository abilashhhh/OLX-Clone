import React ,{useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';
import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
 
function Home( ) {
  const [searchQuery, setSearchQuery] = useState('');
  console.log("search query printed from hoem page: ", searchQuery)
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <div className="homeParentDiv">
      <Header onSearch={handleSearch}/>
      <Banner />
      <Posts searchQuery={searchQuery}/>
      <Footer />
      <ToastContainer />  

    </div>
  );
}

export default Home;
 
