// Pre-stored Aadhaar records for the hospital kiosk

export interface AadhaarRecord {
  aadhaar: string;
  name: string;
  sex: 'Male' | 'Female';
  age?: number;
  phone?: string;
  address?: string;
  bloodGroup?: string;
}

export const aadhaarRecords: AadhaarRecord[] = [
  {
    aadhaar: '123456789121',
    name: 'Rahul',
    sex: 'Male',
    age: 21,
    phone: '+91 9876543210',
    address: 'Mumbai, Maharashtra',
    bloodGroup: 'B+',
  },
  {
    aadhaar: '123456789122',
    name: 'Sanjeev',
    sex: 'Male',
    age: 22,
    phone: '+91 9876543211',
    address: 'Delhi',
    bloodGroup: 'A+',
  },
  {
    aadhaar: '123456789123',
    name: 'Siya',
    sex: 'Female',
    age: 25,
    phone: '+91 9876543212',
    address: 'Bangalore, Karnataka',
    bloodGroup: 'O+',
  },
  {
    aadhaar: '123456789124',
    name: 'Ishit',
    sex: 'Male',
    age: 28,
    phone: '+91 9876543213',
    address: 'Chennai, Tamil Nadu',
    bloodGroup: 'AB+',
  },
  {
    aadhaar: '123456789125',
    name: 'Prakhar',
    sex: 'Male',
    age: 30,
    phone: '+91 9876543214',
    address: 'Pune, Maharashtra',
    bloodGroup: 'B-',
  },
];

export const findAadhaarRecord = (aadhaarNumber: string): AadhaarRecord | null => {
  return aadhaarRecords.find((record) => record.aadhaar === aadhaarNumber) || null;
};

export const validateAadhaarFormat = (aadhaarNumber: string): boolean => {
  // Aadhaar must be exactly 12 digits
  return /^\d{12}$/.test(aadhaarNumber);
};
