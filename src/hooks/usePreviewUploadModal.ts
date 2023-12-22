import { create } from "zustand";

interface PreviewUploadModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  fileUrl?: string;
  setFileURL: (url: string) => void;
  resetFileURL: () => void;
  isLoading?: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const usePreviewUploadModal = create<PreviewUploadModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  fileUrl: undefined,
  setFileURL: (url) => set({ fileUrl: url }),
  resetFileURL: () => set({ fileUrl: undefined }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default usePreviewUploadModal;
