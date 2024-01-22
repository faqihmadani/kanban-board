# Kanban Board

Kanban board app to manage your tasks.

![image](https://github.com/faqihmadani/kanban-board/assets/76164968/6ba8ae18-b37f-46ef-9596-387593e5bcf5)

## Tech Stack

- React JS
- Laravel
- Tailwind CSS

## Features

- SignUp
- Login
- Create Task
- Update Task
- Delete Task

## Installation

There are two folders provided for back-end and front-end website.

First, clone this repository 

```bash
  git clone https://github.com/faqihmadani/kanban-board.git my-project
  cd my-project
```

### Back End
1. Go to front-end folder

```bash
  cd /back-end
```

2. Install package using composser

```bash
  composser install
```

3. Create database for the website.

4. Copy .env.example to .env file and fill the database connection 

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

5. Run Migration

```bash
  php artisan migrate
```

7. Run server

```bash
  php artisan serve
```

### Front End
1. Go to front-end folder

```bash
  cd /front-end
```

2. Install package using npm

```bash
  npm install
```

3. Create .env file
Add the following environment variables to your .env file

```env
VITE_BASE_URL = = your_backend_base_url
```

5. Run development server
```bash
  npm run dev
```
