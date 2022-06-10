const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-store");

const getMiniFiedRecord = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};
const getMiniFiedRecourd = (records) => {
  return records.map((records) => getMiniFiedRecord(records));
};

const filterCoffeeStoreRecord = async (id) => {
  const findCoffeeStoreRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMiniFiedRecourd(findCoffeeStoreRecords);
};

export { table, getMiniFiedRecourd, filterCoffeeStoreRecord };
