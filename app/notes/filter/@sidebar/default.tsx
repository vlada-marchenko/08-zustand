import Link from 'next/link'
import css from './SidebarNotes.module.css'

const all_tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']

const SidebarNotes = async () => {

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/All" className={css.menuLink}>
          All notes
        </Link>
      </li>
      {all_tags.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SidebarNotes 

