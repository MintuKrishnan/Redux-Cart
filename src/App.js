import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const toggle = useSelector((state) => state.ui.cartIsVisible);
  return (
    <Layout>
      {toggle && <Cart />}
      {!toggle && <Products />}
    </Layout>
  );
}

export default App;
