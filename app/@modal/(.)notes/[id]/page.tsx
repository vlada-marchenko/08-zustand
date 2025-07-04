import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import { fetchNoteById } from '../../../../lib/api'
import NotePreview from './NotePreview.client'

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const queryClient = new QueryClient()
  const numericId = Number(id)
  await queryClient.prefetchQuery({
    queryKey: ['note', numericId],            
    queryFn: () => fetchNoteById(numericId),
  })


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview noteId={numericId} />
    </HydrationBoundary>
  )
}