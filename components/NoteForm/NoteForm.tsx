'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import css from './NoteForm.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import type { FormikHelpers } from 'formik'
import * as yup from 'yup'
import { createNote } from '../../lib/api'


   interface NoteFormValues {
    title: string,
    content: string,
    tag: string
   }

   const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo'
   }

   export interface NoteFormProps {
    onCancel: () => void
   }

   const validationSchema = yup.object().shape({
    title: yup.string().min(3).max(50).required('Title is required'),
    content: yup.string().max(500),
    tag: yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required('Tag is required')
   })

export default function NoteForm({ onCancel }: NoteFormProps) {
    const queryClient = useQueryClient();

    const { mutate: addNote } = useMutation({
      mutationFn: createNote, 
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes']})
        onCancel()
      }
    })

    const handleSubmit = (values: NoteFormValues, actions: FormikHelpers<NoteFormValues>) => {
      addNote(values)
      actions.resetForm()
    }


    return ( <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting}) => (
    <Form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <Field id="title" type="text" name="title" className={css.input} />
    <ErrorMessage component='span' name="title" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <Field
      as='textarea'
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
    <ErrorMessage component='span' name="content" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <Field as='select' id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <ErrorMessage component='span' name="tag" className={css.error} />
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={onCancel}> 
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={isSubmitting}
    >
      Create note
    </button>
  </div>
</Form> )}
</Formik>
    )
}