export interface RatingResponseCarrier {
	restaurantId: number;
	userId: string;
	name: string;
  	photoUri: string | null;
  	userRatingExist: boolean;
}