import { useState, useEffect } from "react";

import { Plus } from "lucide-react";

import { useNavigate } from "react-router-dom";

import imageCompression from "browser-image-compression";

const CourseForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    startDate: "",
    endDate: "",
    price: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setImagePreview(initialData.image || "");
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const compressed = await imageCompression(file, {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
    });
  
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setImagePreview(base64);
    };
    reader.readAsDataURL(compressed);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = formData;

    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col md:flex-row gap-4">
      {error && <p className="text-red-500 text-sm lg:text-xl">{error}</p>}
      <div className="w-full h-1/2  md:w-1/2">
  <label className="block text-sm lg:text-xl mb-2">Image Upload</label>
  <div className="relative w-full h-64 border rounded overflow-hidden group bg-gray-100 cursor-pointer">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
    />

    {/* Preview image or icon */}
    {imagePreview ? (
      <img
        src={imagePreview}
        alt="Preview"
        className="w-full h-full object-content group-hover:opacity-80 transition duration-200"
      />
    ) : (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <Plus size={32} />
        <span className="text-sm lg:text-xl mt-1">Click to upload</span>
      </div>
    )}

    {/* Hover overlay text */}
    {imagePreview && (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition">
        <span className="text-white font-medium">Change Image</span>
      </div>
    )}
  </div>
</div>

      <div>
      <div>
        <label className="block text-sm lg:text-xl mb-1">Title *</label>
        <input
          type="text"
          name="title"
          className="w-full border px-3 py-2 rounded"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm lg:text-xl mb-1">Description *</label>
        <textarea
          name="description"
          rows={4}
          className="w-full border px-3 py-2 rounded"
          value={formData.description}
          onChange={handleChange}
        />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm lg:text-xl mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="w-full border px-3 py-2 rounded"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm lg:text-xl mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            className="w-full border px-3 py-2 rounded"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm lg:text-xl mb-1">Price ($)</label>
        <input
          type="number"
          name="price"
          className="w-full border px-3 py-2 rounded"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Course
        </button>
        <button
    type="button"
    onClick={() => navigate("/courses")}
    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
  >
    Cancel
        </button>
        </div>
      </div>
    </form>
  );
};

export default CourseForm;
