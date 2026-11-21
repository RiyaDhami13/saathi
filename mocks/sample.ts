import type { ExplainResponse, Facility, Lang, ReadItem } from "@/lib/types";

export const MOCK_READ_ITEMS: ReadItem[] = [
  { id: "item-1", text: "Paracetamol 500mg", type: "medicine" },
  { id: "item-2", text: "CBC (Complete Blood Count) Lab Test", type: "test" },
  { id: "item-3", text: "Hydration & Rest", type: "instruction" },
];

const DISCLAIMER: Record<Lang, string> = {
  ne: "यो जानकारी मात्र हो। निदान, औषधिको मात्रा वा उपचार परिवर्तनका लागि स्वास्थ्यकर्मीसँग सोध्नुहोस्।",
  en: "For information only. Ask a health worker about diagnosis, doses, or changing treatment.",
};

export const MOCK_EXPLANATION: Record<Lang, ExplainResponse> = {
  ne: {
    summary:
      "यो पर्चामा एउटा औषधि, एउटा रगत जाँच र आराम तथा पानी पिउने सल्लाह लेखिएको छ।",
    items: [
      {
        id: "item-1",
        plain:
          "प्यारासिटामोल सामान्यतया ज्वरो र हल्का दुखाइ कम गर्न प्रयोग गरिने औषधि हो। ५०० मिग्रा भनेको एउटा चक्कीमा भएको औषधिको मात्रा हो।",
        doctorNote:
          "कति चक्की, दिनमा कति पटक र कति दिन खाने भन्ने कुरा पर्चामा लेखिएअनुसार वा स्वास्थ्यकर्मीले भनेअनुसार मात्र गर्नुहोस्।",
      },
      {
        id: "item-2",
        plain:
          "सीबीसी (कम्प्लिट ब्लड काउन्ट) रगतको जाँच हो। यसले रगतमा रातो रक्तकोष, सेतो रक्तकोष र प्लेटलेट कति छन् भनेर हेर्छ।",
        doctorNote:
          "जाँचको नतिजाको अर्थ डाक्टर वा स्वास्थ्यकर्मीले मात्र बताउन सक्छन्। रिपोर्ट लिएर उहाँहरूलाई देखाउनुहोस्।",
      },
      {
        id: "item-3",
        plain:
          "आराम गर्नु र प्रशस्त पानी तथा तरल पदार्थ पिउनु भनेको शरीरलाई स्वस्थ हुन सघाउने सामान्य सल्लाह हो।",
        doctorNote:
          "कति आराम गर्ने वा कति पानी पिउने भन्ने कुरा अवस्था अनुसार फरक हुन सक्छ। स्वास्थ्यकर्मीसँग सोध्नुहोस्।",
      },
    ],
    disclaimer: DISCLAIMER.ne,
  },
  en: {
    summary:
      "This prescription lists one medicine, one blood test, and advice to rest and drink fluids.",
    items: [
      {
        id: "item-1",
        plain:
          "Paracetamol is a medicine commonly used to lower fever and ease mild pain. 500mg is the amount of medicine in one tablet.",
        doctorNote:
          "How many tablets, how often, and for how many days: follow exactly what is written on your prescription or what your health worker tells you.",
      },
      {
        id: "item-2",
        plain:
          "A CBC (Complete Blood Count) is a blood test. It checks how many red cells, white cells, and platelets are in your blood.",
        doctorNote:
          "Only a doctor or health worker can explain what your results mean. Take the report to them.",
      },
      {
        id: "item-3",
        plain:
          "Resting and drinking plenty of water and fluids is general advice to help your body recover.",
        doctorNote:
          "How much rest or fluid you need can differ from person to person. Ask a health worker.",
      },
    ],
    disclaimer: DISCLAIMER.en,
  },
};

// DEMO DATA ONLY. Phone numbers are placeholders and coordinates are approximate.
// Verify every entry with the facility before showing it to real users.
export const MOCK_FACILITIES: Facility[] = [
  {
    id: "fac-1",
    name: "Seti Provincial Hospital",
    district: "Kailali",
    phone: "+977-000-000001",
    emergency_24h: true,
    specialties: ["General medicine", "Emergency", "Pediatrics"],
    lat: 28.69,
    lng: 80.59,
  },
  {
    id: "fac-2",
    name: "Tikapur Hospital",
    district: "Kailali",
    phone: "+977-000-000002",
    emergency_24h: false,
    specialties: ["General medicine", "Maternity"],
    lat: 28.52,
    lng: 81.13,
  },
  {
    id: "fac-3",
    name: "Mahakali Provincial Hospital",
    district: "Kanchanpur",
    phone: "+977-000-000003",
    emergency_24h: true,
    specialties: ["General medicine", "Emergency", "Laboratory"],
    lat: 28.97,
    lng: 80.18,
  },
];