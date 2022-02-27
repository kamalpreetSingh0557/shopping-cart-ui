import smartphone from './smartphone.jpg';
import speaker from './speaker.jpg';
import book from './book.jpg';

import * as actionTypes from './actions';

const initialState = {
    Products:[
        {
          id: 1,
          title: "Smartphone",
          description:
            `This smartphone is not just a sight to behold but also comes equipped with innovative features
             that will keep you productive and entertained. Its Helio G85 Gaming Processor ensures that you stay
              on top of the leaderboard while gaming. Its 16.5 cm (6.5) Mini-drop Fullscreen ensures an immersive
               experience while gaming, streaming content, and more. `,
          price: 20000,
          image:smartphone,
        },
        {
          id: 2,
          title: "Bluetooth Speaker",
          description:
              `With the Bluetooth speaker, you can enjoy motivational, dance, or instrumental music whenever you want. 
            It ensures an immersive listening experience with its 52 mm full-range driver so that you can stay entertained
             wherever you are. With an IPX7 rating, it ensures water resistance so that you can listen to music by
              the poolside without a worry in the world.`,
          price: 999.0,
          image:speaker,
        },
        {
          id: 3,
          title: "Book",
          description:
            `The land of Meluha is an empire created by Lord Rama, and it is ruled by the Suryavanshis. This empire 
            is powerful and proud, however, the Saraswati river that is their source of water is slowing drying up. 
            On top of that, the empire is at war with the Chandravanshis who have allied with The Nagas, a group of 
            sinister and deformed human beings who have extraordinary martial art skills.`,
          price: 250.0,
          image:book
        },
      ],
    currentItem:null,
    Cart:[],
}

  const shopReducer = (state=initialState, action) => {
    /* Understand below logic with 2 Example 
       Example 1 : Let's suppose Cart has [{id : 3}, {id : 2}] and we want to ADD {id : 2} product in Cart // Line 60 "state.Cart.map((cartProduct)=>cartProduct.id==action.payload.id ? {...state.Cart, qty : cartProduct.qty + 1}:cartProduct):"
       Example 2 : Let's suppose Cart has [{id : 3}, {id : 2}, {id : 2}] and we want to ADD {id : 1} product in Cart => Line 61 "[...state.Cart, {...item, qty : 1}]"
                    Or 
                  The Cart is empty and we want to add {id : 1}  
    */
    switch(action.type){
        case actionTypes.ADD_TO_CART : 
            const item = state.Products.find((product)=>product.id==action.payload.id);
            //console.log(item);
            const inCart = state.Cart.find((product)=> product.id==action.payload.id ? true:false);
            return{
              ...state, // We are copying everthing as it is but since we want to update Cart therefore "Cart : inCart ? ...."
              Cart : inCart ? 
                      state.Cart.map((cartProduct)=>cartProduct.id==action.payload.id ? {...cartProduct, qty : cartProduct.qty + 1}:cartProduct): // agr Cart mein {id : 2} wala product pehle se present hai to uss product ki "qty" mein field mein "+1" krna hai bs and agr Cart mein pdi id action.payload.id ke equal nhi hai jaise {id : 3}[Cart mein to hai but not equal to action.payload.id] then simply CartProduct return krdo
                      [...state.Cart, {...item, qty : 1}] // and agr action.payload.id wala product jaise {id : 1} Cart mein hi nhi hai to pori Cart ko spread krvado and items ki saari properties spread krvado aur ek property id bnake uski value 1 set krdo
            }
          case actionTypes.LOAD_CURRENT_ITEM :
              return {
                ...state,
                currentItem : action.payload.item
              }
          case actionTypes.REMOVE_FROM_CART :
              return{
                ...state,
                Cart : state.Cart.filter((cartProduct) => cartProduct.id != action.payload.id)
                // Below not valid because humein "removeFromCart" [in Caritem.js] mein props mein sirf "id" mil rha hai
                // and hum yah pe 2 props ka use kr rhe hain (id, qty) isliye not valid
                //Cart : state.Cart.map((cartProduct) => cartProduct.id == action.payload.id ? {...cartProduct, qty : qty - 1} : cartProduct)
              }
          case actionTypes.UPDATE_QTY :
            return{
              ...state,
              Cart : state.Cart.map((cartProduct) => cartProduct.id == action.payload.id ? {...cartProduct, qty : action.payload.qty} : cartProduct)
            }           
          default : 
              return state;    
    }
    
  }

export default shopReducer;