const API_URL = "http://localhost:5000/api";

export const getTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const createTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
