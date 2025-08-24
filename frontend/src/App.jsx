import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [companies, setCompanies] = useState([]);
  const [industry, setIndustry] = useState('');
  const [country, setCountry] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(9); // Lazy loading: show 9 at first

  // Fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      let url = 'http://localhost:8080/api/companies?';
      if (industry) url += `industry=${industry}&`;
      if (country) url += `country=${country}&`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setCompanies(data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setCompanies([]);
      }
      setLoading(false);
    };
    fetchCompanies();
  }, [industry, country]);

  // Filter by search
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );
  // Lazy loading: show only 'visible' companies
  const displayedCompanies = filteredCompanies.slice(0, visible);

  // Get unique industries and countries for dropdowns
  const industries = [...new Set(companies.map(c => c.industry))];
  const countries = [...new Set(companies.map(c => c.location?.country))];

  return (
    <div className="container">
      <h1>Welcome to listed companies</h1>
      <div className="filters">
        <select value={industry} onChange={e => setIndustry(e.target.value)}>
          <option value="">All Industries</option>
          {industries.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
        <select value={country} onChange={e => setCountry(e.target.value)}>
          <option value="">All Countries</option>
          {countries.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <input
          type="text"
          className="search-input"
          placeholder="Search company..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="card-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          displayedCompanies.map(company => (
            <div className="company-card genz-card" key={company._id || company.id}>
              <div className="card-gradient"></div>
              <h2 className="company-title">{company.name}</h2>
              <p className="company-industry">{company.industry}</p>
              <p className="company-employees">👥 {company.employees} Employees</p>
            </div>
          ))
        )}
      </div>
      {visible < filteredCompanies.length && (
        <button className="load-more-btn" onClick={() => setVisible(v => v + 9)}>
          Load More
        </button>
      )}
    </div>
  );
}

export default App;