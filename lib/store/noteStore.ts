import { persist } from "zustand/middleware"
import { CreateParams } from "../api"
import { create } from 'zustand'

type NoteDraftStore = {
    draft: CreateParams,
    setDraft: (newNoteDraft: CreateParams) => void,
    clearDraft: () => void
}

export const useNoteDraft = create<NoteDraftStore>()(
    persist((set) => {
        return {
            draft: {
               title: '',
               content: '',
               tag: 'Todo',
            },
            setDraft: (newNoteDraft: CreateParams) => {
                return set({
                    draft: newNoteDraft
                })
            },
            clearDraft: () => {
                set({
               draft: {
                  title: '',
                  content: '',
                  tag: 'Todo',
               },
                })
            }

        }
    }, {
        name: 'draft',
        partialize: (store) => {
            return {draft: store.draft}
        }
    })
)