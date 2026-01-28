import React from 'react';
import type { Category } from '../types';

interface Props {
  selected: Category;
  onSelect: (category: Category) => void;
}

const FilterBar: React.FC<Props> = ({ selected, onSelect }) => {
  const categories: Category[] = ['All', 'Meeting', 'Invoice', 'Support Request', 'Other'];

  return (
    <div className="filter-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`filter-btn ${selected === cat ? 'active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;