import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim().length > 0) {
      setTodos([...todos, { id: uuidv4(), todo: todo.trim(), isCompleted: false }]);
      setTodo('');
    }
  };

  const handleEdit = (e, id) => {
    const itemToEdit = todos.find((i) => i.id === id);
    setTodo(itemToEdit.todo);
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleDelete = (e, id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos(todos.filter((item) => item.id !== id));
    }
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white min-h-[80vh] md:w-1/2 shadow-lg">
        <h1 className="font-extrabold text-center text-4xl mb-8 tracking-wide">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Add a Todo</h2>
          <div className="flex items-center gap-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full px-5 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your task"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-5 py-2 rounded-lg font-semibold text-white disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>

        <div className="flex items-center mb-5">
          <input
            className="mr-2 accent-blue-500"
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />
          <label className="text-lg font-light">Show Finished</label>
        </div>

        <div className="h-[1px] bg-gray-600 opacity-50 mb-5"></div>

        <h2 className="text-2xl font-bold mb-4">Your Todos</h2>
        <div className="todos space-y-4">
          {todos.length === 0 ? (
            <p className="text-gray-400 text-center">No Todos to display</p>
          ) : (
            todos.map(
              (item) =>
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className={`todo flex justify-between items-center p-4 rounded-lg ${
                      item.isCompleted ? 'bg-green-900' : 'bg-gray-800'
                    } transition duration-300`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        name={item.id}
                        type="checkbox"
                        onChange={handleCheckbox}
                        checked={item.isCompleted}
                        className="w-5 h-5 accent-blue-500"
                      />
                      <span
                        className={`${
                          item.isCompleted ? 'line-through text-gray-500' : 'text-white'
                        }`}
                      >
                        {item.todo}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="text-yellow-400 hover:text-yellow-500 transition-all"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="text-red-500 hover:text-red-600 transition-all"
                      >
                        <AiFillDelete size={20} />
                      </button>
                    </div>
                  </div>
                )
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
