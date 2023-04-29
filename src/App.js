import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux/";
import {
  addTask,
  deleteTask,
  editTaskName,
  selectTasks,
} from "./redux_/slices/tasks";
import { Link } from "react-router-dom";

function App() {
  const [formData, setFormData] = useState({});
  const [toEdit, setToEdit] = useState(null);
  // redux
  const dispatch = useDispatch();
  const selectTask = useSelector(selectTasks);

  function edit(task, index) {
    // update state of new task to edit. for form edit-input
    setToEdit({ index: index, name: task?.name });
  }

  function handleEdit(event) {
    // update task name in redux
    event.preventDefault();
    if (toEdit && toEdit.index >= 0 && toEdit.name) {
      // make sure, task edit name is not duplicate.
      if (
        selectTask.filter((task) => task?.name === toEdit?.name).length === 0
      ) {
        dispatch(editTaskName(toEdit));
      } else {
        alert("No Changes made");
      }
    }
  }

  function removeTask(index) {
    dispatch(deleteTask(index));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData && formData.name && formData.name.length > 0) {
      // add task to redux slice.
      // prevent adding task with same name.
      if (
        selectTask.filter((task) => task?.name === formData?.name).length === 0
      ) {
        dispatch(
          addTask({
            name: formData?.name,
          })
        );
      } else {
        alert("Task with same name already exists.");
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className=" text-5xl text-slate-300 ">ReactJS Redux</h1>
      </header>

      <div className=" text-left px-5 py-2  ">
        <button className="bg-green-400 px-2 py-1 rounded-sm " >
          <Link to={"/viewstoredata"}>View Redux Data In New Page</Link>
        </button>
      </div>

      <div className=" w-full flex flex-row justify-between px-5 py-5 ">
        <form
          onSubmit={(event) => handleSubmit(event)}
          className=" w-4/12 px-1 "
        >
          <div className=" my-3 w-full ">
            <input
              onChange={(event) =>
                setFormData({ ...formData, name: event.target.value })
              }
              className=" w-full rounded-sm px-2 py-2 color text-lg "
              placeholder="Tasks name"
            />
          </div>

          <div className=" my-3">
            <button className=" bg-green-900 w-full py-2 rounded-lg text-white ">
              Add Task
            </button>
          </div>
        </form>

        {/*  */}
        <div className=" w-4/12 mx-3 ">
          {selectTask &&
            selectTask.length > 0 &&
            selectTask.map((task, index) => (
              <div
                className=" my-2 bg-slate-300 flex justify-between px-2 py-2 text-center "
                key={index}
              >
                <div onClick={() => edit(task, index)}>{task?.name}</div>
                <button
                  className=" bg-red-800 text-white px-2 py-1 rounded-md "
                  onClick={() => removeTask(index)}
                >
                  delete task
                </button>
              </div>
            ))}
        </div>
        {/*  */}

        {/*  */}
        <div className=" w-4/12 ">
          {toEdit && (
            <form
              onSubmit={(event) => handleEdit(event)}
              className=" w-full px-1 "
            >
              <div className=" my-3 w-full ">
                <input
                  value={toEdit?.name}
                  onChange={(event) =>
                    setToEdit({ ...toEdit, name: event.target.value })
                  }
                  className=" w-full rounded-sm px-2 py-2 color text-lg "
                  placeholder="Tasks name"
                />
              </div>

              <div className=" my-3">
                <button className=" bg-green-900 w-full py-2 rounded-lg text-white ">
                  Edit Task
                </button>
              </div>
            </form>
          )}
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default App;
