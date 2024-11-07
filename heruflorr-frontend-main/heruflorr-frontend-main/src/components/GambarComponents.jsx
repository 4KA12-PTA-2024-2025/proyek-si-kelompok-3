import { useState, useEffect } from "react";
import { fetchImages } from "../api/api";

// eslint-disable-next-line react/prop-types
const ImageComponent = ({ fileName }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const result = await fetchImages(fileName);

        const base64Image = `data:image/png;base64,${result}`;
        setImage(base64Image);
      } catch (err) {
        console.error("Error fetching image: ", err);
      }
    };
    fetchImage();
  }, [fileName]);

  return <img src={image} alt="Fetched from API" className="w-full h-full" />;
};

export default ImageComponent;
