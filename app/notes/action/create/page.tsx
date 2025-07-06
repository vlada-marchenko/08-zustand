
import css from './createNote.module.css'
import NoteForm from "../../../../components/NoteForm/NoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create note',
  description: 'Add a new note to your list',
  openGraph: {
    title: 'Create note',
    description: 'Add a new note to your list',
    url: 'https://08-zustand-five.vercel.app/notes/action/create',
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: 'Create note'
    }]
  }
}

const CreateNotePage = async () => {

    return (
        <main className={css.main}>
          <div className={css.container}>
            <h1 className={css.title}>Create note</h1>
	           <NoteForm/>
          </div>
        </main>

    )
}

export default CreateNotePage