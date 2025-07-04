'use client'

import css from '../../../../app/page.module.css'
import NoteList from '../../../../components/NoteList/NoteList'
import SearchBox from '../../../../components/SearchBox/SearchBox'
import Pagination from '../../../../components/Pagination/Pagination'
import { useEffect, useState } from 'react'
import {  useQuery } from '@tanstack/react-query'
import { fetchNotes, type HttpResponse } from '../../../../lib/api'
import { useDebounce } from 'use-debounce'
import { Note } from '../../../../types/note'
import Modal from '../../../../components/Modal/Modal'
import NoteForm from '../../../../components/NoteForm/NoteForm'
// import { useParams } from 'next/navigation'

type Props = {
  initialNotes: Note[],
  initialPage: number,
  initialSearch: string
  initialTotalPages: number
  tag: string
}

const NotesClient = ({ initialNotes, initialPage, initialSearch, initialTotalPages, tag }: Props) => {
  const [page, setPage] = useState(initialPage)
  const [search, setSearch] = useState(initialSearch || '')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [debouncedSearch] = useDebounce(search, 400)
  const perPage = 12
  // const params = useParams()
  // const tag = params.slug?.[0] === 'All' ? '' :  params.slug?.[0] 


  const { data, isLoading, error } = useQuery<HttpResponse, Error>({
	queryKey: ['notes', page, debouncedSearch, tag] ,
  queryFn: () => fetchNotes({ search: debouncedSearch, page, perPage, tag }),
  initialData: { notes: initialNotes, totalPages: initialTotalPages },
  refetchOnWindowFocus: false,
  placeholderData: (prev) => prev
  });

  useEffect(() => {
	setPage(1)
  }, [debouncedSearch])

  const notes = data?.notes || []
  
  if (isLoading) return <p>Loading notes...</p>
  if (error) return <p>Error loading notes!</p>


  function handleModalOpen() {
	setIsModalOpen(true)
  }

  function handleModalClose() {
	setIsModalOpen(false)
  }

  return <div className={css.app}>
	<header className={css.toolbar}>
    <SearchBox search={search} onSearchChange={setSearch} />
		{data && data.totalPages > 1 && <Pagination page={page} totalPages={data.totalPages || 1} onPageChange={setPage}/>}
		<button className={css.button} onClick={handleModalOpen}>Create note +</button>
		{isModalOpen && <Modal onClose={handleModalClose}> <NoteForm onCancel={handleModalClose}/></Modal>}
  </header>
  {!isLoading && notes.length > 0 && <NoteList notes={notes}/>}
</div>
};

export default NotesClient;