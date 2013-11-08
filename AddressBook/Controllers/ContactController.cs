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
    public class ContactController : ApiController
    {
        public MongoConnectionHandler<Contact> collection = new MongoConnectionHandler<Contact>();

        public HttpResponseMessage Post([FromBody] Contact contact)
        {
            var p = collection.MongoCollection.FindOne(Query.EQ("_id", contact.Id));

             collection.MongoCollection.Insert(contact);
             var response = Request.CreateResponse<Contact>(HttpStatusCode.Created, contact);
            string uri = Url.Link("DefaultApi", new { id = contact.Id });
            response.Headers.Location = new Uri(uri);
            return response;
          
        }

        public IEnumerable Get()
        {
            return collection.MongoCollection.FindAll().AsEnumerable();

        }


        public Contact Get(string id) {

            //var query = Query<Contact>.EQ(p => p.Contact_Id, id);
            return collection.MongoCollection.FindOne(Query.EQ("_id", id));

        }

        public void Delete(string id)
        {
            collection.MongoCollection.Remove(Query.EQ("_id", id));

        }

        public HttpResponseMessage Put([FromBody] Contact contact)
        {
            
            var p = collection.MongoCollection.FindOne(Query.EQ("_id", contact.Id));

            if (p != null)
            {
                collection.MongoCollection.Save(contact);
            }
           
            return Request.CreateResponse<Contact>(HttpStatusCode.OK, contact);
        }
    }
}
