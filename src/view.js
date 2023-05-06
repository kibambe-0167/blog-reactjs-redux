import { useSelector } from "react-redux"; // import useSelector
// import the provided function from tasksSlice to access our states.
import { selectTasks } from "./redux_/slices/tasks";
import { Link } from "react-router-dom";

export default function ViewComponent() {
  // pass function selectTasks that represent the state of taskSlice.
  // useSelector will render the components when
  // selectTasks's state changes, in redux store.
  const selectTask = useSelector(selectTasks);

  return (
    <div className="view">
      <div className="text-left px-5 py-4 ">
        <button className="bg-green-400 px-2 py-1 rounded-sm ">
          <Link to={"/"}>Go Back</Link>
        </button>
      </div>
      {/* displaying all task object in our redux 
      store using map function of arrays */}
      <div className=" w-4/12 mx-auto">
        {selectTask &&
          selectTask.length > 0 &&
          selectTask.map((task, index) => (
            <div
              className=" my-2 bg-slate-400  flex justify-between px-2 py-2 text-center "
              key={index}
            >
              <div
                onClick={() => alert("I am just a boring task. And I knew you would click me :) ")}
                className=" cursor-pointer underline "
              >
                {task?.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
