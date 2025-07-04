import Link from 'next/link'
import css from './Header.module.css'
import dynamic from 'next/dynamic'

const TagsMenu = dynamic(() => import('../TagsMenu/TagsMenu'))

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
          <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>

  )
}

export default Header