import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITasks {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);

    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITasks[] = [...tasks, { name, done: false }];

    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITasks[] = [...tasks];

    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITasks[] = [...tasks];

    newTasks.splice(i, 1);

    setTasks(newTasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  autoFocus
                  ref={taskInput}
                  required
                />
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
          </div>

          {tasks.map((t: ITasks, i: number) => (
            <div className="card card-value mt-2" key={i}>
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h2>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(i)}
                >
                  {!t.done ? "✓" : "X"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(i)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
