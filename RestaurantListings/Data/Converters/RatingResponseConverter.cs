using RestaurantListings.Data.Entities;

namespace RestaurantListings.Data.Converters
{
	public static class RatingResponseConverter
	{
		public static RatingResponseCarrier ToCarrier(this Restaurant restaurant, string userId, bool userRatingExist)
		{
			return new RatingResponseCarrier
			{
				RestaurantId = restaurant.Id,
                UserId = userId,
                Name = restaurant.Name,
                PhotoUri = restaurant.PhotoUri,
                UserRatingExist = userRatingExist
			};
		}
	}
}