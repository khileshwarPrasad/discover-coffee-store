import { filterCoffeeStoreRecord } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const records = await filterCoffeeStoreRecord(id);
      if (records.length !== 0) {
        res.json(records);
      }
    } else {
      res.json({ message: "id is not found" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: `${error} is not idds` });
  }
};
export default getCoffeeStoreById;
