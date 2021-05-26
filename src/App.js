import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui-slilce';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending',
          message: 'Sending Cart Data',
        })
      );
      const response = await fetch(
        'https://react-97a72-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
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

    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error !!',
          message: 'Error Sending Cart Data',
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {toggle && <Cart />}
        {!toggle && <Products />}
      </Layout>
    </Fragment>
  );
}

export default App;
