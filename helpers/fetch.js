export const getJsonFromFetch = async (url) => {
  const response = await fetch(url);
  return response.json();
}