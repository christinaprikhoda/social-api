import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IContext, IResponse } from "../../../../helpers/types";
import { Http } from "../../../../helpers/api";

export const AddPost = () => {
  const { refetch } = useOutletContext<IContext>();
  const photo = useRef<null | HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [showPostMenu, setShowPostMenu] = useState<boolean>(false);

  const handleUpload = () => {
    const form = new FormData();
    const file = photo.current?.files?.[0];
    if (!file) return;

    form.append("photo", file);
    form.append("content", caption);

    Http.post<IResponse>("/posts", form).then(() => {
      refetch();
      setCaption("");
      setShowPostMenu(false);
    });
  };

  if (!showPostMenu) {
    return (
      <button
        onClick={() => setShowPostMenu(true)}
        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-700 hover:border-gray-600 transform hover:-translate-y-0.5"
      >
        Create Post
      </button>
    );
  }

  return (
    <div className="w-full bg-gray-900 px-8 py-6 border-b border-gray-800 shadow-2xl">
      <div className="max-w-xl mx-auto">
        {/* Upload Area */}
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-750 transition-all duration-200 border border-gray-700 hover:border-gray-600 shadow-lg">
          {/* Upload Icon */}
          <div
            onClick={() => photo.current?.click()}
            className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4 transform hover:scale-105 transition-transform duration-200 border-2 border-gray-600 hover:border-blue-500"
          >
            <svg
              className="w-8 h-8 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>

          {/* Upload Text */}
          <p className="text-gray-300 text-sm font-medium">Upload Photo</p>
          <p className="text-gray-500 text-xs mt-2">JPG, PNG up to 10MB</p>

          {/* Hidden File Input */}
          <input type="file" ref={photo} className="hidden" accept="image/*" />
        </div>

        {/* Caption Input */}
        <div className="mt-6">
          <textarea
            placeholder="Write a caption..."
            className="w-full bg-gray-800 text-gray-100 rounded-xl p-4 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none border border-gray-700 hover:border-gray-600 transition-colors duration-200"
            rows={3}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => setShowPostMenu(false)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 border border-gray-700 hover:border-gray-600 transform hover:-translate-y-0.5"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500 hover:border-blue-400 transform hover:-translate-y-0.5"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
