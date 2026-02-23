import React from 'react';

const statusOptions = [
  { value: 'created', label: 'Created', color: 'bg-blue-500' },
  { value: 'completed', label: 'Completed', color: 'bg-green-500' },
  { value: 'on_going', label: 'On Going', color: 'bg-yellow-500' },
  { value: 'problem', label: 'Problem', color: 'bg-red-500' },
];

type EditTodoProps = {
  editTodo: any;
  editStatus: string;
  setEditStatus: (v: string) => void;
  editProblemDesc: string;
  setEditProblemDesc: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function EditTodoComponent({
  editTodo,
  editStatus,
  setEditStatus,
  editProblemDesc,
  setEditProblemDesc,
  onSubmit,
  onCancel,
}: EditTodoProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-2 text-center">Edit Todo</h1>
        <p className="text-center text-gray-500 mb-4">
          #{editTodo.id} — {editTodo.title}
        </p>

        <form onSubmit={onSubmit} className="space-y-6 mt-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <div className="grid grid-cols-2 gap-2">
              {statusOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setEditStatus(opt.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2
                    ${editStatus === opt.value
                      ? `${opt.color} text-white border-transparent shadow-md scale-105`
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          {editStatus === 'problem' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Problem Description
              </label>
              <textarea
                value={editProblemDesc}
                onChange={e => setEditProblemDesc(e.target.value)}
                placeholder="Jelaskan masalah yang terjadi..."
                rows={3}
                className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-red-50"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}