export const AMENITIES = [
    'Wi-Fi/Internet',
    'Water Bills',
    'Electricity Bills',
    'Parking',
    'Pets Allowed',
    'Visitors Allowed',
    'Air-Conditioning',
    'Freezer/Refrigeration'
] as const;
export type AMENITY = typeof AMENITIES[number];

export const GENDER_PREFERENCES = [
    "Female Only",
    "Male Only",
    "Both"
] as const;
export type GENDER_PREFERENCE = typeof GENDER_PREFERENCES[number]

export const DORM_TYPES = [
    'Private',
    'Shared',
] as const;
export type DORM_TYPE = typeof DORM_TYPES[number];

export const USER_ROLES = [
    'Student',
    'Owner'
] as const;
export type USER_ROLE = typeof USER_ROLES[number];