const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config({ path: path.resolve(__dirname, 'config.env') });

async function main() {
    const Db = process.env.ATLAS_URI || "mongodb+srv://2201884_db_user:ciSMGiYTbhW13NkR@cluster0.wjuhsil.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(Db, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

    try {
        await client.connect()

    const collections = await client.db("Bill").collections()
    collections.forEach((collection) => console.log(collection.s.namespace.collection))
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    
}

main()