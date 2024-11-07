import axios from "axios";

// get product api
export const GetProducts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/show`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products from API:", error); // Log any errors
    throw error; // Re-throw the error to be handled in the calling function
  }
};
