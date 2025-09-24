/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {Firestore, Timestamp} from "@google-cloud/firestore"
import {ArtistInput} from "../models/artist"
import {AvailabilityInput} from "../models/availability"
import {ConcertInput} from "../models/concert"
import {OptionInput} from "../models/option"
import {UserTypeInput} from "../models/userType"
import {VenueInput} from "../models/venue"

export const testArtists: (ArtistInput & { id: string })[] = [
  {
    id: "0",
    shortName: "malkavian",
    longName: "Malkavian",
    description: "Black/Death",
  },
  {
    id: "1",
    shortName: "gojira",
    longName: "Gojira",
    description: "Prog",
  },
  {
    id: "2",
    shortName: "sierra",
    longName: "Sierra",
    description: "EBM",
  },
  {
    id: "3",
    shortName: "codeorange",
    longName: "Code Orange",
    description: "Metalcore",
  },
];

export const testAvailabilities: (AvailabilityInput & { id: string })[] = [
  {
    id: "0",
    artistId: "0",
    zones: ["Poitou-Charentes"],
    startDate: Timestamp.fromDate(new Date("2025-01-01")),
    endDate: Timestamp.fromDate(new Date("2025-01-31")),
  },
  {
    id: "1",
    artistId: "0",
    zones: ["Creuse"],
    startDate: Timestamp.fromDate(new Date("2025-02-01")),
    endDate: Timestamp.fromDate(new Date("2025-02-28")),
  },
  {
    id: "2",
    artistId: "1",
    zones: ["Poitou-Charentes"],
    startDate: Timestamp.fromDate(new Date("2025-01-01")),
    endDate: Timestamp.fromDate(new Date("2025-01-31")),
  },
  {
    id: "3",
    artistId: "1",
    zones: ["Creuse"],
    startDate: Timestamp.fromDate(new Date("2025-02-01")),
    endDate: Timestamp.fromDate(new Date("2025-02-28")),
  },
  {
    id: "4",
    artistId: "2",
    zones: ["Poitou-Charentes"],
    startDate: Timestamp.fromDate(new Date("2025-01-01")),
    endDate: Timestamp.fromDate(new Date("2025-01-31")),
  },
  {
    id: "5",
    artistId: "2",
    zones: ["Creuse"],
    startDate: Timestamp.fromDate(new Date("2025-02-01")),
    endDate: Timestamp.fromDate(new Date("2025-02-28")),
  },
  {
    id: "6",
    artistId: "3",
    zones: ["Poitou-Charentes"],
    startDate: Timestamp.fromDate(new Date("2025-01-01")),
    endDate: Timestamp.fromDate(new Date("2025-01-31")),
  },
  {
    id: "7",
    artistId: "3",
    zones: ["Creuse"],
    startDate: Timestamp.fromDate(new Date("2025-02-01")),
    endDate: Timestamp.fromDate(new Date("2025-02-28")),
  },
];

export const testOptions: (OptionInput & { id: string })[] = [
  {
    id: "0",
    organizer: "Crumble Fight",
    venueId: "3",
    artistId: "0",
    availabilityId: "1",
    date: Timestamp.fromDate(new Date("2025-02-15T20:00:00")),
  },
];

export const testConcerts: (ConcertInput & { id: string })[] = [
  {
    id: "0",
    date: Timestamp.fromDate(new Date("2025-03-01T20:00:00")),
    organizer: "Live Nation",
    venueId: "0", // Le Trianon
    artistId: "0",
  },
  {
    id: "1",
    date: Timestamp.fromDate(new Date("2025-04-01T21:00:00")),
    organizer: "AEG Presents",
    venueId: "1", // Le Transbordeur
    artistId: "1",
  },
  {
    id: "2",
    date: Timestamp.fromDate(new Date("2025-03-01T20:00:00")),
    organizer: "Live Nation",
    venueId: "0", // Le Trianon
    artistId: "2",
  },
];

export const testVenues: (VenueInput & { id: string })[] = [
  {
    id: "0",
    shortName: "trianon",
    longName: "Le Trianon",
    region: "Paris, France",
    description: "A historic theater in Paris.",
  },
  {
    id: "1",
    shortName: "transbordeur",
    longName: "Le Transbordeur",
    region: "Lyon, France",
    description: "A popular concert venue in Lyon.",
  },
  {
    id: "2",
    shortName: "rockarena",
    longName: "Rock Arena",
    region: "Bordeaux, France",
    description: "A large venue for rock concerts.",
  },
  {
    id: "3",
    shortName: "coldcrash",
    longName: "Cold Crash",
    region: "Marseille, France",
    description: "An intimate venue for indie bands.",
  },
];

export const testUserType: (UserTypeInput & { id: string })[] = [
  {
    id: "0",
    type: "agent",
    userId: "BrFCVMNZE8gnLkffGSLBqTxxT4K3",
  },
  {
    id: "1",
    type: "prod",
    userId: "ElZSqHwkVHWKn4Jh7XAJhukCsum1",
  },
];

export async function seed(db: Firestore) {
  const batch = db.batch();

  for (const { id, ...artist } of testArtists) {
    const ref = db.doc(`artists/${id}`);
    batch.set(ref, artist, { merge: true });
  }

  for (const { id, ...availability } of testAvailabilities) {
    const ref = db.doc(`availabilities/${id}`);
    batch.set(ref, availability, { merge: true });
  }

  for (const { id, ...option } of testOptions) {
    const ref = db.doc(`options/${id}`);
    batch.set(ref, option, { merge: true });
  }

  for (const { id, ...concert } of testConcerts) {
    const ref = db.doc(`concerts/${id}`);
    batch.set(ref, concert, { merge: true });
  }

  for (const { id, ...venue } of testVenues) {
    const ref = db.doc(`venues/${id}`);
    batch.set(ref, venue, { merge: true });
  }

  for (const { id, ...userType } of testUserType) {
    const ref = db.doc(`userTypes/${id}`);
    batch.set(ref, userType, { merge: true });
  }

  await batch.commit();
}
