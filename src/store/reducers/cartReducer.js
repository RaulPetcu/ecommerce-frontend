const calcTotal = (cart) =>
  cart.reduce((acc, item) => acc + Number(item.specialPrice) * Number(item.quantity), 0);

const initialState = {
  cart: [],
  totalPrice: 0,
  cartId: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART": {
      const productToAdd = action.payload;
      const exists = state.cart.find((item) => item.productId === productToAdd.productId);
      const updatedCart = exists
        ? state.cart.map((item) =>
            item.productId === productToAdd.productId ? productToAdd : item
          )
        : [...state.cart, productToAdd];

      return { ...state, cart: updatedCart, totalPrice: calcTotal(updatedCart) };
    }

    case "REMOVE_CART": {
      const updatedCart = state.cart.filter(
        (item) => item.productId !== action.payload.productId
      );
      return { ...state, cart: updatedCart, totalPrice: calcTotal(updatedCart) };
    }

    case "GET_USER_CART_PRODUCTS":
      return {
        ...state,
        cart: action.payload,
        totalPrice: action.totalPrice ?? calcTotal(action.payload),
        cartId: action.cartId,
      };

    case "CLEAR_CART":
      return { cart: [], totalPrice: 0, cartId: null };

    default:
      return state;
  }
};