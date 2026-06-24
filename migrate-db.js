const { MongoClient } = require("mongodb");

const localUri = "mongodb://localhost:27017/";
const atlasUri = "mongodb+srv://fatihulqolbi01_db_user:BYQDoCKgK8HpFTTE@portofoliowebsite.qmz0k32.mongodb.net/";

const localDbName = "fatihulqolbi";
const atlasDbName = "portfolio_db";

async function migrate() {
  console.log("Connecting to Local MongoDB...");
  const localClient = new MongoClient(localUri);
  await localClient.connect();
  const localDb = localClient.db(localDbName);

  console.log("Connecting to MongoDB Atlas...");
  const atlasClient = new MongoClient(atlasUri);
  await atlasClient.connect();
  const atlasDb = atlasClient.db(atlasDbName);

  // Get all collections from local DB
  const collections = await localDb.listCollections().toArray();
  
  if (collections.length === 0) {
    console.log("No collections found in local database.");
  }

  for (const collInfo of collections) {
    const collName = collInfo.name;
    console.log(`Migrating collection: ${collName}...`);
    
    const localCollection = localDb.collection(collName);
    const atlasCollection = atlasDb.collection(collName);
    
    // Fetch all documents
    const docs = await localCollection.find({}).toArray();
    
    if (docs.length > 0) {
      // Clear existing docs in Atlas for a clean slate
      await atlasCollection.deleteMany({});
      
      // Insert into Atlas
      await atlasCollection.insertMany(docs);
      console.log(`Successfully migrated ${docs.length} documents for ${collName}.`);
    } else {
      console.log(`Collection ${collName} is empty, skipping.`);
    }
  }

  console.log("Migration complete!");
  
  await localClient.close();
  await atlasClient.close();
}

migrate().catch(console.error);
