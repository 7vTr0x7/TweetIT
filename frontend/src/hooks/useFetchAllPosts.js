import { useEffect, useState } from "react";

export const useFetchAllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/posts");
      if (!res.ok) {
        console.log("Failed to fetch posts");
      }

      const data = await res.json();
      setAllPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return allPosts;
};
