import React, { useState } from "react";
import Modal from "react-modal";
import { Http } from "../../../../helpers/api";

Modal.setAppElement("#root");

interface IPost {
  id: string;
  picture: string;
  title: string;
  baseUrl: string;
  onDelete: (id: string) => void
}

export const Post = ({ id, picture, title, baseUrl, onDelete }: IPost) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDelete = () => {
    Http.delete("/posts/" + id)
    onDelete(id)
  }

  return (
    <div
      key={id}
      className="group relative aspect-square bg-gray-800 rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-800 hover:border-gray-700"
    >
      <button
        onClick={() => setModalIsOpen(true)}
        className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4 z-50"
        overlayClassName="fixed inset-0 bg-black/75"
      >
        <div className="bg-gray-900 rounded-xl shadow-xl max-w-lg w-full mx-auto">
          <div className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Delete Post
              </h3>
              <p className="text-gray-300 text-center mb-6">
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
              <div className="flex space-x-4 w-full">
                <button
                  onClick={() => setModalIsOpen(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button  onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <img
        src={baseUrl + picture}
        alt={title}
        className="w-full h-full object-cover"
      />
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
          <p className="text-white text-sm font-medium">{title}</p>
        </div>
      )}
    </div>
  );
};
