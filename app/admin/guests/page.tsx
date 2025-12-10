// app/admin/guests/page.tsx - Admin panel for managing guests with Firebase
"use client";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase"; // You'll need to create this file

interface Guest {
  id?: string; // Firebase document ID
  slug: string;
  name: string;
  email?: string;
  plusOne: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const GuestAdmin: NextPage = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isAddingGuest, setIsAddingGuest] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch guests from Firebase on component mount
  useEffect(() => {
    const fetchGuests = async () => {
      try {
        setLoading(true);
        const guestsCollection = collection(db, "guests");
        const q = query(guestsCollection, orderBy("name"));

        // Set up real-time listener
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const guestsData: Guest[] = [];
          snapshot.forEach((doc) => {
            guestsData.push({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt?.toDate(),
              updatedAt: doc.data().updatedAt?.toDate(),
            } as Guest);
          });
          setGuests(guestsData);
          setLoading(false);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
      } catch (err) {
        console.error("Error fetching guests:", err);
        setError("Failed to load guests");
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  // Generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Check if slug already exists
  const isSlugUnique = async (
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
        const matches = querySnapshot.docs.filter(
          (doc) => doc.id !== excludeId
        );
        return matches.length === 0;
      }

      return false;
    } catch (err) {
      console.error("Error checking slug uniqueness:", err);
      return false;
    }
  };

  // Add new guest to Firebase
  const addGuest = async (guestData: Omit<Guest, "slug" | "id">) => {
    try {
      const slug = generateSlug(guestData.name);

      // Check if slug is unique
      const isUnique = await isSlugUnique(slug);
      if (!isUnique) {
        alert(
          "A guest with this name already exists. Please use a different name."
        );
        return;
      }

      const guestsCollection = collection(db, "guests");
      const newGuest = {
        ...guestData,
        slug,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addDoc(guestsCollection, newGuest);
      setIsAddingGuest(false);
    } catch (err) {
      console.error("Error adding guest:", err);
      setError("Failed to add guest");
    }
  };

  // Update guest in Firebase
  const updateGuest = async (updatedGuest: Guest) => {
    try {
      if (!updatedGuest.id) return;

      const guestDoc = doc(db, "guests", updatedGuest.id);
      const { ...updateData } = updatedGuest;

      await updateDoc(guestDoc, {
        ...updateData,
        updatedAt: new Date(),
      });

      setEditingGuest(null);
    } catch (err) {
      console.error("Error updating guest:", err);
      setError("Failed to update guest");
    }
  };

  // Delete guest from Firebase
  const deleteGuest = async (guestId: string) => {
    if (!confirm("Are you sure you want to delete this guest?")) return;

    try {
      const guestDoc = doc(db, "guests", guestId);
      await deleteDoc(guestDoc);
    } catch (err) {
      console.error("Error deleting guest:", err);
      setError("Failed to delete guest");
    }
  };

  // Filter guests based on search
  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500"></div>
          <p className="mt-4 text-gray-600">Loading guests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>Guest Management - Rasmi & Alex&apos;s Wedding</title>
        <meta
          name="description"
          content="Manage wedding guests and invitations"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-6xl mx-auto px-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Guest Management
          </h1>
          <p className="text-gray-600">
            Manage your wedding guest list and generate personalized invitation
            links
          </p>
        </div>

        {/* Search and Add Guest */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <button
              onClick={() => setIsAddingGuest(true)}
              className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition-colors"
            >
              + Add Guest
            </button>
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search guests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Guest List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Name
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Email
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Plus One
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Invitation Link
                  </th>
                  <th className="text-left p-4 font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">
                      {guest.name}
                    </td>
                    <td className="p-4 text-gray-600">
                      {guest.email || "Not provided"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          guest.plusOne
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {guest.plusOne ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/${guest.slug}`}
                          className="text-rose-600 hover:text-rose-700 underline"
                          target="_blank"
                        >
                          /{guest.slug}
                        </Link>
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(
                              `${window.location.origin}/${guest.slug}`
                            )
                          }
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copy link"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingGuest(guest)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => guest.id && deleteGuest(guest.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredGuests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No guests found
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-rose-600">
              {guests.length}
            </div>
            <div className="text-gray-600">Total Guests</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600">
              {guests.reduce((sum, guest) => sum + (guest.plusOne ? 2 : 1), 0)}
            </div>
            <div className="text-gray-600">Expected Attendees</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">
              {guests.filter((guest) => guest.plusOne).length}
            </div>
            <div className="text-gray-600">Plus Ones Allowed</div>
          </div>
        </div>
      </div>

      {/* Add/Edit Guest Modal */}
      {(isAddingGuest || editingGuest) && (
        <GuestModal
          guest={editingGuest}
          onSave={editingGuest ? updateGuest : addGuest}
          onCancel={() => {
            setIsAddingGuest(false);
            setEditingGuest(null);
          }}
          existingSlugs={guests.map((g) => g.slug)}
        />
      )}
    </div>
  );
};

// Guest Modal Component
const GuestModal = ({
  guest,
  onSave,
  onCancel,
}: {
  guest: Guest | null;
  onSave: (guest: Guest) => void;
  onCancel: () => void;
  existingSlugs: string[];
}) => {
  const [formData, setFormData] = useState({
    name: guest?.name || "",
    email: guest?.email || "",
    plusOne: guest?.plusOne || false,
    slug: "",
  });

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a guest name");
      return;
    }

    // For editing, we keep the existing slug
    if (guest) {
      onSave({ ...guest, ...formData });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">
          {guest ? "Edit Guest" : "Add New Guest"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guest Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="e.g., John Smith or The Smith Family"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              URL will be: /{generateSlug(formData.name)}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-600 transition-colors"
            >
              {guest ? "Update" : "Add"} Guest
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuestAdmin;
