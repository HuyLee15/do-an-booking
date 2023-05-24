import { create } from 'zustand';

interface RentModalStore {
  initInfo?: Record<string, any>;
  isOpen: boolean;
  onOpen: (initInfo?: Record<string, any>) => void;
  onClose: () => void;
}

const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  onOpen: (initInfo) => set({ isOpen: true, initInfo }),
  onClose: () => set({ isOpen: false, initInfo: undefined }),
}));


export default useRentModal;
