import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  return { props: { users } };
}

export default function Home({ users }) {
  const [searchId, setSearchId] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchId) {
      router.push(`/users/${searchId}`);
    }
  };

  return (
    <div>
      <h1>Daftar Pengguna</h1>
      <input
        type="number"
        placeholder="Cari dengan ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
      />
      <button onClick={handleSearch}>Cari</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
