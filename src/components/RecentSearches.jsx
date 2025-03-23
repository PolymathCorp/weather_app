import React from 'react'

function RecentSearches({searches, onSelect}) {
    if(!searches || searches.length === 0) return null;
  return (
    <div>
      {searches.map(search => (
        <button
        key={search}
        onClick={() => onSelect(search)}>
            {search}
        </button>
      ))}
    </div>
  );
};

export default RecentSearches
