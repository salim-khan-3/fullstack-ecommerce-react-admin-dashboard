import { Eye, Pencil, Trash2, Link } from "lucide-react";

const CategoryTableRow = ({ row, idx, isSelected, onSelect, onEdit, onDelete }) => {
  const imageUrl = Array.isArray(row.images) ? row.images[0] : row.image || "";

  return (
    <tr
      className="border-t border-gray-100 transition-colors duration-100"
      style={{ backgroundColor: idx % 2 === 0 ? "#ffffff" : "#fbfcfe" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f7ff")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#ffffff" : "#fbfcfe")}
    >
      {/* Checkbox */}
      <td className="px-4 py-4 text-center">
        <input
          type="checkbox"
          className="w-4 h-4 cursor-pointer accent-blue-600"
          checked={isSelected}
          onChange={() => onSelect(row._id)}
        />
      </td>

      {/* UID */}
      <td className="px-3 py-4 text-sm text-gray-500 font-medium">
        #{row.serialNo}
      </td>

      {/* IMAGE thumbnail */}
      <td className="px-3 py-3">
        <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={row.name}
            className="w-10 h-10 object-contain"
            onError={(e) => (e.target.src = "https://img.icons8.com/color/96/t-shirt.png")}
          />
        </div>
      </td>

      {/* CATEGORY NAME */}
      <td className="px-3 py-4">
        <span className="text-sm font-semibold text-gray-700 truncate block">
          {row.name}
        </span>
      </td>

      {/* IMAGE URL */}
      <td className="px-3 py-4">
        {imageUrl ? (
          <div className="flex items-center gap-1.5">
            <Link size={12} className="text-blue-400 flex-shrink-0" />
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:text-blue-700 hover:underline font-mono truncate block max-w-[200px] transition-colors"
              title={imageUrl}
            >
              {imageUrl}
            </a>
          </div>
        ) : (
          <span className="text-xs text-gray-300 italic">No URL</span>
        )}
      </td>

      {/* COLOR */}
      <td className="px-3 py-4">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: row.color || "#ccc" }}
          />
          <span className="text-xs text-gray-600 font-mono uppercase">
            {row.color || "—"}
          </span>
        </div>
      </td>

      {/* ACTION */}
      <td className="px-3 py-4">
        <div className="flex items-center justify-center gap-1.5">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-pink-50 text-pink-500 hover:bg-pink-100 transition-colors">
            <Eye size={14} />
          </button>
          <button
            onClick={() => onEdit(row._id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(row._id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryTableRow;