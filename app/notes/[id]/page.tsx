import { fetchNoteById } from '../../../lib/api';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

export interface PageParams {
  id: string;
}

export default async function NotePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { id } = await params;         
  const noteId = Number(id);

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient noteId={noteId} />
    </HydrationBoundary>
  );
}