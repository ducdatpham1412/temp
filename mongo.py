from pymongo import MongoClient
from pymongo.database import Database

connection_string = 'mongodb://{}:{}@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000'.format(
    'username', 'pass')

__client = MongoClient(connection_string)

mongoDb: Database = __client.db

mongoDb.chatTag.update_many(
    {

    },
    {
        '$set': {
            'color': 1,
        }
    }
)
