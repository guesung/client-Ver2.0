export interface Recommendation {
  code: string;
  message: string;
  data: {
    recommendation: RecommendationType;
  };
}

export interface RecommendationType {
  id: number;
  user: {
    id: number;
    name: string;
  };
  hobbyType: {
    id: number;
    name: string;
    description: string;
    threeDimensionImageUrl: string;
    imageUrl: string;
  };
  hobbies: HobbyType[];
  fitHobbyTypes: FitHobbyType[];
}

export interface HobbyType {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}
export interface FitHobbyType {
  id: number;
  name: string;
  description: string;
  thireeDimensionImageUrl: string;
  imageUrl: string;
}
