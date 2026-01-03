import { Artist } from "../types/artist"

import { getApp } from "firebase/app"
import {
  Timestamp,
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"

import dayjs from "dayjs"
import { app } from "../core/firebaseInit"
import { Availability } from "../types/availability"
import { Concert } from "../types/concert"
import { Option, optionStatus } from "../types/option"
import { Venue } from "../types/venue"
const db = getFirestore(app ? app : getApp())

const convertFirestoreDateToDayjs = (firestoreDate: Timestamp): dayjs.Dayjs => {
  return dayjs(firestoreDate.toDate())
}

const today = new Date()
today.setHours(0, 0, 0, 0)
const midnightThisMorning = Timestamp.fromDate(today)

export const fetchSimpleAvailability = async (availabilityId: string): Promise<Availability> => {
  const availabilityDoc = await getDoc(doc(db, "availabilities", availabilityId))
  const data = availabilityDoc.data()
  if (data) {
    return {
      id: availabilityId,
      artistId: data.artistId,
      artistName: "",
      zones: data.zones,
      startDate: convertFirestoreDateToDayjs(data.startDate),
      endDate: convertFirestoreDateToDayjs(data.endDate),
      options: [],
    } as unknown as Availability
  }
  return {} as unknown as Availability
}

export const fetchAvailabilities = async (): Promise<Availability[]> => {
  const querySnapshot = await getDocs(
    query(collection(db, "availabilities"), where("endDate", ">=", midnightThisMorning))
  )
  const availabilities = await Promise.all(
    querySnapshot.docs.map(async (availability) => {
      const data = availability.data()
      const options: Option[] = await fetchOptionsFromAvailabilityId(availability.id)
      const artist = await fetchSimpleArtist(data.artistId)

      return {
        id: availability.id,
        artistId: data.artistId,
        artistName: artist.longName,
        zones: data.zones,
        startDate: convertFirestoreDateToDayjs(data.startDate),
        endDate: convertFirestoreDateToDayjs(data.endDate),
        options: options,
      } as unknown as Availability
    })
  )
  return availabilities
}

export const fetchAvailabilitiesFromArtistId = async (
  artistId: string
): Promise<Availability[]> => {
  const queryAvailabilities = await getDocs(
    query(
      collection(db, "availabilities"),
      where("artistId", "==", artistId),
      where("endDate", ">=", midnightThisMorning)
    )
  )
  const availabilities = await Promise.all(
    queryAvailabilities.docs.map(async (availability) => {
      const data = availability.data()
      const options: Option[] = await fetchOptionsFromAvailabilityId(availability.id)
      return {
        id: availability.id,
        artistId: artistId,
        artistName: "",
        zones: data.zones,
        startDate: convertFirestoreDateToDayjs(data.startDate),
        endDate: convertFirestoreDateToDayjs(data.endDate),
        options: options,
      } as unknown as Availability
    })
  )
  return availabilities
}

export const fetchConcertsFromArtistId = async (
  artistId: string,
  artistName: string
): Promise<Concert[]> => {
  const queryConcerts = await getDocs(
    query(collection(db, "concerts"), where("artistId", "==", artistId))
  )
  const concerts = await Promise.all(
    queryConcerts.docs.map(async (concert) => {
      const data = concert.data()
      const venue = await fetchSimpleVenue(data.venueId)

      return {
        id: concert.id,
        artistId: artistId,
        artistName: artistName,
        organizer: data.organizer,
        date: convertFirestoreDateToDayjs(data.date),
        venueId: data.venueId,
        venueName: venue.longName,
      } as unknown as Concert
    })
  )
  return concerts
}

export const fetchOptionsFromAvailabilityId = async (availabilityId: string): Promise<Option[]> => {
  const queryOptions = await getDocs(
    query(
      collection(db, "options"),
      where("availabilityId", "==", availabilityId),
      where("date", ">=", midnightThisMorning)
    )
  )
  const options = await Promise.all(
    queryOptions.docs.map(async (option) => {
      const data = option.data()
      const venue = await fetchSimpleVenue(data.venueId)

      return {
        id: option.id,
        availabilityId: availabilityId,
        organizer: data.organizer,
        date: convertFirestoreDateToDayjs(data.date),
        venueId: data.venueId,
        artistId: data.artistId,
        venueName: venue.longName,
        status: data.status ? data.status : optionStatus.proposée,
      } as unknown as Option
    })
  )
  return options
}

export const fetchArtists = async (): Promise<Artist[]> => {
  const querySnapshot = await getDocs(collection(db, "artists"))
  return querySnapshot.docs.map((artist) => {
    const data = artist.data()
    return {
      id: artist.id,
      longName: data.longName,
      shortName: data.shortName,
      description: data.description,
      availabilities: [],
      concerts: [],
    } as unknown as Artist
  })
}

export const fetchArtistsFromString = async (searchString: string): Promise<Artist[]> => {
  searchString = searchString.toLowerCase().replace(/\s/g, "")
  const querySnapshot = await getDocs(
    query(
      collection(db, "artists"),
      where("shortName", ">=", searchString),
      where("shortName", "<=", searchString + "\uf8ff")
    )
  )
  return querySnapshot.docs.map((artist) => {
    const data = artist.data()
    return {
      id: artist.id,
      longName: data.longName,
      shortName: data.shortName,
      description: data.description,
      availabilities: [],
      concerts: [],
    } as unknown as Artist
  })
}

export const fetchArtist = async (artistId: string): Promise<Artist> => {
  const artist = await getDoc(doc(db, "artists", artistId))

  const data = artist.data()
  if (data) {
    const availabilities = await fetchAvailabilitiesFromArtistId(artistId)
    const concerts = await fetchConcertsFromArtistId(artistId, data.longName)
    return {
      id: artist.id,
      longName: data.longName,
      shortName: data.shortName,
      description: data.description,
      availabilities: availabilities,
      concerts: concerts,
    } as unknown as Artist
  }
  return {} as unknown as Artist
}

export const fetchArtistFromShortName = async (shortName: string): Promise<Artist> => {
  // Query to find the artist with matching shortName
  const artistQuery = query(collection(db, "artists"), where("shortName", "==", shortName))

  const querySnapshot = await getDocs(artistQuery)

  // Check if any results found
  if (querySnapshot.empty) {
    return {} as unknown as Artist
  }

  // Get the first matching artist
  const artistDoc = querySnapshot.docs[0]
  const data = artistDoc.data()
  const artistId = artistDoc.id

  // Fetch related data
  const availabilities = await fetchAvailabilitiesFromArtistId(artistId)
  const concerts = await fetchConcertsFromArtistId(artistId, data.longName)

  return {
    id: artistId,
    longName: data.longName,
    shortName: data.shortName,
    description: data.description,
    availabilities: availabilities,
    concerts: concerts,
  } as unknown as Artist
}

export const fetchSimpleArtist = async (artistId: string): Promise<Artist> => {
  const artistDoc = await getDoc(doc(db, "artists", artistId))
  const data = artistDoc.data()
  if (data) {
    return {
      id: artistId,
      longName: data.longName,
      shortName: data.shortName,
      description: data.description,
      availabilities: [],
      concerts: [],
    } as unknown as Artist
  }
  return {} as unknown as Artist
}

export const fetchSimpleVenue = async (venueId: string): Promise<Venue> => {
  const venueDoc = await getDoc(doc(db, "venues", venueId))
  const data = venueDoc.data()
  if (data) {
    return {
      id: venueId,
      shortName: data.shortName,
      longName: data.longName,
      region: data.region,
      description: data.description,
      concerts: [],
    } as unknown as Venue
  }
  return {} as unknown as Venue
}

export const addAvailability = async (availability: Availability): Promise<void> => {
  const docRef = await addDoc(collection(db, "availabilities"), {
    artistId: availability.artistId,
    zones: availability.zones,
    startDate: Timestamp.fromDate(availability.startDate.toDate()),
    endDate: Timestamp.fromDate(availability.endDate.toDate()),
  })
  console.log("Document written with ID: ", docRef.id)
}

export const createOptionFromAvailability = async (
  availability: Availability,
  date: dayjs.Dayjs
): Promise<void> => {
  const optionData = {
    organizer: "Orga Connectour",
    venueId: "3",
    artistId: availability.artistId,
    availabilityId: availability.id,
    date: Timestamp.fromDate(date.toDate()),
    status: optionStatus.proposée,
  }

  const optionRef = await addDoc(collection(db, "options"), optionData)
  console.log("Option created with ID: ", optionRef.id)
}

const updateOption = async (option: Option, status: optionStatus): Promise<void> => {
  return await updateDoc(doc(db, "options", option.id), {
    id: option.id,
    organizer: option.organizer,
    artistId: option.artistId,
    availabilityId: option.availabilityId,
    venueId: option.venueId,
    date: Timestamp.fromDate(option.date.toDate()),
    status: status,
  })
}

export const acceptOption = async (option: Option): Promise<void> => {
  await updateOption(option, optionStatus.acceptée)
  console.log("Option acceptée with ID: ", option.id)
}

export const confirmOption = async (option: Option): Promise<void> => {
  const availability = await fetchSimpleAvailability(option.availabilityId)

  const concertData = {
    organizer: option.organizer,
    artistId: availability.artistId,
    venueId: option.venueId,
    date: Timestamp.fromDate(option.date.toDate()),
  }

  // Add the concert to the "concerts" collection
  const concertRef = await addDoc(collection(db, "concerts"), concertData)
  console.log("Concert created with ID: ", concertRef.id)

  await updateOption(option, optionStatus.confirmée)
  console.log("Option confirmée with ID: ", option.id)
}

export const refuseOption = async (option: Option): Promise<void> => {
  await updateOption(option, optionStatus.refusée)
  console.log("Option refusée with ID: ", option.id)
}

export const deleteOption = async (option: Option): Promise<void> => {
  await deleteDoc(doc(db, "options", option.id))
  console.log("Option deleted with ID: ", option.id)
}
