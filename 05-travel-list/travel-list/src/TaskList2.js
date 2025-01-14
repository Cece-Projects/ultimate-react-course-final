import { useState } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [taskList, setTaskList] = useState([]);

  const handleSubmit = function (e) {
    e.preventDefault();
    const newTask = {
      title: title,
      description: description,
      status: status,
    };

    setTaskList([...taskList, newTask]);
    console.log("taskList: ", taskList);
    setTitle("");
    setDescription("");
    setStatus("pending");
  };

  return (
    <div className="main">
      <div className="section">
        <h2>Add a new task</h2>
        <form className="form">
          <div className="formItem">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="formItem">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="formItem">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in-progress">In progress</option>
              <option value="complete">Complete</option>
            </select>
          </div>
          <div className="formItem"></div>
          <button className="submitButton" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
      <div className="section">
        <div className="dashboard">
          <h2>Dashboard</h2>
          <ul>
            {taskList.map((task) => {
              return (
                <li className="task">
                  <p>{task.title}</p>
                  <p>{task.description}</p>
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
      </div>
    </div>
  );
}
