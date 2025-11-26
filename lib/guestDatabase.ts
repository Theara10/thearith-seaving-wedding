// lib/guestDatabase.ts - Centralized guest database
export interface Guest {
  name: string;
  email: string;
  plusOne: boolean;
  partySize: number;
}

export type GuestDatabase = {
  [slug: string]: Guest;
};

// Guest database - you can move this to a JSON file, database, or CMS
export const guestDatabase: GuestDatabase = {
  john: {
    name: "John Smith",
    email: "john@example.com",
    plusOne: false,
    partySize: 1,
  },
  sarah: {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    plusOne: true,
    partySize: 2,
  },
  "mike-and-lisa": {
    name: "Mike & Lisa Wilson",
    email: "mike.lisa@example.com",
    plusOne: false,
    partySize: 2,
  },
  "the-smiths": {
    name: "The Smith Family",
    email: "smithfamily@example.com",
    plusOne: false,
    partySize: 4,
  },
  alex: {
    name: "Alex Rodriguez",
    email: "alex@example.com",
    plusOne: true,
    partySize: 1,
  },
  "jane-doe": {
    name: "Jane Doe",
    email: "jane@example.com",
    plusOne: false,
    partySize: 1,
  },
  "the-johnsons": {
    name: "The Johnson Family",
    email: "johnsons@example.com",
    plusOne: false,
    partySize: 5,
  },
};

// Utility functions
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export const getGuestBySlug = (slug: string): Guest | null => {
  return guestDatabase[slug] || null;
};

export const getAllGuests = (): Array<Guest & { slug: string }> => {
  return Object.entries(guestDatabase).map(([slug, guest]) => ({
    slug,
    ...guest,
  }));
};

export const addGuest = (slug: string, guest: Guest): void => {
  guestDatabase[slug] = guest;
};

export const updateGuest = (slug: string, guest: Guest): void => {
  if (guestDatabase[slug]) {
    guestDatabase[slug] = guest;
  }
};

export const deleteGuest = (slug: string): void => {
  delete guestDatabase[slug];
};

// For production, you might want to use these functions with a database:
/*
export const getGuestBySlug = async (slug: string): Promise<Guest | null> => {
  // Database query
  const result = await db.query('SELECT * FROM guests WHERE slug = ?', [slug]);
  return result.length > 0 ? result[0] : null;
};

export const getAllGuests = async (): Promise<Array<Guest & { slug: string }>> => {
  // Database query
  const results = await db.query('SELECT * FROM guests');
  return results;
};
*/
