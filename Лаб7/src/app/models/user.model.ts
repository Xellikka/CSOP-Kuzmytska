export interface User {
  id: string; // унікальний id (uuid від API або login.uuid)
  name: {
    title: string;
    first: string;
    last: string;
  };
  dob: {
    date: string; // ISO
    age: number;
  };
  location: {
    city: string;
    state?: string;
    country?: string;
    postcode: string | number;
    street?: { number: number; name: string };
  };
  email: string;
  phone?: string;
  cell?: string;
  picture?: { large: string; medium: string; thumbnail: string };
  gender?: string;
  [key: string]: any;
}
