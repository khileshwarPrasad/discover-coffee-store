import { fetchCoffeeStores } from "../../lib/coffeeStore";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200);
    res.json(response);
  } catch (error) {
    console.error("there is an err", error);
    res.status(500);
    res.json({ messase: "oh no somthing Went Wrong" });
  }
};

export default getCoffeeStoresByLocation;
