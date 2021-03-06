import { Cart, Item } from "stores";
import AppStore from "stores/AppStore";
import { sleep } from "utils/helper";

type actionType =
  | "cart/addItem"
  | "cart/increaseItemQuantity"
  | "cart/decreaseItemQuantity"
  | "cart/removeItem"
  | "cart/initCart";
// sku quantity

interface State {
  cart: Cart;
}

const cartState: State = {
  cart: {},
};

function checkItem(item: Item) {
  return true;
}

function updateItemQuantity(cartState: State, item: Item, increment: number) {
  let newCart = { ...cartState.cart };
  // update quantity
  if (Object.keys(cartState.cart).includes(item.id)) {
    const quantity = newCart[item.id] + increment;
    if (quantity > 0) newCart[item.id] = newCart[item.id] + increment;
    if (quantity <= 0) delete newCart[item.id];
    // TODO API CALL HERE
    sleep(100).then(() => {
      //  se va tutto bene apposto
      // altrimenti devo revertare lo stato
    });
    AppStore.setCart(newCart).then(() => console.log(AppStore.cart));
    return { ...cartState, cart: newCart };
  }

  // new item added
  sleep(100).then(() => {
    //  se va tutto bene apposto
    // altrimenti devo revertare lo stato
  });
  if (increment > 0) newCart[item.id] = (newCart[item.id] ?? 0) + increment;
  AppStore.setCart(newCart).then(() => console.log(AppStore.cart));
  return { ...cartState, cart: newCart };
}

export default function cartReducer(
  state = cartState,
  action: { payload: any; type: actionType }
) {
  switch (action.type) {
    case "cart/addItem":
    case "cart/increaseItemQuantity": {
      const item = action.payload;
      if (!checkItem(item)) return state;
      return updateItemQuantity(state, item, 1);
    }

    case "cart/removeItem": {
      const item = action.payload;
      if (!checkItem(item)) return state;
      return updateItemQuantity(state, item, -1000000);
    }

    case "cart/initCart": {
      const cart = action.payload;
      return { cart };
    }

    case "cart/decreaseItemQuantity": {
      const item = action.payload;
      if (!checkItem(item)) return state;
      return updateItemQuantity(state, item, -1);
    }
    default:
      return state;
  }
}
