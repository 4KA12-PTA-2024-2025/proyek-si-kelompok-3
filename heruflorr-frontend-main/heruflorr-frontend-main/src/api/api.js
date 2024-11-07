/* eslint-disable no-unused-vars */
import axios from "axios";

// get product api
export const GetProducts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/show`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products from API:", error);
    throw error;
  }
};

// get product by ID
export const GetProductId = async (getId) => {
  try {
    const productId = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/show/${getId}`
    );

    return productId.data;
  } catch (error) {
    console.error("Error fetching product by ID from API:", error); // Log any errors
    throw error; // Re-throw the error to be handled in the calling function
  }
};

export const fetchImages = async (fileName) => {
  try {
    const response = await axios.get(
      `https://heruflower-ec2360bb7ee1.herokuapp.com/api/images/temp/${fileName}`,
      {
        responseType: "arraybuffer",
      }
    );
    const base64String = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );

    return base64String; // Return base64 string of the image
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error; // Rethrow the error to be caught in the component
  }
};

export const fetchAlamat = async (endpoint) => {
  try {
    const response = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/${endpoint}.json`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return [];
  }
};
