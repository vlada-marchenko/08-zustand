export const dynamic = 'force-dynamic';

import { title } from 'process';
import { fetchNotes } from '../../../../lib/api';
import css from '../../../page.module.css';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{slug?: string[]}>
}

export async function generateMetadata({ params }: Props ) {
  const slugArray = (await params).slug || [];
  const filter = slugArray.join(' / ') || 'All notes';

  return {
    title: `${filter} notes`,
    description: `Notes filtered by ${filter}.`,
    openGraph: [{
      title: `${filter} notes`,
      description: `Notes filtered by ${filter}.`,
      url: `https://08-zustand-five.vercel.app/notes/filter/${filter}`,
      images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: `${filter} notes`
    }]
    }]
  };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {

  const { slug } = await params;

  const initialSearch = '';
  const initialPage = 1;
  const tag = slug?.[0] === 'All' ? '' : slug?.[0] ?? '';

  const response = await fetchNotes({
    search: initialSearch,
    page: initialPage,
    perPage: 10,
    tag
  });

  return (
    <div className={css.app}>
      <NotesClient
        initialNotes={response.notes}
        initialPage={initialPage}
        initialSearch={initialSearch}
        initialTotalPages={response.totalPages}
        tag={tag}
      />
    </div>
  );
}
