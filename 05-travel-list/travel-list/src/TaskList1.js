import { useState } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [taskList, setTaskList] = useState([]);

  const handleSubmit = function (event) {
    event.preventDefault();
    const newTask = { title: title, description: description, status: status };

    setTaskList([...taskList, newTask]);
    setTitle("");
    setDescription("");
    setStatus("pending");
    console.log("taskList: ", taskList);
  };

  return (
    <body>
      <main className="main">
        <form className="form">
          <h2>Add a new task</h2>
          <div className="formBody">
            <div className="formItem">
              <label>Title</label>
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="formItem">
              <label>Description</label>
              <input
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="formItem">
              <label>Status</label>
              <select name="status" onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="complete">Complete</option>
              </select>
            </div>
            <div className="formItem">
              <button className="submitButton" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>

        <div className="dashboard">
          <h2>Dashboard</h2>
          <ul className="taskList">
            {taskList.map((task) => {
              return (
                <li className="task">
                  <p className="title">{task.title}</p>
                  <p className="description">{task.description}</p>
                  <p>
                    <span className={`status ${task.status}`}>
                      {task.status}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </body>
  );
}
