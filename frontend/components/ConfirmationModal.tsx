"use client"

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
            Отмена
          </button>
          <button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

