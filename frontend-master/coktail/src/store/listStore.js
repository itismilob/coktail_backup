import { create } from 'zustand'

// product list data
export const useListDataStore = create((set) => ({
  searchType: '', // type (cocktails, recipes)
  setSearchType: (type) => set({ searchType: type }),
  isBtnsOn: false, // edit, delete buttons
  setBtnsOn: () => set({ isBtnsOn: true }),
  isLikesOn: false, // like Heart button
  setLikesOn: () => set({ isLikesOn: true }),
  listDatas: [[]],
  setListDatas: (data) => {
    set({ listDatas: data })
  },
  addListDatas: (data) => {
    set((state) => ({ listDatas: [[...state.listDatas, ...data]] }))
  },
  removeListDatas: () => {
    set({ listDatas: [[]] })
  },
}))
