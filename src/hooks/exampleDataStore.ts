import { create } from "zustand";

interface DataStore {
  wereWolfs: number;
  increasePopulation: () => void;
  removeAllWerewolfs: () => void;
}

const useDataStore = create<DataStore>((set) => ({
  wereWolfs: 14,
  increasePopulation: () =>
    set((state) => ({ wereWolfs: state.wereWolfs + 1 })),
  removeAllWerewolfs: () => set({ wereWolfs: 0 }),
}));

export default useDataStore;

// function Controls() {
//   const increasePopulation = useDataStore((state) => state.increasePopulation)
//   return <button onClick={increasePopulation}>one up</button>
// }

// https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#how-do-i-use-it-with-map-and-set
