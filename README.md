# Тестовое Задание - Управление Семинарами
## Начало реализации 04.02.2025 в 16:00 
## Конец реализации 06.02.2025 в 04:00 
Добро пожаловать в наше приложение для управления семинарами, разработанное на **React** и **TypeScript**!

## Обзор

Этот проект был реализован согласно техническому заданию. Вот ключевые моменты:

- **Фронтенд**: 
  - Использование **React** с **TypeScript**.
  - **Zustand** выбран для управления состоянием.
  - **Axios** для взаимодействия с API базы данных.
  - **Formik** и **Yup** для валидации форм.
  - **Tailwind CSS** для стилизации.
  - **Vite** для стилизации.

## Функциональность

- Создание функций для удобного копирования информации.
- Полноценная реализация CRUD операций для семинаров.

## Структура Проекта

- Компоненты: Модульные UI элементы.
- Утилиты: Вспомогательные функции для улучшения UX.

## Рекомендации по Улучшению

- **Улучшение Ввода**: 
  - Оптимизация обработки ввода, добавление подтверждения отправки форм с клавиатуры.
  
- **Френдли Юзабилити**: 
  - Осуществить перемещение карточек при помощи Drag$Drop, добавление картинок (base64),скачивание картинок

- **Сохранение лучших переиспользуемых компанент**: 
  - Создание story book и сохранение туда уникального и переиспользуевомого кода 

  
- **Модульность Кода**:
  - **Разделение кода на компоненты** для улучшения структуры и поддерживаемости.

- **База Данных**:
  - **Добавление MongoDB** для хранения данных.

- **API и Сервер**:
  - **Интеграция с Nest.js** для обработки эндпоинтов и взаимодействия с базой данных.

- **Тестирование**:
  - **Внедрение Jest для тестирования** Zustand и Nest.js.

- **Оптимизация Производительности**:
  - **Lazy Loading** для компонентов при увеличении графика.
  - Использование **React.memo** для оптимизации рендеринга.

## Как Запустить

```sh
# Клонирование репозитория
git clone git@github.com:kotpavlik/SeminarsMenajement-.git

# Переход в директорию проекта
cd SeminarsMenajement-

# Установка зависимостей
yarn 

# Запуск сервера разработки
yarn dev

#Запуск сервера 
json-server --watch ./src/db/seminars.json --port 3001

# создать файл .env и добавить
REACT_DB_SEMINARS = http://localhost:3001

# просмотреть сайт можно на задеплоеной версии на Vercel предварительно запустив локально сервер на 3001 порте
[кликни чтобы перейти ](https://seminars-menajement-54jy.vercel.app/)