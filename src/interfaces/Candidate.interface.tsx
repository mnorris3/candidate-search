// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
  avatar_url: string;
  name: string;
  login: string;
  location: string | null;
  email: string | null;
  company: string | null;
  bio: string | null;
}
