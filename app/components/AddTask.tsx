"use client";

import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import { FormEventHandler, useRef, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  // Cara supaya bisa focus saat modal popup
  const inputRef = useRef<HTMLInputElement>(null);
  const handleModalOpen = () => {
    setModalOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  // end handlefocus

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // tolak jika input kosong
    if (newTaskValue.trim() === "") {
      return;
    }

    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button onClick={handleModalOpen} className="btn btn-primary w-full">
        Tambah Tugas
        <FaPlus />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Tambah Tugas Baru</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="e.g. Belajar English"
              className="input input-bordered w-full"
              // handle focus
              ref={inputRef}
            />
            <button type="submit" className="btn btn-neutral">
              Tambah
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
