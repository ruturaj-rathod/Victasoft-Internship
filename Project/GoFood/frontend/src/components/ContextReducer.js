import { createContext } from "react";

export const cartContext = createContext();
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          quantity: action.quantity,
          size: action.size,
          img: action.img,
        },
      ];

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          arr[index] = {
            ...food,
            quantity: parseInt(action.quantity) + food.quantity,
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;

      case "DROP":
        return [];

    default:
      break;
  }
};

// export const CartProvider = ({ chlidern }) => {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     return (
//         <CartDispathContex.Provider value={dispatch}>
//             <CartStateContex.Provider value={state}>
//                 {chlidern}
//             </CartStateContex.Provider>
//         </CartDispathContex.Provider>
//     )
// }

// export const useCart = () => useContext(CartStateContex);
// export const useDispatchCart = () => useContext(CartDispathContex);
