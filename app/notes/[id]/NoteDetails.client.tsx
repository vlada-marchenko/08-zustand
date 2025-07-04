'use client'

import css from "./NoteDetails.module.css"
import { fetchNoteById } from "../../../lib/api"
import { useQuery } from "@tanstack/react-query"

type Props = {
    noteId: number
}

const NoteDetailsClient = ({ noteId }: Props) => {

    const { data: note, isLoading, error } = useQuery({
        queryKey: ['note', noteId],
        queryFn: () => fetchNoteById(noteId),
        refetchOnMount: false
    })

    if (isLoading) return <p>Loading, please wait...</p>
    if (error || !note) return  <p>Something went wrong.</p>
    
    const createdNoteDate = note.createdAt

    return (
<div className={css.container}>
<div className={css.item}>
<div className={css.header}>
<h2>{note.title}</h2>
<button className={css.editBtn}>Edit note</button>
</div>
<p className={css.content}>{note.content}</p>
<p className={css.date}>{createdNoteDate}</p>
</div>
</div>       
    )
}

export default NoteDetailsClient