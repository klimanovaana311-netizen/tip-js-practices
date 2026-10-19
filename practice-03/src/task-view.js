// Создание одной карточки задачи (li)
export function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task-card";
  if (task.completed) li.classList.add("is-completed");
  li.dataset.taskId = task.id;

  // Заголовок
  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.title;

  // Статус
  const status = document.createElement("span");
  status.className = "task-status";
  status.textContent = task.completed ? "Выполнена" : "В работе";

  // Приоритет
  const priority = document.createElement("span");
  priority.className = "task-priority";
  const priorityMap = { low: "Низкий", medium: "Средний", high: "Высокий" };
  priority.textContent = priorityMap[task.priority] || task.priority;

  // Контейнер для кнопок
  const actions = document.createElement("div");
  actions.className = "task-actions";

  // Кнопка статуса
  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.dataset.action = "toggle";
  toggleBtn.setAttribute("aria-pressed", task.completed ? "true" : "false");
  toggleBtn.className = "btn-toggle";
  const toggleLabel = document.createElement("span");
  toggleLabel.className = "action-label";
  toggleLabel.textContent = "Выполнена"; // Текст постоянный
  toggleBtn.append(toggleLabel);

  // Кнопка удаления
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.dataset.action = "delete";
  deleteBtn.className = "btn-delete";
  const deleteLabel = document.createElement("span");
  deleteLabel.className = "action-label";
  deleteLabel.textContent = "Удалить";
  deleteBtn.append(deleteLabel);

  actions.append(toggleBtn, deleteBtn);

  // Собираем карточку
  li.append(title, status, priority, actions);
  return li;
}

// Отрисовка списка задач
export function renderTaskList(listElement, tasks) {
  const elements = tasks.map(createTaskElement);
  listElement.replaceChildren(...elements);
}

// Отрисовка сводки
export function renderSummary(summaryElement, tasks, visibleCount) {
  // Динамический импорт для получения статистики (чтобы не дублировать логику)
  // В реальном проекте лучше передавать getTaskStats как аргумент,
  // но для простоты мы импортируем её внутри или считаем здесь.
  // Давайте считать здесь, чтобы не усложнять импорты.
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  summaryElement.querySelector('[data-stat="total"]').textContent = total;
  summaryElement.querySelector('[data-stat="completed"]').textContent = completed;
  summaryElement.querySelector('[data-stat="pending"]').textContent = pending;
  summaryElement.querySelector('[data-stat="progress"]').textContent = progress.toFixed(1) + "%";
  summaryElement.querySelector('[data-stat="visible"]').textContent = visibleCount;
}

// Отрисовка пустого состояния
export function renderEmptyState(messageElement, total, visibleCount) {
  if (total === 0 && visibleCount === 0) {
    messageElement.textContent = "Список задач пуст.";
    messageElement.hidden = false;
  } else if (total > 0 && visibleCount === 0) {
    messageElement.textContent = "Нет задач по выбранному фильтру.";
    messageElement.hidden = false;
  } else {
    messageElement.textContent = "";
    messageElement.hidden = true;
  }
}