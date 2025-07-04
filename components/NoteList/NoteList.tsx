'use client'

import css from './NoteList.module.css'
import type { Note } from '../../types/note'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNote } from '../../lib/api'
import Link from 'next/link'

export interface NoteListProps {
  notes: Note[]
}

export default function NoteList({ notes }: NoteListProps) {

  const queryClient = useQueryClient()
  const { mutate: remove } = useMutation<void, Error, number>({
    mutationFn: (id: number) => deleteNote(id).then(() => {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes']})
})

    return <ul className={css.list}>
	    {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link scroll={false} href={`/notes/${note.id}`}>View details</Link>
            <button className={css.button} onClick={() => remove(note.id)}>Delete</button>
          </div>
        </li>
      ))}
</ul>

}