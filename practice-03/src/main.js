import { demoTasks, variantTasks, variantNumber } from "./data.js";
import { setTaskCompleted, removeTask, findTaskById } from "./task-service.js";
import { getVisibleTasks } from "./task-selectors.js";
import { renderTaskList, renderSummary, renderEmptyState } from "./task-view.js";

// Состояние приложения
const urlParams = new URLSearchParams(window.location.search);
const dataset = urlParams.get('dataset');
const initialTasks = (dataset === 'variant' && variantTasks.length > 0) ? variantTasks : demoTasks;

let currentTasks = initialTasks.map(t => ({ ...t }));
let currentFilter = "all";

// DOM-элементы
const listElement = document.getElementById("task-list");
const summaryElement = document.getElementById("task-summary");
const messageElement = document.getElementById("empty-message");
const operationMessage = document.getElementById("operation-message");
const filterContainer = document.getElementById("task-filters");

// Функция обновления интерфейса
function renderApp() {
  const visibleTasks = getVisibleTasks(currentTasks, currentFilter);
  
  renderTaskList(listElement, visibleTasks);
  renderSummary(summaryElement, currentTasks, visibleTasks.length);
  renderEmptyState(messageElement, currentTasks.length, visibleTasks.length);

  // Обновляем активный фильтр
  const buttons = filterContainer.querySelectorAll("button[data-filter]");
  buttons.forEach(btn => {
    const isActive = btn.dataset.filter === currentFilter;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function restoreTaskFocus(id, action) {
  // Пытаемся найти карточку задачи
  const card = listElement.querySelector(`li[data-task-id="${id}"]`);
  
  if (card) {
    // Если карточка осталась на странице, возвращаем фокус на кнопку
    const btn = card.querySelector(`button[data-action="${action}"]`);
    if (btn) {
      btn.focus();
      return;
    }
  }
  
  // Если карточки нет (задача исчезла из фильтра), фокусируемся на активном фильтре
  const activeFilterBtn = filterContainer.querySelector('button.is-active');
  if (activeFilterBtn) {
    activeFilterBtn.focus();
  }
}

// Обработчик кликов по списку задач
function handleTaskListClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const button = target.closest("button[data-action]");
  if (!button || !listElement.contains(button)) return;

  const action = button.dataset.action;
  if (action !== "toggle" && action !== "delete") return;

  const card = button.closest("li[data-task-id]");
  if (!card) return;

  const idStr = card.dataset.taskId;
  const id = Number(idStr);

  if (!Number.isSafeInteger(id) || id <= 0) {
    operationMessage.textContent = "Некорректный ID задачи";
    return;
  }

  let result;
  if (action === "toggle") {
    const task = findTaskById(currentTasks, id);
    if (!task) {
      operationMessage.textContent = "Задача не найдена";
      return;
    }
    result = setTaskCompleted(currentTasks, id, !task.completed);
  } else if (action === "delete") {
    result = removeTask(currentTasks, id);
  }

  if (result && result.ok) {
    currentTasks = result.tasks;
    operationMessage.textContent = "";
    renderApp();
    restoreTaskFocus(id, action);
  } else if (result) {
    operationMessage.textContent = result.error;
  }
}

// Обработчик кликов по фильтрам
function handleFilterClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const button = target.closest("button[data-filter]");
  if (!button || !filterContainer.contains(button)) return;

  const newFilter = button.dataset.filter;
  if (newFilter === "all" || newFilter === "pending" || newFilter === "completed") {
    currentFilter = newFilter;
    operationMessage.textContent = "";
    renderApp();
  }
}

// Инициализация
function init() {
  // Установка обработчиков
  listElement.addEventListener("click", handleTaskListClick);
  filterContainer.addEventListener("click", handleFilterClick);

  // Первая отрисовка
  renderApp();
}

// Запуск приложения
init();