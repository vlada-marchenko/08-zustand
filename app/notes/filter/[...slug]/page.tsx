export const dynamic = 'force-dynamic';

import { fetchNotes } from '../../../../lib/api';
import css from '../../../page.module.css';
import NotesClient from './Notes.client';


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
