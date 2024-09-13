export const dislikeAPost = async (id, userId) => {
  try {
    console.log(userId);
    const res = await fetch(`http://localhost:4000/api/posts/dislike/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) {
      console.log("Failed to get user");
    }

    const data = await res.json();
    dispa;
  } catch (error) {
    console.log(error);
  }
};
