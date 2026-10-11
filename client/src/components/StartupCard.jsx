import { Link } from 'react-router-dom';

export default function StartupCard({ startup }) {
  return (
    <article className="card">
      <h2>
        <Link to={`/raises/${startup.id}`}>{startup.name}</Link>
      </h2>
      <p>{startup.oneLiner}</p>
      <p className="muted">
        {startup.sector} · Ask: ₹{startup.fundingAsk.toLocaleString('en-IN')} ·{' '}
        {startup.interestCount} interested · by {startup.founder?.name}
      </p>
    </article>
  );
}
