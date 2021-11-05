import { MongoClient, ObjectId } from "mongodb";
import readXlsxFile from "read-excel-file/node";

const uri = "";

const client = new MongoClient(uri);
await client.connect();
const mongoDb = client.db("power_bi");

const temp = async () => {
    const dataExcel = await readXlsxFile("./data.xlsx", {
        sheet: "Customer_data",
    });

    // dataExcel.forEach(async (item) => {
    //     await mongoDb.collection("reseller").insertOne({
    //         reseller_key: item[0],
    //         reseller_id: item[1],
    //         business_type: item[2],
    //         reseller: item[3],
    //         city: item[4],
    //         state_province: item[5],
    //         country_region: item[6],
    //         postal_code: item[7],
    //     });
    // });

    dataExcel.forEach(async (item) => {
        await mongoDb.collection("customer").insertOne({
            customer_key: item[0],
            customer_id: item[1],
            customer: item[2],
            city: item[3],
            state_province: item[4],
            country_region: item[5],
            postal_code: item[6],
        });
    });
};

temp();
