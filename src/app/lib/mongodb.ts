import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;

let clientPromise: Promise<ReturnType<MongoClient["connect"]>>;

if (!uri) {
	// Defer error to runtime (when used) instead of throwing at import time
	clientPromise = Promise.reject(new Error("Missing MONGODB_URI environment variable"));

} else {
	// Set short timeouts so failures return quickly during development
	const client = new MongoClient(uri, {
		serverSelectionTimeoutMS: 5000,
		connectTimeoutMS: 10000,
	});
	clientPromise = client.connect();
}

export default clientPromise;