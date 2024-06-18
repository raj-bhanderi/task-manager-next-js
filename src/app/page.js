"use client"
import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from 'react-modal';

const ItemType = 'TASK';

const Box = ({ status, tasks, onDrop, onEdit, onDelete }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => onDrop(item, status),
  });

  let bgColor;
  switch (status) {
    case 'ToDo':
      bgColor = 'bg-blue-100';
      break;
    case 'In Progress':
      bgColor = 'bg-yellow-100';
      break;
    case 'Completed':
      bgColor = 'bg-green-100';
      break;
    default:
      bgColor = 'bg-gray-100';
  }

  return (
    <div ref={drop} className={`w-full p-4 border rounded-lg shadow-md ${bgColor}`}>
      <h2 className="text-lg font-bold mb-4">{status}</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

const Task = ({ task, onEdit, onDelete }) => {
  const [, drag] = useDrag({
    type: ItemType,
    item: { id: task.id },
  });

  return (
    <div ref={drag} className="p-2 my-2 bg-white border rounded shadow-sm flex justify-between items-center">
      <div>
        <span className="block font-bold">{task.text}</span>
        <span className="block text-sm text-gray-600">{task.description}</span>
        <span className="block text-sm text-gray-600">{task.dueDate}</span>
      </div>
      <div>
        <button onClick={() => onEdit(task)} className="text-blue-500 mx-2">Edit</button>
        <button onClick={() => onDelete(task.id)} className="text-red-500">Delete</button>
      </div>
    </div>
  );
};

// Modal.setAppElement('#__next');

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [status, setStatus] = useState('ToDo');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const openModal = () => {
    setIsEditing(false);
    setNewTask('');
    setNewDescription('');
    setNewDueDate('');
    setStatus('ToDo'); // Reset status to default value
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentTask(null);
  };

  const addTask = () => {
    if (isEditing) {
      setTasks(tasks.map(task => task.id === currentTask.id ? { ...task, text: newTask, description: newDescription, dueDate: newDueDate, status } : task));
      setIsEditing(false);
      setCurrentTask(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: newTask, description: newDescription, dueDate: newDueDate, status }]);
    }
    setNewTask('');
    setNewDescription('');
    setNewDueDate('');
    setModalIsOpen(false);
  };

  const editTask = (task) => {
    setNewTask(task.text);
    setNewDescription(task.description);
    setNewDueDate(task.dueDate);
    setStatus(task.status);
    setIsEditing(true);
    setCurrentTask(task);
    setModalIsOpen(true);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const moveTask = (item, newStatus) => {
    setTasks(tasks.map(task => (task.id === item.id ? { ...task, status: newStatus } : task)));
  };

  const getTasksByStatus = (status) => tasks.filter((task) => task.status === status);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Task Management</h1>
        <div className="flex mb-4">
          <button className="bg-blue-500 text-white p-2" onClick={openModal}>
            Add Task
          </button>
        </div>
        <div className="flex space-x-4">
          <Box
            status="ToDo"
            tasks={getTasksByStatus('ToDo')}
            onDrop={moveTask}
            onEdit={editTask}
            onDelete={deleteTask}
          />
          <Box
            status="In Progress"
            tasks={getTasksByStatus('In Progress')}
            onDrop={moveTask}
            onEdit={editTask}
            onDelete={deleteTask}
          />
          <Box
            status="Completed"
            tasks={getTasksByStatus('Completed')}
            onDrop={moveTask}
            onEdit={editTask}
            onDelete={deleteTask}
          />
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="bg-white p-4 border rounded shadow-lg mx-auto mt-24 w-1/3"
        >
          <h2 className="text-lg font-bold mb-4">{isEditing ? 'Edit Task' : 'Add Task'}</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Task</label>
            <input
              className="border p-2 w-full"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="border p-2 w-full"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter description..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              className="border p-2"
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="border p-2 w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="ToDo">ToDo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button onClick={closeModal} className="bg-gray-200 text-gray-700 p-2 mr-2">Cancel</button>
            <button onClick={addTask} className="bg-blue-500 text-white p-2">{isEditing ? 'Edit Task' : 'Add Task'}</button>
          </div>
        </Modal>
      </div>
    </DndProvider>
  );
}
