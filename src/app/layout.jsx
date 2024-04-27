import { cache } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

const items = [
  { id: '1', name: 'one' },
  { id: '2', name: 'two' },
  { id: '3', name: 'three' },
  { id: '4', name: 'four' },
  { id: '5', name: 'five' },
];

const getData = cache(async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: items });
    }, 300);
  });
});

export default async function RootLayout({ children }) {
  const response = await getData();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ul>
          {response.data.map((item) => (
            <li key={item.id}>
              <Link href={`/item/${item.id}`} prefetch={false}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {children}
      </body>
    </html>
  );
}
