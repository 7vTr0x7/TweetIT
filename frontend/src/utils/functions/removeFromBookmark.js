export const removeFromBookmark = async (id, userId) => {
  try {
    const res = await fetch(
      `http://localhost:4000/api/users/remove-bookmark/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!res.ok) {
      console.log("Failed to get user");
    }

    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
};
