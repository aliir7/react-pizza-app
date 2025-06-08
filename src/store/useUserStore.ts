import { create } from "zustand";
import type { Position } from "../types";
import { getAddress, getPosition } from "../services/apiGeocoding";

type UserState = {
  // state
  username: string;
  position: Position | null;
  address: string;
  status: "idle" | "loading";
  error: string | null;

  // actions
  updateName: (name: string) => void;
  fetchAddress: () => Promise<void>;
};

const useUserStore = create<UserState>((set) => ({
  // initial states
  username: "",
  address: "",
  position: null,
  error: null,
  status: "idle",

  // action functions
  updateName: (name) => set({ username: name }),

  fetchAddress: async () => {
    try {
      set({ status: "loading", error: null });

      const positionObj = await getPosition();

      const addressObj = await getAddress({
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      });

      const address = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.postcode}, ${addressObj?.countryName} `;

      set({
        position: {
          latitude: positionObj.coords.latitude,
          longitude: positionObj.coords.longitude,
        },
        address: address,
        status: "idle",
      });
    } catch (err) {
      console.log(err);
      set({ status: "idle", error: "get address failed" });
    }
  },
}));

export default useUserStore;
