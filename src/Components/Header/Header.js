import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify';


function Header({ onSearch }) {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth();
  const [query, setQuery] = useState('');
  // console.log("Search query :" , query)

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to={'/'}> <OlxLogo></OlxLogo></Link>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>

        {/* // =========================== search ======================  */}


        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              name="text"
              placeholder="Find car,mobile phone and more..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="searchAction">

            <button onClick={handleSearch} style={{ backgroundColor: 'black' }}> <Search   ></Search></button>
          </div>
        </div>


        {/* =================================================  */}



        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
          <div className="loginPage">
            <span>{user ? `Welcome ${user.displayName}` : <Link to={'/login'} >Login</Link>}</span>
            <hr />
          </div>

          {user && (
            <span
              style={{ cursor: 'pointer' , color:'red'}}
              onClick={() => {
                auth.signOut();
                setTimeout(() => {
                  navigate("/");
                }, 3000);
                toast.error('Logged out successfully!', { position: "top-right", autoClose: 3000 });
              }}
            >
              Logout
            </span>
          )}


        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            {/* <span><Link to={'/create'}>SELL</Link></span> */}

            {user ? <span><Link to={'/create'}>SELL</Link></span> : <span><Link to={'/login'}>SELL</Link></span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
