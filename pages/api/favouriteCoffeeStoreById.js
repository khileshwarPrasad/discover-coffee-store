import { table, filterCoffeeStoreRecord } from "../../lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      if (id) {
        const records = await filterCoffeeStoreRecord(id);
        if (records.length !== 0) {
          const record = records[0];
          const calculatVoting = parseInt(record.voting) + 1;
          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: calculatVoting,
              },
            },
          ]);
          if (updateRecord) {
            res.json(records);
          }
        }
      } else {
        res.json({ message: "id is MISING" });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: `${error} is not idds` });
    }
  }
};
export default favouriteCoffeeStoreById;
