import { MongoClient, ObjectId } from "mongodb";

const uri = `mongodb://username:password@127.0.0.1:27017/?authSource=admin&readPreference=primary&serverSelectionTimeoutMS=2000&appname=MongoDB%20Compass&directConnection=true&ssl=false`;

const client = new MongoClient(uri);
await client.connect();
const mongoDb = client.db("db");

const temp = async () => {
    const chatTag = await mongoDb.collection("test").updateOne(
        {},
        {
            $set: {
                [`data.three`]: 0,
            },
        }
    );
};

temp();
