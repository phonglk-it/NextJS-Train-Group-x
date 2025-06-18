import Link from 'next/link';
import Style from '../components/Style/style';
import CustomersPage from '../components/Customers/page';
import StylePage from '../components/Style/page';
import Customers from '@/components/Customers/customers';
import Cart from './Cart/cart';

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
        <ul>
          <li>About</li>
          <li>Contact</li>
          <li>Blog</li>
        </ul>
    </main>
  );
}
