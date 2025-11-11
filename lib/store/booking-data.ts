import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookingData {
  company: string;
  customCompany?: string;
  role: string;
  customRole?: string;
  experience: string;
  skillset: string;
}

interface UserData {
  name: string;
  email: string;
  id?: string;
}

interface StoreState {
  // Booking Data
  bookingData: BookingData;
  setBookingData: (data: Partial<BookingData>) => void;
  resetBookingData: () => void;

  // User Data
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  clearUserData: () => void;

  // Helper to check if booking form is complete
  isBookingComplete: () => boolean;
}

const initialBookingData: BookingData = {
  company: "",
  customCompany: "",
  role: "",
  customRole: "",
  experience: "",
  skillset: "",
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Booking Data
      bookingData: initialBookingData,

      setBookingData: (data) =>
        set((state) => ({
          bookingData: { ...state.bookingData, ...data },
        })),

      resetBookingData: () => set({ bookingData: initialBookingData }),

      // User Data
      userData: null,

      setUserData: (data) => set({ userData: data }),

      clearUserData: () => set({ userData: null }),

      // Check if booking is complete
      isBookingComplete: () => {
        const { bookingData } = get();
        const company =
          bookingData.company === "Other"
            ? bookingData.customCompany
            : bookingData.company;
        const role =
          bookingData.role === "Other"
            ? bookingData.customRole
            : bookingData.role;

        return !!(
          company &&
          role &&
          bookingData.experience &&
          bookingData.skillset
        );
      },
    }),
    {
      name: "interview-booking-storage",
    }
  )
);
