export default async function fetchData(requestUrl) {
  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      console.log(response);
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result; //
  } catch (error) {
    console.error("Fetch error: ", error);
    return { error: true, message: error.message };
  }
}
