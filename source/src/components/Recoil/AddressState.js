import { atom, selector } from 'recoil';

export const addressListState = atom({
  key: 'addressListState',
  default: [],
});

export const addressListSelector = selector({
  key: 'addressListSelector',
  get: ({get}) => {
    const dataAddress = get(addressListState);
    return dataAddress;
  },
});
