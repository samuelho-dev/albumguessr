import { DefaultSession } from 'next-auth';

interface MyUser {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  image?: string | null;
  accessToken?: string | null;
}

export interface Session extends DefaultSession {
  user?: MyUser & DefaultSession['user'];
  expires: string;
}

interface Image {
  height: number | null;
  url: string | null;
  width: number | null;
}

export interface SearchResults {
  tracks?: {
    items: Track[];
  };
}

export interface Album {
  id: string;
  name: string;
  artists: [Artist];
  images?: [Image];
  album_type?: string;
  release_date?: string;
  tracks?: {
    total: number;
    items: Track[];
  };
}

export interface Artist {
  id: string;
  name: string;
  images?: [Image];
  followers?: {
    total: number;
  };
  genres?: [string];
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: [Artist];
  duration_ms: number;
  preview_url: string;
}
