// lib/guestUtils.ts - Utility functions for guest management
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export interface Guest {
  id?: string;
  name: string;
  email?: string;
  plusOne: boolean;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Fetch a guest by their slug from Firebase
 */
export const getGuestBySlug = async (slug: string): Promise<Guest | null> => {
  try {
    const guestsCollection = collection(db, "guests");
    const q = query(guestsCollection, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    // Get the first matching document
    const guestDoc = querySnapshot.docs[0];
    const guestData = {
      id: guestDoc.id,
      ...guestDoc.data(),
      createdAt: guestDoc.data().createdAt?.toDate(),
      updatedAt: guestDoc.data().updatedAt?.toDate(),
    } as Guest;

    return guestData;
  } catch (error) {
    console.error("Error fetching guest by slug:", error);
    throw new Error("Failed to fetch guest data");
  }
};

/**
 * Fetch a guest by their document ID from Firebase
 */
export const getGuestById = async (id: string): Promise<Guest | null> => {
  try {
    const guestDoc = doc(db, "guests", id);
    const guestSnapshot = await getDoc(guestDoc);

    if (!guestSnapshot.exists()) {
      return null;
    }

    const guestData = {
      id: guestSnapshot.id,
      ...guestSnapshot.data(),
      createdAt: guestSnapshot.data().createdAt?.toDate(),
      updatedAt: guestSnapshot.data().updatedAt?.toDate(),
    } as Guest;

    return guestData;
  } catch (error) {
    console.error("Error fetching guest by ID:", error);
    throw new Error("Failed to fetch guest data");
  }
};

/**
 * Get all guests from Firebase
 */
export const getAllGuests = async (): Promise<Guest[]> => {
  try {
    const guestsCollection = collection(db, "guests");
    const querySnapshot = await getDocs(guestsCollection);

    const guests: Guest[] = [];
    querySnapshot.forEach((doc) => {
      guests.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      } as Guest);
    });

    return guests;
  } catch (error) {
    console.error("Error fetching all guests:", error);
    throw new Error("Failed to fetch guests data");
  }
};

/**
 * Generate a URL-friendly slug from a name
 */
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

/**
 * Check if a slug is unique in the database
 */
export const isSlugUnique = async (
  slug: string,
  excludeId?: string
): Promise<boolean> => {
  try {
    const guestsCollection = collection(db, "guests");
    const q = query(guestsCollection, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return true;

    // If we're editing, check if the only match is the current guest
    if (excludeId) {
      const matches = querySnapshot.docs.filter((doc) => doc.id !== excludeId);
      return matches.length === 0;
    }

    return false;
  } catch (error) {
    console.error("Error checking slug uniqueness:", error);
    return false;
  }
};

/**
 * Calculate expected party size based on guest data
 */
export const calculateExpectedPartySize = (guest: Guest): number => {
  return guest.plusOne ? 2 : 1;
};

/**
 * Format guest data for display
 */
export const formatGuestData = (guest: Guest) => {
  return {
    ...guest,
    expectedPartySize: calculateExpectedPartySize(guest),
    formattedCreatedAt: guest.createdAt?.toLocaleDateString(),
    formattedUpdatedAt: guest.updatedAt?.toLocaleDateString(),
  };
};

/**
 * Search guests by name or email
 */
export const searchGuests = (guests: Guest[], searchTerm: string): Guest[] => {
  if (!searchTerm.trim()) return guests;

  const term = searchTerm.toLowerCase();
  return guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(term) ||
      guest.email?.toLowerCase().includes(term) ||
      guest.slug.toLowerCase().includes(term)
  );
};

/**
 * Get guest statistics
 */
export const getGuestStats = (guests: Guest[]) => {
  const totalGuests = guests.length;
  const totalPlusOnes = guests.filter((guest) => guest.plusOne).length;
  const expectedAttendees = guests.reduce(
    (sum, guest) => sum + calculateExpectedPartySize(guest),
    0
  );

  return {
    totalGuests,
    totalPlusOnes,
    expectedAttendees,
    singleGuests: totalGuests - totalPlusOnes,
  };
};
