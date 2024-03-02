import { ITask } from "@/types/tasks";
import React from "react";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto rounded-t-xl">
      <table className="table w-full">
        {/* Head */}
        <thead>
          <tr className="bg-base-200 text-black uppercase">
            <th className="w-1/2">Tugas</th>
            <th className="w-1/2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Row 1 */}
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
