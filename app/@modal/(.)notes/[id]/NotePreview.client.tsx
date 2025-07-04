'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Modal from '../../../../components/Modal/Modal'
import { fetchNoteById } from '../../../../lib/api'
import css from './NotePreview.module.css'
import type { Note } from '../../../../types/note'

export default function NotePreview({ noteId }: { noteId: number }) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,     
  })

  const router = useRouter()
  const handleClose = () => router.back()


  if (isLoading) return null
  if (isError || !note) return <p>Помилка завантаження нотатки</p>

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <button
          className={css.backBtn}
          onClick={handleClose}
          aria-label="Закрити модальне вікно"
        >
          ×
        </button>

        <header className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </header>

        <p className={css.content}>{note.content}</p>

        {note.createdAt && (
          <time dateTime={note.createdAt} className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </time>
        )}
      </div>
    </Modal>
  )
}
