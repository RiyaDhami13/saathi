export const EN_TEXT = {
  appTitle: "Sudur Saathi",
  langToggle: "नेपाली",
  Home: {
    scanButton: "Scan Prescription",
    emergencyButton: "Emergency",

    searchPlaceholder: "Doctor or service, e.g. heart doctor, X-ray",
    searchHeading: "Find a doctor or service",
    
    resultsFor: "Results for",
    showAll: "Show all",

    uploadPhoto: "Upload Photo",
    trySample: "Try a Sample",
    searchButton: "Search",
    uploading: "Reading your photo…",
  },
  Confirm: {
    confirmHeading: "Is this correct?",
    confirmSubmit: "Yes, explain it",
    addItemPlaceholder: "Add a missing item",
    removeItem: "Remove",
    addItemButton: "Add",
    itemLabel: "Item",
    types: {
      medicine: "Medicine",
      test: "Test",
      instruction: "Instruction",
      other: "Other",
    },
  },
  Explain: {
    listen: "Listen",
    stopListening: "Stop",
    disclaimer:
      "For information only. Ask a health worker about diagnosis, doses, or changing treatment.",
    doctorNoteHeading: "Ask your health worker",
    careButton: "Find nearby care",
    summaryHeading: "Summary",
  },
  Care: {
    callFirstReminder: "Call first before you go",
    emergency24h: "Open 24 hours",
    districtFilterAll: "All districts",
    districtKanchanpur: "Kanchanpur",
    districtKailali: "Kailali",
    emergencyBadge: "24/7 Emergency",
    callButton: "Call",
    directions: "Get directions",
    noResults: "No facilities found",
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