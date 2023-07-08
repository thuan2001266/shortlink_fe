import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface LinkState {
  id: number;
  link: string;
  shortedLink: string;
  clickedTime: number;
  createdBy: string;
  createdAt: number;
  utmsource: string;
  utmterm: string;
  utmmedium: string;
  utmcampaign: string;
  utmcontent: string;
}

export interface LinkList {
  links: LinkState[];
  original: LinkState[];
  selectedLink: LinkState;
}

export const initialSelectedLink: LinkState = {
  id: -1,
  link: "",
  shortedLink: "",
  clickedTime: -1,
  createdBy: "",
  createdAt: -1,
  utmsource: "",
  utmterm: "",
  utmmedium: "",
  utmcampaign: "",
  utmcontent: "",
};

const initialState: LinkList = {
  links: [],
  original: [],
  selectedLink: {
    id: -1,
    link: "",
    shortedLink: "",
    clickedTime: -1,
    createdBy: "",
    createdAt: -1,
    utmsource: "",
    utmterm: "",
    utmmedium: "",
    utmcampaign: "",
    utmcontent: "",
  },
};

type findState = {
  input: string;
  sortType: string;
};

export const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setLinks: (state, action: PayloadAction<LinkState[]>) => {
      state.links = [...action.payload];
      state.original = [...action.payload];
    },
    addLink: (state, action: PayloadAction<LinkState>) => {
      state.links = [
        ...state.links.filter(
          (e) => e.shortedLink != action.payload.shortedLink
        ),
        action.payload,
      ];
      state.original = [
        ...state.original.filter(
          (e) => e.shortedLink != action.payload.shortedLink
        ),
        action.payload,
      ];
    },
    removeLink: (state, action: PayloadAction<number>) => {
      state.links = state.links.filter((e) => e.id !== action.payload);
      state.original = state.original.filter((e) => e.id !== action.payload);
    },
    sortRecent: (state) => {
      state.links.sort((a, b) => b.createdAt - a.createdAt);
    },
    sortClick: (state) => {
      state.links.sort((a, b) => b.clickedTime - a.clickedTime);
    },
    findLink: (state, action: PayloadAction<findState>) => {
      state.links = state.original
        .filter(
          (e) =>
            e.link.toLocaleLowerCase().includes(action.payload.input) ||
            e.shortedLink.toLocaleLowerCase().includes(action.payload.input)
        )
        .sort((a, b) => {
          if (action.payload.sortType === "resent") {
            return b.createdAt - a.createdAt;
          } else {
            return b.clickedTime - a.clickedTime;
          }
        });
    },
    findNone: (state) => {
      state.links = state.original;
    },
    selectLink: (state, action: PayloadAction<LinkState>) => {
      state.selectedLink = action.payload;
    },
  },
});

export const {
  setLinks,
  addLink,
  removeLink,
  sortClick,
  sortRecent,
  findLink,
  findNone,
  selectLink,
} = linkSlice.actions;

export const selectLinks = (state: RootState) => state.links;

export default linkSlice.reducer;
