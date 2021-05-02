import { useState } from "react";
import { useHistory } from "react-router";
import "../styles/searchInput.css";
import { Magnifier } from "./Icons";

const SearchInput = () => {
  const [term, setTerm] = useState('');
  const history = useHistory();

  const search = e => {
    e.preventDefault();
    history.push(`/search?term=${term}`);
  }
  return (
    <div className="search-container">
      <form className="search-form" onSubmit={search}>
        <input placeholder="검색" className="search-input" type="text" value={term} onChange={e => setTerm(e.target.value)} />
        <button className="search-button"><Magnifier size="20" /></button>
      </form>
    </div>
  )
}

export default SearchInput;