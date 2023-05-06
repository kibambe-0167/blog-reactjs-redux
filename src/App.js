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
  // useDispatch returns reference to dispatch function from redux store.
  const dispatch = useDispatch();
  const selectTask = useSelector(selectTasks);

  function edit(newTask, index) {
    // update state of new task to edit.
    // pass object with index. and the new task's name.
    // there are many ways to implement this code.
    setToEdit({ index: index, name: newTask?.name });
  }

  function handleEdit(event) {
    // update task name in redux store state.
    event.preventDefault(); // prevent form from re-loading page
    // make sure form was filled.
    if (toEdit && toEdit.index >= 0 && toEdit.name) {
      // make sure, task edit name is not duplicate.
      if (
        selectTask.filter((task) => task?.name === toEdit?.name).length === 0
      ) {
        // pass form data to editTaskName actions reducer.
        dispatch(editTaskName(toEdit));
        setToEdit(null);
      } else {
        alert("No Changes made");
      }
    }
  }

  function removeTask(index) {
    // pass task index to delete the task.
    dispatch(deleteTask(index));
  }

  function handleSubmit(event) {
    // prevent form from reloading the page, on submit.
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
        // erase format
        setFormData({ ...formData, name: "" });
      } else {
        alert("Task with same name already exists.");
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className=" text-5xl text-slate-300 py-5 ">React Redux</h1>
      </header>

      <div className=" text-left px-5 py-2  ">
        <button className="bg-green-400 px-2 py-1 rounded-sm ">
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
              value={formData?.name}
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
                <div
                  className=" underline cursor-pointer "
                  onClick={() => edit(task, index)}
                >
                  {task?.name}
                </div>
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
