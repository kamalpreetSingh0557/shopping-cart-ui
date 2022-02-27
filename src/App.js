import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";

import { connect } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import SingleItem from "./components/SingleItem/SingleItem";

function App({ current }) {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Products} />
          <Route exact path="/cart" component={Cart} />
          {/*Ye isliye kiya ki jb bhi hum "viewCart" krte the to wo product khul jata tha in new route "/product/:{productId}" iski wgh se "currentItem" mein ":productId" ki value set ho jaati thi.
            So, jb bhi hm reload krte to "currentItem" ki value "null" ho jaati thi but route usi productId ka khula hota tha ,
            Uski[reload ki] wgh se errors aate hain for that what we've done is
            agr current ki value null hai to "product/" route pe le aao agr nhi to "product/:productId" wala page dikha do */}
          {!current ? 
            <Redirect to="/" />
           : 
            <Route exact path="/product/:id" component={SingleItem}/>
          }
          {/* <Route exact path="/product/:id" component={SingleItem}/> */}
        </Switch> 
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
    return{
      current : state.currentItem
    }
}

export default connect(mapStateToProps)(App)