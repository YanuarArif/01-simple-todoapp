"use client";
import { ITask } from "@/types/tasks";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { deleteTodo, editTodo } from "@/api";
import { useRouter } from "next/navigation";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();

  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

  //* Handle Edit
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  //* Handle Delete
  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        {/*  */}
        {/* Tombol Edit */}
        <FaEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={20}
        />
        {/* <EditTodo todo={todo} /> */}
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit Tugas</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder=""
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn btn-neutral">
                Edit
              </button>
            </div>
          </form>
        </Modal>
        {/*  */}
        {/* Tombol Hapus */}
        <FaTrash
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500"
          size={20}
        />
        {/* <DeleteTodo todo={todo} /> */}
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg text-center">Yakin hapus ini?</h3>
          <div className="modal-action justify-center">
            <button
              type="submit"
              className="btn btn-neutral"
              onClick={() => handleDeleteTask(task.id)}>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
