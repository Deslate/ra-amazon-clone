import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../../core/firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }

  return (
    <div className="App-header">
      <Link to="/">
        <img
          className="App-header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="App-header__search">
        <input className="App-header__searchInput" type="text" />
        <button className="App-header__searchIcon">
          <SearchIcon style={{fontSize:"24px"}} />
        </button>
      </div>

      <div className="App-header__nav">
        <Link to={!user && '/login'}>
          <div onClick={handleAuthenticaton} className="App-header__option">
            <span className="App-header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
            <span className="App-header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <Link to='/orders'>
          <div className="App-header__option">
            <span className="App-header__optionLineOne">Returns</span>
            <span className="App-header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        

        <div className="App-header__option">
          <span className="App-header__optionLineOne">Your</span>
          <span className="App-header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="App-header__optionBasket">
            <ShoppingBasketIcon />
            <span className="App-header__optionLineTwo App-header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
