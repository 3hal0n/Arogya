export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National ID Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Saman",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Shanthi",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Kamal",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Pamal",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Pajeet",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Bimal",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Kanthi",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Nimali",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Namal",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
}; 