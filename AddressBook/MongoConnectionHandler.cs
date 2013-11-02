using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AddressBook
{
    public class MongoConnectionHandler<T>
    {
        public MongoCollection<T> MongoCollection { get; private set; }

        /* http://www.drdobbs.com/database/mongodb-with-c-deep-dive/240152181?pgno=2 */

        public MongoConnectionHandler()
        {
            const string connectionString = "mongodb://xxx:xxx@ds027758.mongolab.com:27758/addressbook";
            //const string connectionString = "mongodb://localhost:27017";
            //// Get a thread-safe client object by using a connection string
            var mongoClient = new MongoClient(connectionString);

            //// Get a reference to a server object from the Mongo client object
            var mongoServer = mongoClient.GetServer();

            //// Get a reference to the database object 
            //// from the Mongo server object
            const string databaseName = "addressbook";
            var db = mongoServer.GetDatabase(databaseName);

            //// Get a reference to the collection object from the Mongo database object
            //// The collection name is the type converted to lowercase + "s"
            MongoCollection = db.GetCollection<T>(typeof(T).Name.ToLower() + "s");
        }
    }
}