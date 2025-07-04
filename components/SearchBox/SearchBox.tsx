'use client'

import css from './SearchBox.module.css'
import React from 'react';

interface SearchBoxProps {
  search: string
  onSearchChange: (value: string) => void
}


export default function SearchBox({ search, onSearchChange }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={search}
      onChange={handleChange}
    />
  );
}