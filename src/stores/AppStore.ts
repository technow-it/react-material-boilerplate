import { Cart } from "./CartStore";
import Storage from "utils/Storage";
import store from "redux/store";
import sleep from "utils/helper";

class AppStore {
  cart: Cart = {};
  likes: string[] = [];

  loadCart = async () => {
    this.cart = await Storage.load("@AppStore:cart", this.cart);
    console.log(this.cart);
  };
  loadLikes = async () => {
    this.likes = await Storage.load("@AppStore:likes", this.likes);
  };

  // TODO CONNECT API
  fetchCart = async () => {};
  fetchLikes = async () => {};

  inizializers = [this.loadCart(), this.loadLikes()];
  networkInizializers = [this.fetchCart, this.fetchLikes];

  async loadInitialData() {
    await Promise.all(this.inizializers);

    console.log(this.cart, this.likes);
    sleep(1000).then(() => {
      store.dispatch({
        type: "item/initLikes",
        payload: this.likes,
      });
      store.dispatch({
        type: "cart/initCart",
        payload: this.cart,
      });
    });

    await Promise.all(this.networkInizializers);
  }

  async setCart(cart: Cart) {
    this.cart = cart;
    await Storage.save("@AppStore:cart", cart);
  }

  async setLikes(likes: string[]) {
    this.likes = likes;
    await Storage.save("@AppStore:likes", likes);
  }
}
export default new AppStore();