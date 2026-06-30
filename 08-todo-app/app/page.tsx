"use client";

import { useState, useEffect } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type FilterType = "all" | "active" | "completed";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("premium-todo-data");
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error("Parse error", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("premium-todo-data", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([{ ...newTodo }, ...todos]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-zinc-900 via-[#09090b] to-black font-sans relative overflow-hidden flex flex-col items-center py-16 px-4 selection:bg-cyan-500/30">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative w-full max-w-2xl z-10 flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col gap-2 items-center text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 tracking-tighter">
            Tasks
          </h1>
          <p className="text-zinc-500 font-medium tracking-wide">
            Organize your life, effortlessly.
          </p>
        </header>

        {/* Input Area */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
          <div className="relative flex items-center bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-2 px-6 shadow-2xl">
            <span className="text-zinc-500 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleAddTodo}
              placeholder="What needs to be done?"
              className="w-full bg-transparent border-none outline-none text-zinc-200 placeholder-zinc-600 text-lg py-4"
            />
          </div>
        </div>

        {/* Toolbar (Filters & Actions) */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-2 gap-4 shadow-xl">
          <div className="flex gap-1 p-1 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
            {(["all", "active", "completed"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-300 ${
                  filter === f
                    ? "bg-zinc-800 text-cyan-400 shadow-md"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 px-4">
            <span className="text-sm font-medium text-zinc-500">
              <strong className="text-cyan-400">{activeCount}</strong> left
            </span>
            <div className="w-px h-4 bg-zinc-800"></div>
            <button
              onClick={clearCompleted}
              className="text-sm font-medium text-zinc-500 hover:text-rose-400 transition-colors"
            >
              Clear Done
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl overflow-hidden shadow-2xl">
          <ul className="max-h-[55vh] overflow-y-auto">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                onClick={() => toggleTodo(todo.id)}
                className="group flex items-center justify-between p-5 md:p-6 border-b border-zinc-800/30 last:border-none hover:bg-zinc-800/20 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-5 flex-1">
                  {/* Custom Modern Checkbox */}
                  <div
                    className={`relative w-6 h-6 shrink-0 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      todo.completed
                        ? "bg-cyan-500 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        : "border-zinc-600 group-hover:border-cyan-500/50 bg-zinc-900/50"
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 text-black transition-transform duration-300 ${
                        todo.completed
                          ? "scale-100 opacity-100"
                          : "scale-50 opacity-0"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>

                  {/* Task Text */}
                  <span
                    className={`text-lg transition-all duration-300 select-none ${
                      todo.completed
                        ? "text-zinc-600 line-through decoration-zinc-700"
                        : "text-zinc-200 group-hover:text-white"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                  title="Delete task"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </li>
            ))}

            {/* Empty State */}
            {filteredTodos.length === 0 && (
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <p className="text-zinc-400 text-lg font-medium">
                  {filter === "all"
                    ? "You have no tasks!"
                    : "No tasks found here."}
                </p>
                <p className="text-zinc-600 text-sm mt-1">
                  {filter === "all"
                    ? "Add one above to get started."
                    : "Try changing the filter."}
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
