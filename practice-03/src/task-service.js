// Заготовка модуля. throw ниже отмечает отсутствие реализации,
// а не способ обработки некорректных данных в готовом решении.
// Для предусмотренных ошибок необходимо возвращать { ok: false, error: "..." }.
// console.log(), prompt(), document и чтение внешнего состояния здесь не нужны.

"use strict";

const ALLOWED_PRIORITIES = ["low", "medium", "high"];

function isValidId(id) {
  return Number.isSafeInteger(id) && id > 0;
}

function normalizeTitle(title) {
  if (typeof title !== "string") return { ok: false, error: "Название должно быть строкой" };
  const clean = title.trim();
  if (clean.length < 1 || clean.length > 100) {
    return { ok: false, error: "Название должно быть от 1 до 100 символов" };
  }
  return { ok: true, title: clean };
}

export function createTask(id, title, priority = "medium") {
  if (!isValidId(id)) return { ok: false, error: "id должен быть положительным целым" };
  const t = normalizeTitle(title);
  if (!t.ok) return t;
  if (priority === undefined) priority = "medium";
  if (!ALLOWED_PRIORITIES.includes(priority)) return { ok: false, error: "Некорректный приоритет" };
  
  return { ok: true, task: { id, title: t.title, completed: false, priority } };
}

export function findTaskById(tasks, id) {
  return tasks.find(task => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter(task => !task.completed);
}

export function getTaskTitles(tasks) {
  return tasks.map(task => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;
  return { total, completed, pending, progress };
}

export function addTask(tasks, id, title, priority = "medium") {
  if (!isValidId(id)) return { ok: false, error: "Некорректный id" };
  if (tasks.some(t => t.id === id)) return { ok: false, error: "id уже существует" };
  const res = createTask(id, title, priority);
  if (!res.ok) return res;
  return { ok: true, tasks: [...tasks, res.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!isValidId(id)) return { ok: false, error: "Некорректный id" };
  if (typeof completed !== "boolean") return { ok: false, error: "completed должен быть boolean" };
  if (!tasks.some(t => t.id === id)) return { ok: false, error: "Задача не найдена" };
  
  const newTasks = tasks.map(task => 
    task.id === id ? { ...task, completed } : task
  );
  return { ok: true, tasks: newTasks };
}

export function renameTask(tasks, id, title) {
  if (!isValidId(id)) return { ok: false, error: "Некорректный id" };
  if (!tasks.some(t => t.id === id)) return { ok: false, error: "Задача не найдена" };
  const t = normalizeTitle(title);
  if (!t.ok) return t;
  
  const newTasks = tasks.map(task => 
    task.id === id ? { ...task, title: t.title } : task
  );
  return { ok: true, tasks: newTasks };
}

export function removeTask(tasks, id) {
  if (!isValidId(id)) return { ok: false, error: "Некорректный id" };
  if (!tasks.some(t => t.id === id)) return { ok: false, error: "Задача не найдена" };
  
  return { ok: true, tasks: tasks.filter(task => task.id !== id) };
}