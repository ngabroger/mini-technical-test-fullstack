import React, { useEffect, useState } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo, fetchTodoById } from '../services/todoApi';
import CardTodo from '../components/cardTodo';
import LoadingCustom from '../components/loadingCustom';
import AlertMessageCustom from '../components/alertMessageCustom';
import ModalCustom from '../components/modalCustom';
import LoginFormComponent from '../components/loginFormComponent';
import EditTodoComponent from '../components/editTodoComponent';



export default function TodoListPage() {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));

  const [todos, setTodos] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type?: string }>({ message: '' });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [editTodo, setEditTodo] = useState<any>(null);
  const [editStatus, setEditStatus] = useState('created');
  const [editProblemDesc, setEditProblemDesc] = useState('');

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ message: '' }), 2500);
      return () => clearTimeout(timer);
    }
  }, [alert.message]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserId('');
    setTodos([]);
  };

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await fetchTodos(search);
      setTodos(data);
    } catch {
      setAlert({ message: 'Gagal load todos', type: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) loadTodos();
  }, [search, isLoggedIn]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createTodo(title, null);
      setTitle('');
      setAlert({ message: 'Todo berhasil ditambahkan!', type: 'success' });
      loadTodos();
    } catch {
      setAlert({ message: 'Gagal tambah todo', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (deleteId == null) return;
    try {
      await deleteTodo(deleteId);
      setAlert({ message: 'Todo berhasil dihapus!', type: 'success' });
      setDeleteId(null);
      loadTodos();
    } catch (e: any) {
      setAlert({ message: e instanceof Error ? e.message : 'Gagal hapus todo', type: 'error' });
    }
  };

  const openEdit = async (id: number) => {
    try {
      const data = await fetchTodoById(id);
      setEditTodo(data);
      setEditStatus(data.status);
      setEditProblemDesc(data.problem_desc || '');
    } catch {
      setAlert({ message: 'Gagal load todo', type: 'error' });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTodo) return;
    try {
      await updateTodo(editTodo.id, {
        status: editStatus,
        problem_desc: editStatus === 'problem' ? editProblemDesc : null,
      });
      setAlert({ message: 'Todo berhasil diupdate!', type: 'success' });
      setEditTodo(null);
      loadTodos();
    } catch {
      setAlert({ message: 'Gagal update todo', type: 'error' });
    }
  };

  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm">
        <AlertMessageCustom message={alert.message} type={alert.type as any} />
      </div>

      {!isLoggedIn && (
        <LoginFormComponent
          userId={userId}
          setUserId={setUserId}
          setIsLoggedIn={setIsLoggedIn}
          setAlert={setAlert}
        />
      )}

      {isLoggedIn && editTodo && (
        <EditTodoComponent
          editTodo={editTodo}
          editStatus={editStatus}
          setEditStatus={setEditStatus}
          editProblemDesc={editProblemDesc}
          setEditProblemDesc={setEditProblemDesc}
          onSubmit={handleUpdate}
          onCancel={() => setEditTodo(null)}
        />
      )}

      {isLoggedIn && !editTodo && (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">Todo List</h1>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-600 transition"
              >
                Keluar
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              Masuk dengan nama: <span className="font-semibold">{userId}</span>
            </p>

            <form onSubmit={handleCreate} className="flex gap-2 mb-4">
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Tambah todo..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
              >
                Tambah
              </button>
            </form>

            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Cari todo..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {loading ? (
              <LoadingCustom />
            ) : todos.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                <p className="text-lg">Tidak ada todo</p>
                <p className="text-sm">Tambahkan todo baru di atas</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todos.map(todo => (
                  <CardTodo
                    key={todo.id}
                    {...todo}
                    onEdit={() => openEdit(todo.id)}
                    onDelete={() => setDeleteId(todo.id)}
                  />
                ))}
              </div>
            )}

            <ModalCustom
              open={deleteId !== null}
              title="Konfirmasi Hapus"
              message="Apakah Anda yakin ingin menghapus todo ini?"
              onConfirm={handleDelete}
              onCancel={() => setDeleteId(null)}
              confirmText="Hapus"
              cancelText="Batal"
            />
          </div>
        </div>
      )}
    </>
  );
}