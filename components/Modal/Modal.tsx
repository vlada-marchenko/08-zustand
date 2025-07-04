'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import css from './Modal.module.css'

export interface ModalProps {
  children: React.ReactNode
  onClose: () => void       
}

export default function Modal({ children, onClose }: ModalProps) {

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('keydown', esc)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  )
}