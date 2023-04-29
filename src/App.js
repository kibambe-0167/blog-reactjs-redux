import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux/";
import { addTask, selectTasks } from "./redux_/slices/tasks";

function App() {
  const [formData, setFormData] = useState({});
  // redux
  const dispatch = useDispatch();
  const selectTask = useSelector(selectTasks);

  function handleSubmit(event) {
    event.preventDefault();
    if (formData && formData.name && formData.name.length > 0) {
      // add task to redux slice.
      // prevent adding task with same name.
      if (
        selectTask.filter((task) => task?.name === formData?.name).length > 0
      ) {
        dispatch(
          addTask({
            name: formData?.name,
          })
        );
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className=" text-5xl text-slate-300 ">ReactJS Redux</h1>
      </header>

      <div className=" w-full flex flex-row justify-between px-5 py-5 ">
        <form
          onSubmit={(event) => handleSubmit(event)}
          className=" bg-red-700 w-4/12 px-1 "
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
        <div className=" bg-green-700 w-4/12 mx-3 ">
          {selectTask &&
            selectTask.length > 0 &&
            selectTask.map((task, index) => (
              <div key={index}>{task?.name}</div>
            ))}
        </div>
        {/*  */}
        <div className=" bg-blue-700 w-4/12 ">edit</div>
      </div>
    </div>
  );
}

export default App;
