import { USER_URL, API_URL, getUserId } from '../../utils/api';

export async function verifyUserId(userId: string){
    const res =await fetch(`${USER_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
    });
    if (!res.ok) throw new Error('Failed to verify user ID');
    return res.json();
}


export async function fetchTodos(search = '') {
  const userId = getUserId();
  const res = await fetch(`${API_URL}?search=${encodeURIComponent(search)}`, {
    headers: { 'x-user-id': userId },
  });
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

export async function createTodo(title: string, problem_desc: string | null = null) {
    const userId = getUserId();
    const res = await fetch ( API_URL, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'x-user-id': userId
        },
        body: JSON.stringify({ title, problem_desc })
    });
    if (!res.ok) throw new Error('Failed to create todo');
    return res.json();
}

export async function updateTodo(id: number, data: any) {
    const userId = getUserId();
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}

export async function fetchTodoById(id: number) {
  const userId = getUserId();
  const res = await fetch(`${API_URL}/${id}`, {
    headers: { 'x-user-id': userId },
  });
  if (!res.ok) throw new Error('Failed to fetch todo');
  return res.json();
}

export async function deleteTodo(id: number) {
  const userId = getUserId();
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'x-user-id': userId },
  });
  if (!res.ok) throw new Error('Failed to delete todo');
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}