import { create } from "zustand";

interface CreateFilePloadStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  fileUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  setFileURL: (url: string) => void;
  setImageWidth: (width: number) => void;
  setImageHeight: (height: number) => void;
  resetFileURL: () => void;
  resetImageDimensions: () => void;
}

const useUploadFileModal = create<CreateFilePloadStore>((set) => ({
  isOpen: false,
  fileUrl: undefined,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setFileURL: (url: string) => set({ fileUrl: url }),
  setImageWidth: (width: number) => set({ imageWidth: width }),
  setImageHeight: (height: number) => set({ imageHeight: height }),
  resetFileURL: () => set({ fileUrl: undefined }),
  resetImageDimensions: () =>
    set({ imageWidth: undefined, imageHeight: undefined }),
}));

export default useUploadFileModal;
