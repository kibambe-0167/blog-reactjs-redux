import { useSelector } from "react-redux";
import { selectTasks } from "./redux_/slices/tasks";
import { Link } from "react-router-dom";

export default function ViewComponent() {
  // read redux store values/
  const selectTask = useSelector(selectTasks);

  return (
    <div className="view">
      <div className="text-left px-5 py-2 ">
        <button className="bg-green-400 px-2 py-1 rounded-sm ">
          <Link to={"/"}>Go Back</Link>
        </button>
      </div>
      <div className=" w-4/12 mx-auto">
        {selectTask &&
          selectTask.length > 0 &&
          selectTask.map((task, index) => (
            <div
              className=" my-2 bg-slate-400  flex justify-between px-2 py-2 text-center "
              key={index}
            >
              <div>{task?.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
