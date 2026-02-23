type CardTodoProps = {
  title: string;
  problem_desc: string | null;
  status: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function CardTodo({ title, problem_desc, status, onEdit, onDelete }: CardTodoProps) {
  const statusConfig: Record<string, { color: string; dot: string; label: string }> = {
    created: { color: 'text-blue-600', dot: 'bg-blue-500', label: 'Created' },
    completed: { color: 'text-green-600', dot: 'bg-green-500', label: 'Completed' },
    on_going: { color: 'text-yellow-600', dot: 'bg-yellow-500', label: 'On Going' },
    problem: { color: 'text-red-600', dot: 'bg-red-500', label: 'Problem' },
  };

  const config = statusConfig[status] || { color: 'text-gray-600', dot: 'bg-gray-500', label: 'Unknown' };

  return (
    <div className="rounded-lg border border-gray-200 p-4 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <h3 className={`font-medium text-gray-800 truncate ${status === 'completed' ? 'line-through text-gray-400' : ''}`}>
          {title}
        </h3>
        <div className="flex items-center gap-1.5 shrink-0 ml-3">
          <span className={`w-2 h-2 rounded-full ${config.dot}`} />
          <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
        </div>
      </div>
      {problem_desc && (
        <p className="text-xs text-red-500 mt-2">⚠️ {problem_desc}</p>
      )}
      {(onEdit || onDelete) && (
        <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Hapus
            </button>
          )}
        </div>
      )}
    </div>
  );
}
