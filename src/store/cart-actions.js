import { cartActions } from './cart-slice';
import { uiActions } from './ui-slilce';

export const fetchCartData = (cart) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-97a72-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json'
      );

      if (!response.ok) {
        throw new Error('Fetching data from Cart Failed');
      }

      const data = await response.json();

      return data;
    };

    const cartData = await fetchData().catch(() => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error !!',
          message: 'Error Fetching Cart Data',
        })
      );
    });
    console.log(cartData);
    dispatch(
      cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      })
    );
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending',
          message: 'Sending Cart Data',
        })
      );

      const response = await fetch(
        'https://react-97a72-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending data to Cart failed');
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success !!',
          message: 'Success Sending Cart Data',
        })
      );
    };

    sendRequest().catch(() => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error !!',
          message: 'Error Sending Cart Data',
        })
      );
    });
  };
};
