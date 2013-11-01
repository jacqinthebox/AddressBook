using AddressBook.Models;
using MongoDB.Bson;
using MongoDB.Driver.Builders;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AddressBook.Controllers
{
    public class PersonController : ApiController
    {
        public MongoConnectionHandler<Person> collection = new MongoConnectionHandler<Person>();

        public HttpResponseMessage Post([FromBody] Person person)
        {
            collection.MongoCollection.Insert(person);
            var response = Request.CreateResponse<Person>(HttpStatusCode.Created, person);

          
            string uri = Url.Link("DefaultApi", new { id = person.Person_Id });
            response.Headers.Location = new Uri(uri);
            return response;

        }

        public IEnumerable Get()
        {
            return collection.MongoCollection.FindAll().AsEnumerable();

        }


        public Person Get(string id) {

            //var query = Query<Person>.EQ(p => p.Person_Id, id);
            return collection.MongoCollection.FindOne(Query.EQ("_id", id));

        }

        public void Delete(string id)
        {
            collection.MongoCollection.Remove(Query.EQ("_id", id));

        }

        public HttpResponseMessage Put([FromBody] Person person)
        {
            
            var p = collection.MongoCollection.FindOne(Query.EQ("_id", person.Person_Id));

            if (p != null)
            {
                collection.MongoCollection.Save(person);
            }
           
            return Request.CreateResponse<Person>(HttpStatusCode.OK, person);
        }
    }
}
