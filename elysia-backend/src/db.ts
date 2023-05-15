import { Database } from "bun:sqlite";

export interface Contact {
  id: number;
  phoneNumber: number;
  name: string;
  email?: string;
  createdAt: string;
  updatedAt?: string;
}

export class ContactDB {
  private db: Database;

  constructor() {
    this.db = new Database("contacts.db", { create: true });
    this.init()
      .then(() => console.log("Validated contacts table successfully!"))
      .catch(console.error);
  }

  async init(): Promise<void> {
    const query = `CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phoneNumber INTEGER NOT NULL UNIQUE,
        email TEXT,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )`;
    return this.db.run(query);
  }

  async createContact({
    phoneNumber,
    name,
    email,
  }: Omit<Contact, "id" | "createdAt" | "updatedAt">): Promise<
    Omit<Contact, "id" | "createdAt" | "updatedAt"> | Error
  > {
    const existingContact = await this.getContact(phoneNumber);

    if (!(existingContact instanceof Error)) {
      return new Error("Contact already exists");
    }

    const query = this.db.query(`
      INSERT INTO contacts (phoneNumber, name, email) VALUES ($phoneNumber, $name, ${
        email ? "$email" : "NULL"
      })
    `);

    let contact: void | Contact;

    try {
      contact = query.run({
        $phoneNumber: phoneNumber,
        $name: name,
        $email: email || null,
      });
    } catch (e) {
      return new Error("An error occurred while creating the contact");
    }

    return {
      phoneNumber,
      name,
      email,
    };
  }

  async updateContact({
    phoneNumber,
    name,
    email,
  }: Omit<Contact, "id" | "createdAt" | "updatedAt"> & {
    email?: string;
  }): Promise<{ name: string; email: string } | Error> {
    const existingContact = await this.getContact(phoneNumber);

    if (existingContact instanceof Error) {
      return new Error("Contact not found");
    }

    if (existingContact.email === email) {
      return new Error("The email you provided is already in use");
    }

    if (existingContact.name === name) {
      return new Error("The name you provided is already in use");
    }

    const query = this.db.query(`
      UPDATE contacts SET name = $name, email = ${
        email ? "$email" : "NULL"
      }, updatedAt = datetime('now') WHERE phoneNumber = $phoneNumber
    `);

    try {
      query.run({
        $name: name,
        $email: email || null,
        $phoneNumber: phoneNumber,
      });
    } catch (e) {
      return new Error("An error occurred while updating the contact");
    }

    return {
      name,
      email: email || "",
    };
  }

  async deleteContact(
    phoneNumber: number
  ): Promise<{ phoneNumber: number } | Error> {
    const existingContact = await this.getContact(phoneNumber);

    if (existingContact instanceof Error) {
      return new Error("Contact not found");
    }

    const query = this.db.query(
      `DELETE FROM contacts WHERE phoneNumber = $phoneNumber`
    );

    try {
      query.run({
        $phoneNumber: phoneNumber,
      });
    } catch (e) {
      return new Error("An error occurred while deleting the contact");
    }

    return { phoneNumber };
  }

  async getContact(phoneNumber: number): Promise<Contact | Error> {
    const query = this.db.query(
      `SELECT * FROM contacts WHERE phoneNumber = $phoneNumber`
    );

    const contact = query.get({
      $phoneNumber: phoneNumber,
    }) as Contact;

    if (!contact) {
      return new Error("Contact not found");
    }

    return contact;
  }

  async searchContacts(queryString: string): Promise<Contact[] | Error> {
    const query = this.db.query(
      `SELECT * FROM contacts WHERE name LIKE $queryString OR email LIKE $queryString`
    );
    const contacts = query.all({ $queryString: `%${queryString}%` });

    if (!contacts.length) {
      return new Error("No contacts found");
    }

    return contacts as Contact[];
  }

  async getAllContacts(): Promise<Contact[] | Error> {
    const query = this.db.query(`SELECT * FROM contacts`);
    const contacts = query.all() as Contact[];

    if (!contacts.length) {
      return new Error("No contacts found");
    }

    return contacts;
  }
}
