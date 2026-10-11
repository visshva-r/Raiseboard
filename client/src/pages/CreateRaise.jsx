import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';

export default function CreateRaise() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    oneLiner: '',
    sector: 'FinTech',
    fundingAsk: '',
  });
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const { startup } = await api('/startups', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      navigate(`/raises/${startup.id}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <h1>Create a raise</h1>
      <form className="form" onSubmit={onSubmit}>
        <input
          placeholder="Startup name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          required
        />
        <textarea
          placeholder="One-liner"
          value={form.oneLiner}
          onChange={(e) => update('oneLiner', e.target.value)}
          rows={3}
          required
        />
        <select value={form.sector} onChange={(e) => update('sector', e.target.value)}>
          <option>FinTech</option>
          <option>HealthTech</option>
          <option>EdTech</option>
          <option>SaaS</option>
          <option>Other</option>
        </select>
        <input
          type="number"
          min="0"
          placeholder="Funding ask (INR)"
          value={form.fundingAsk}
          onChange={(e) => update('fundingAsk', e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Publish raise</button>
      </form>
    </div>
  );
}
