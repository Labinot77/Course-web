export interface CourseProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  // isFree: boolean;
  // price?: number;
  updatedAt: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  savedBy: {
    id: string;
    name: string;
    email: string;
    image: string;
  }[];
  episodes: {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    duration: number;
    updatedAt?: string;
    createdAt?: string;
  }[];
}