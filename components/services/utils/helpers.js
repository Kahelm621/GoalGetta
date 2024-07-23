// utils/helpers.js
export const formatDate = (date) => {
  // Function to format date
  return new Date(date).toLocaleDateString();
};

export const calculatePriorityColor = (priority) => {
  // Function to return color based on priority
  switch (priority) {
    case "High":
      return "red";
    case "Medium":
      return "orange";
    case "Low":
      return "green";
    default:
      return "gray";
  }
};
