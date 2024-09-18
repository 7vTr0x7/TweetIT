export const readUser = async (id) => {
  try {
    const res = await fetch(
      `https://tweet-it-backend.vercel.app/api/users/user/id/${id}`
    );

    if (!res.ok) {
      console.log("Failed to get user");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
