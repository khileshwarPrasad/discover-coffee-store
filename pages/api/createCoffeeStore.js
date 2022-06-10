import {
  table,
  getMiniFiedRecourd,
  filterCoffeeStoreRecord,
} from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, nabourhood, address, imgUrl, voting } = req.body;
    try {
      if (id) {
        const records = await filterCoffeeStoreRecord(id);
        if (records.length !== 0) {
          res.json(records);
        } else {
          if (name) {
            const crateRecord = await table.create([
              {
                fields: {
                  id: `${id}`,
                  name,
                  address,
                  nabourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMiniFiedRecourd(crateRecord);
            res.json(records);
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: "name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "id is missing" });
      }
    } catch (error) {
      res.json({ message: "finding or   creating data " });
      res.status(500);
      console.error("finding or   creating data " + error);
    }
  }
};

export default createCoffeeStore;
