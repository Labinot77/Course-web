export interface CourseProps {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  isFree: boolean;
  category: string;
  price: number;
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
    updatedAt: string;
    createdAt: string;
  }[];
}