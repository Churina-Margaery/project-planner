# Project Planner
![demo](./assets/demo.gif)


Мини-версия системы управления проектами.
Реализация тестового задания — SPA приложение для управления задачами и проектами, работающее с REST API из папки server.

### Запуск
1. Клонирование репозитория  
```git clone https://github.com/Churina-Margaery/project-planner```
2. Создать файл .env (пример .env.example)
3. ```docker compose build```
4. ```docker compose up```  

или

1. Установка зависимостей  
```npm install```  
(описание для бэкенда в папке server)

2. Запуск клиентской части  
- Создать ```.env``` файл с адресом сервера.
```VITE_SERVER=http://localhost:8080/api/v1```
- В папке client:  
```npm run dev```  
Приложение будет на http://localhost:5173 (необходим запущенный сервер).

### Технологии
- **React 18**
- **TypeScript**
- **Vite**  
Dev-сервер для удобной, интерактивной разработки.
- **Ant Design** — дизайн-система UI-компонентов  
Адаптивность и множество готовых компонентов позволяют быстро создать приятный интерфейс.
- **react-router-dom** — маршрутизация
- **styled-components** — стилизация компонентов
Позволяет стилизовать компоненты React-приложения прямо в файлах .tsx, что также упрощает работу с интрефейсом.
- **Axios** — работа с API  
Axios позволяет отправлять запросы к серверу и обрабатывать ответы. 
- **ESLint**  — код-стайл и автоформатирование

### Архитектура приложения

```src/
│
├── components/          # Отдельные UI-компоненты (Header, TaskForm, BoardColumn, TaskCard)
│
├── pages/               # Реализация страниц (IssuesPage, ProjectsPage, BoardPage)
│
├── services/
│   └── api/             # Работа с API (axios.ts, tasks.ts, boards.ts, users.ts, types.ts)
│
├── App.tsx              # Маршруты
└── main.tsx             # Точка входа
```  
### Маршруты и навигация
/boards — список всех досок

/board/:id — задачи конкретной доски, разбитые на статусы (To do, In Progress, Done)

/issues — все задачи всех проектов с фильтрами и поиском
