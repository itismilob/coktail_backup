import { create } from 'zustand';

export const reviewStore = create(
    (set) => ({
      reviewData: [],
      setReviewData: (data) => set(() => ({ reviewData: data })),
    }),
)

