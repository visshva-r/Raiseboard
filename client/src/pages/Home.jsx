import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import StartupCard from '../components/StartupCard.jsx';

export default function Home() {
  const [startups, setStartups] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/startups')
      .then(({ startups: list }) => setStartups(list))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="container">Loading raises…</p>;
  if (error) return <p className="container error">{error}</p>;

  return (
    <div className="container">
      <h1>Startup raises</h1>
      {startups.length === 0 ? (
        <p className="muted">No raises yet. Be the first founder to post one.</p>
      ) : (
        startups.map((s) => <StartupCard key={s.id} startup={s} />)
      )}
    </div>
  );
}
