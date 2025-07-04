import type { Note } from '../types/note'
import axios from 'axios'

export interface FetchParams {
    search?: string,
    tag?: string,
    page: number,
    perPage?: number,
    sortBy?: string
}

export interface CreateParams {
    title: string,
    content: string,
    tag: string
}

export interface HttpResponse {
    notes: Note[]
    totalPages: number
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
const BASE_URL = 'https://notehub-public.goit.study/api/notes'

export async function fetchNotes({search = '', page = 1, tag = '', perPage = 12}: FetchParams): Promise <HttpResponse> {
    const params: Record<string, string | number> = { page, perPage };
    if (search.trim()) params.search = search.trim();
    if (tag.trim()) params.tag = tag.trim();

    const { data } = await axios.get<HttpResponse>(BASE_URL, {
        params,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    return data
}


export async function fetchNoteById(id:number): Promise <Note> {
    const fetchedNote = await axios.get<Note>(`${BASE_URL}/${id}`,{
        headers: {
  accept: 'application/json',
  Authorization: `Bearer ${token}`
        }
}
    );
    return fetchedNote.data;
}

export async function createNote({title, content, tag}: CreateParams): Promise <Note> {
    const createdNote = await axios.post<Note>(BASE_URL, 
        { title, content, tag },
        {
        headers: {
           accept: 'application/json',
           Authorization: `Bearer ${token}`
      }
     }
)
    return createdNote.data
}

export async function deleteNote(id: number): Promise <Note> {
    const deletedNote = await axios.delete<Note>(`${BASE_URL}/${id}`, {
        headers: {
           accept: 'application/json',
           Authorization: `Bearer ${token}`
      }}
    )
    return deletedNote.data
}