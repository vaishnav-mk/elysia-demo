import { Elysia, t } from "elysia";
import { ContactDB } from "./db.js";
import { html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(html())
  .use(
    swagger({
      documentation: {
        info: {
          title: "Elysia Demo",
          description: "A demo of Elysia",
          version: "1.0.0",
        },
      },
    })
  )
  .decorate("db", new ContactDB())
  .get("/", ({ set }) => {
    set.redirect = "/swagger";
  })
  .get("/contacts", ({ db }) => db.getAllContacts())
  .post(
    "/contacts",
    ({ db, body }) => {
      const { name, phoneNumber, email } = body;
      return db.createContact({ name, phoneNumber, email });
    },
    {
      schema: {
        body: t.Object({
          name: t.String(),
          phoneNumber: t.Number(),
          email: t.String(),
        }),
      },
    }
  )
  .patch(
    "/contacts/:phoneNumber",
    ({ db, body, params }) => {
      const phoneNumber = parseInt(params.phoneNumber);
      const { name, email } = body;
      return db.updateContact({ name, phoneNumber, email });
    },
    {
      schema: {
        body: t.Object({
          name: t.String(),
          email: t.String(),
        }),
        params: t.Object({
          phoneNumber: t.String(),
        }),
      },
    }
  )
  .delete(
    "/contacts/:phoneNumber",
    ({ db, params }) => {
      const phoneNumber = parseInt(params.phoneNumber);
      return db.deleteContact(phoneNumber);
    },
    {
      schema: {
        params: t.Object({
          phoneNumber: t.String(),
        }),
      },
    }
  )
  .get(
    "/contacts/:phoneNumber",
    ({ db, params }) => {
      const phoneNumber = parseInt(params.phoneNumber);
      return db.getContact(phoneNumber);
    },
    {
      schema: {
        params: t.Object({
          phoneNumber: t.String(),
        }),
      },
    }
  )
  .get(
    "/contacts/search/:queryString",
    ({ db, params }) => {
      return db.searchContacts(params.queryString);
    },
    {
      schema: {
        params: t.Object({
          queryString: t.String(),
        }),
      },
    }
  )
  .listen(3000, ({ hostname, port }) => {
    console.log(`🎉 Elysia is running at http://${hostname}:${port}`);
  });
