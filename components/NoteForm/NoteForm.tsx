'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import css from './NoteForm.module.css'
import { createNote, CreateParams } from '../../lib/api'
import { useRouter } from 'next/navigation'
import { useNoteDraft } from '../../lib/store/noteStore'
import { useState } from 'react'


export default function NoteForm() {
    const router = useRouter()
    const { draft, setDraft, clearDraft } = useNoteDraft()
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null)
    const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft(),
      setErrorMessage,
      router.push('/notes')
    },
    onError: (error) => {
      if (error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Failed to create note. Please try again.')
      }
    }
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)
    const newNote: CreateParams = {
      title: draft.title,
      content: draft.content,
      tag: draft.tag || 'Todo',
    }
    mutate(newNote)
  }

    const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDraft({ ...draft, [name]: value })
  }


return ( 
<>
  <form onSubmit={handleSubmit} className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <input id="title" type="text" name="title" disabled={isPending} value={draft.title} className={css.input} onChange={handleChange}/>
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <textarea id="content" name="content" value={draft.content} disabled={isPending} rows={8} className={css.textarea} onChange={handleChange} ></textarea>
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select name="tag" id="tag" value={draft.tag} disabled={isPending} className={css.select} onChange={handleChange}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={() => router.back()}> 
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
    >
      Create note
    </button>
  </div>
</form>
</>
)
}