import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      // add new task to array. let prevent to add task with same name.
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      // return all tasks objects in array, except the ones without the same index as the provided index.
      state.tasks = state.tasks.filter(
        (task, index) => index !== action.payload
      );
    },
    editTaskName: (state, action) => {
      // find index in array where the provided index is the same.
      let taskIndex = state.findInde(
        (task) => task.id === action.payload.index
      );

      // if the index is not equal to -1, its found a task with right index.
      // change task name to the new name.
      if (taskIndex !== -1) {
        state.tasks[taskIndex].name = action.payload.newName;
      }
    },
  },
});

// export actions for each reducer function.
export const { addTask, deleteTask, editTaskName } = taskSlice.actions;

// provide way to access our task.
export const selectTasks = (state) => state.tasks.tasks;

export default taskSlice.reducer;
