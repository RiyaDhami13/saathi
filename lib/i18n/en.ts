export const EN_TEXT = {
  appTitle: "Sudur Saathi",
  langToggle: "नेपाली",
  Home: {
    scanButton: "Scan Prescription",
    emergencyButton: "Emergency",
    searchPlaceholder: "Search medicine or test",
    uploadPhoto: "Upload Photo",
    trySample: "Try a Sample",
  },
  Confirm: {
    confirmHeading: "Is this correct?",
    confirmSubmit: "Yes, explain it",
    addItemPlaceholder: "Add a missing item",
    removeItem: "Remove",
  },
  Explain: {
    listen: "Listen",
    stopListening: "Stop",
    disclaimer:
      "For information only. Ask a health worker about diagnosis, doses, or changing treatment.",
    doctorNoteHeading: "Ask your health worker",
    careButton: "Find nearby care",
  },
  Care: {
    callFirstReminder: "Call first before you go",
    emergency24h: "Open 24 hours",
    districtFilterAll: "All districts",
    districtKanchanpur: "Kanchanpur",
    districtKailali: "Kailali",
  },
  States: {
    loading: "Loading…",
    error: "Something went wrong. Please try again.",
    cancel: "Cancel",
  },
} as const;

/** Same keys and nesting as EN_TEXT, with literal strings widened to `string`. */
type Widen<T> = T extends string
  ? string
  : { -readonly [K in keyof T]: Widen<T[K]> };

export type I18nDict = Widen<typeof EN_TEXT>;