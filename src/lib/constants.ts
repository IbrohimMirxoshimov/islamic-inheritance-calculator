export const HEIR_TYPES = [
  'father',
  'mother',
  'husband',
  'wife',
  'son',
  'daughter',
  'grandfather',
  'grandmother',
  'brother',
  'sister',
  'nephew',
  'niece',
  'uncle',
  'aunt',
] as const;


// Define gender mapping for heir types
export const HEIR_GENDER_MAP = {
  father: 'male',
  mother: 'female',
  husband: 'male',
  wife: 'female',
  son: 'male',
  daughter: 'female',
  grandfather: 'male',
  grandmother: 'female',
  brother: 'male',
  sister: 'female',
  nephew: 'male',
  niece: 'female',
  uncle: 'male',
  aunt: 'female',
} as const;
