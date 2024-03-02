interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        {/* if there is a button in form, it will close the modal */}
        <button
          onClick={() => setModalOpen(false)}
          className="btn-sm btn-circle absolute right-2 top-2 bg-zinc-500 text-white hover:bg-zinc-800">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
