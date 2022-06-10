import { createApi } from "unsplash-js";

const unplushApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
});

const getListOfCoffeeStorePhoto = async () => {
  const photo = await unplushApi.search.getPhotos({
    query: "pizza shop",
    perPage: 40,
  });
  const coffeePhoto = photo.response.results;
  return coffeePhoto.map((urls) => urls.urls["small"]);
};
export async function fetchCoffeeStores(
  latlog = "41.8781%2C-87.6298",
  limit = 6
) {
  const photo = await getListOfCoffeeStorePhoto();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?query=coffee%20shops&ll=${latlog}&radius=100000&${limit}`,
    options
  );
  const data = await response.json();
  return data.results.map((result, i) => {
    return {
      id: result.fsq_id,
      neighbourhood: result.location.neighborhood || "",
      address:
        result.location.formatted_address || result.location.locality || "",
      name: result.name,
      imgUrl: photo[i],
    };
  });
}
