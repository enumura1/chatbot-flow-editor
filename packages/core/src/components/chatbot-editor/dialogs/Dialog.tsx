import { useEffect, useRef } from 'react'

interface SimpleDialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}

// シンプルで実用的なDialog - 依存関係ゼロ
export default function SimpleDialog({ open, onClose, title, children, footer }: SimpleDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    
    // ESCキーで閉じる
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    // 背景スクロール防止 & フォーカス管理
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEsc)
    dialogRef.current?.focus()
    
    // クリーンアップ
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        ref={dialogRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="p-4 border-t bg-gray-50 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
