Task Manager App
This is a task manager application built with Next.js and Tailwind CSS. It allows users to manage tasks across different stages using a Kanban board-like interface. Tasks can be added, edited, deleted, and moved between stages using drag-and-drop functionality.


Features
Drag-and-Drop: Easily move tasks between ToDo, In Progress, and Completed stages.
Task Management: Add, edit, and delete tasks with descriptions and due dates.
Local Storage: Tasks persist locally, ensuring data is retained across sessions.
Responsive Design: Responsive layout built with Tailwind CSS for seamless desktop and mobile use.
Technologies Used
Next.js: React framework for server-rendered applications.
Tailwind CSS: Utility-first CSS framework for styling.
React DnD: Drag-and-drop for React applications.
Getting Started
Prerequisites
Node.js installed on your local environment
npm or yarn package manager
Installation
Clone the repository:

bash
Copy code
git clone <repository-url>
Navigate into the project directory:

bash
Copy code
cd task-manager-app
Install dependencies:

bash
Copy code
npm install
# or
yarn install
Running the Application
Start the development server:

bash
Copy code
npm run dev
# or
yarn dev
Open your browser and visit http://localhost:3000

Build and Deploy
To build the production application:

bash
Copy code
npm run build
# or
yarn build
To start the production server:

bash
Copy code
npm start
# or
yarn start
Usage
Adding a Task: Enter a task title, description, due date, and select a status (ToDo, In Progress, Completed). Click "Add Task" to add it to the board.
Editing a Task: Click "Edit" on a task card, make changes, and click "Edit Task" to save changes.
Deleting a Task: Click "Delete" on a task card to remove it from the board.
Moving a Task: Drag a task card to a different status column to change its status.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
This project was created as part of learning Next.js and Tailwind CSS.
Special thanks to the creators of React DnD for the drag-and-drop functionality.
