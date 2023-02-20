export const SelectStyle = {
  menuButton: ({ isDisabled }) =>
    `flex text-sm text-base-content border border-base-content rounded shadow-sm transition-all duration-300 focus:outline-none ${
      isDisabled
        ? "bg-gray-200"
        : "bg-base-100  focus:border-accent-focus focus:ring focus:ring-blue-500/20" // Removed hover:border-accent because of bug
    }`,
  menu: "absolute z-10 w-full bg-base-100 shadow-lg border border-accent rounded py-1 mt-1.5 text-sm text-base-content",
  searchBox:
    "w-full py-2 pl-8 text-sm text-base-content bg-base-100 border border-accent rounded focus:border-accent-focus focus:ring-0 focus:outline-none",
  listItem: ({ isSelected }) =>
    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
      isSelected
        ? `text-secondary-content bg-secondary`
        : `text-base-content hover:bg-base-300 `
    }`,
  tagItemText: "text-base-content truncate cursor-default select-none",
  tagItem: ({ isDisabled }) => {
    const baseClass = "bg-base-100 border rounded-sm flex space-x-1";
    const disabledClass = isDisabled ? "border-gray-500 px-1" : "pl-1";
    return `${baseClass} ${disabledClass}`;
  },
  tagItemIconContainer:
    "flex items-center px-1 cursor-pointer rounded-r-sm  hover:text-error",
};

export const SelectStyleDarkResponsive = (dark) => {
  return {
    menuButton: ({ isDisabled }) =>
      `flex text-sm text-base-content border border-${
        dark ? "neutral-focus" : "base-300"
      } rounded shadow-sm transition-all duration-300 focus:outline-none ${
        isDisabled
          ? "bg-gray-200"
          : "bg-base-100  focus:border-accent-focus focus:ring focus:ring-blue-500/20" // Removed hover:border-accent because of bug
      }`,
    menu: "absolute z-10 w-full bg-base-100 shadow-lg border border-accent rounded py-1 mt-1.5 text-sm text-base-content",
    searchBox:
      "w-full py-2 pl-8 text-sm text-base-content bg-base-100 border border-accent rounded focus:border-accent-focus focus:ring-0 focus:outline-none",
    listItem: ({ isSelected }) =>
      `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
        isSelected
          ? `text-secondary-content bg-secondary`
          : `text-base-content hover:bg-base-300 `
      }`,
    tagItemText: "text-base-content truncate cursor-default select-none",
    tagItem: ({ isDisabled }) => {
      const baseClass = "bg-base-100 border rounded-sm flex space-x-1";
      const disabledClass = isDisabled ? "border-gray-500 px-1" : "pl-1";
      return `${baseClass} ${disabledClass}`;
    },
    tagItemIconContainer:
      "flex items-center px-1 cursor-pointer rounded-r-sm  hover:text-error",
  };
};

export default SelectStyle;
