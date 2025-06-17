import Link from 'next/link';
import Style from './Style/style';
import CustomersPage from './Customers/page';
import StylePage from './Style/page';

export default function Home() {
  return (
    <main>
      <StylePage />
      <CustomersPage />
    </main>
  );
}
