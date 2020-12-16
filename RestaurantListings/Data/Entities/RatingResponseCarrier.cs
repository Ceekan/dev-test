namespace RestaurantListings.Data.Entities
{
	public class RatingResponseCarrier
	{
		public int RestaurantId { get; set; }

		public string UserId { get; set; }

        public string Name { get; set; }

        public string PhotoUri { get; set; }

		public bool UserRatingExist { get; set; }
	}
}
