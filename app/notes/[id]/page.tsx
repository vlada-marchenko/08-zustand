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

type Props = {
  params: Promise<PageParams>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const noteId = Number(id)
  const note = await fetchNoteById(noteId)

  return {
    title: `Note: ${note.title}`,
    description: note.content,
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content,
      url: `https://08-zustand-five.vercel.app/notes/${note.id}`,
      images: [{
         url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
         width: 1200,
         height: 630,
         alt: `Note: ${note.title}`
      }]
    }
  }
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