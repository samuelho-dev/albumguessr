import { Session } from 'next-auth';

interface MyUser {
  id: string | null;
  name: string | null;
  email: string | null;
  picture: string | null;
  image: string | null;
  accessToken: string | null;
}

export interface MySession extends Session {
  user?: MyUser;
  expires: string;
}

interface Image {
  height: number | null;
  url: string;
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
  artists: Artist[];
  images?: Image[];
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
  images?: Image[];
  followers?: {
    total: number;
  };
  genres?: string[];
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  duration_ms: number;
  preview_url: string | null;
}
