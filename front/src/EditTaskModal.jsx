import React, { useState } from "react";

function EditTaskModal({ isOpen, onClose, task, onEdit }) {
  const [editedTask, setEditedTask] = useState(task ? task.title : "");

  const handleEdit = () => {
    onEdit(editedTask);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
          <div className="bg-white p-4 rounded-lg z-10">
            <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
            <input
              type="text"
              className="border rounded p-2 w-full mb-4"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleEdit}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditTaskModal;
