import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function RaiseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [startup, setStartup] = useState(null);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [interestLoading, setInterestLoading] = useState(false);

  async function load() {
    setError('');
    try {
      const { startup: s } = await api(`/startups/${id}`);
      setStartup(s);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function expressInterest() {
    setMsg('');
    setError('');
    setInterestLoading(true);
    try {
      await api(`/startups/${id}/interest`, { method: 'POST' });
      setMsg('Interest recorded.');
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setInterestLoading(false);
    }
  }

  if (error && !startup) {
    const notFound = error.includes('not found') || error.includes('Not found');
    return (
      <div className="container">
        <h1>{notFound ? 'Raise not found' : 'Something went wrong'}</h1>
        <p className={notFound ? 'muted' : 'error'}>{error}</p>
        <Link to="/">Back home</Link>
      </div>
    );
  }
  if (!startup) return <p className="container">Loading…</p>;

  const founderId = startup.founder?.id || startup.founder?._id;
  const isFounder = user && founderId && String(founderId) === String(user.id);

  return (
    <div className="container">
      <p>
        <Link to="/">← All raises</Link>
      </p>
      <div className="card">
        <h1>{startup.name}</h1>
        <p>{startup.oneLiner}</p>
        <p className="muted">
          {startup.sector} · Ask: ₹{startup.fundingAsk.toLocaleString('en-IN')} ·{' '}
          {startup.interestCount} interested
        </p>
        <p className="muted">Founder: {startup.founder?.name}</p>

        {user && !isFounder && !startup.hasInterested && (
          <button type="button" onClick={expressInterest} disabled={interestLoading}>
            {interestLoading ? 'Saving…' : "I'm interested"}
          </button>
        )}
        {user && !isFounder && startup.hasInterested && (
          <p className="success">You already expressed interest.</p>
        )}
        {!user && <p className="muted">Login to express interest.</p>}
        {msg && <p className="success">{msg}</p>}
        {error && <p className="error">{error}</p>}
      </div>

      {isFounder && startup.interestedUsers && (
        <div className="card">
          <h2>Interested users</h2>
          {startup.interestedUsers.length === 0 ? (
            <p className="muted">No one yet.</p>
          ) : (
            <ul>
              {startup.interestedUsers.map((u) => (
                <li key={u.email}>
                  {u.name} ({u.email})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
