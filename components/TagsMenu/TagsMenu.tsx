'use client'
import css from './TagsMenu.module.css';
import Link from 'next/link';
import { useState } from 'react';

const fixed_tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  
    return (
  <div className={css.menuContainer}>
  <button onClick={toggleMenu} className={css.menuButton}>
    Notes ▾
  </button>
    {isOpen && (
       <ul className={css.menuList}>
          <li className={css.menuItem}>
              <Link href={`/notes/filter/All`} onClick={toggleMenu} className={css.menuLink}>
                All notes
              </Link>
          </li>
    {fixed_tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
        <Link href={`/notes/filter/${tag}`} onClick={toggleMenu} className={css.menuLink}>
          {tag}
        </Link>
      </li>
    ))}

    </ul>
)}
</div>
    )
}

export default TagsMenu;