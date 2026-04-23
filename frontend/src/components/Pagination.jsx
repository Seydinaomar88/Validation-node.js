import React from "react";

const Pagination = ({ currentPage, onPageChange, totalPages = 5 }) => {
  return (
    <nav
      className="mt-8 mb-6 flex items-center justify-center gap-1 text-black"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <i className="ri-arrow-left-s-line text-lg"></i>
        <span className="hover:text-white">Precedent</span>
      </button>

      <ul className="flex items-center gap-1">
        {[1, 2, 3].map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`flex h-10 w-10 items-center hover:text-white justify-center rounded-md border text-sm transition-all ${
                currentPage === page
                  ? "border-neutral-700 bg-white font-bold shadow-sm"
                  : "border-transparent hover:bg-blue-700"
              }`}
            >
              {page}
            </button>
          </li>
        ))}

        <li className="flex h-10 items-center px-2 text-neutral-500">
          <i className="ri-more-fill"></i>
        </li>
      </ul>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="hover:text-white">Suivant</span>
        <i className="ri-arrow-right-s-line text-lg"></i>
      </button>
    </nav>
  );
};

export default Pagination;
