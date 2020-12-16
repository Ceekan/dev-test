namespace RestaurantListings.Data.Entities
{
    public class Rating
    {        
        public string RestaurantId { get; set; }

        public string UserId { get; set; }

        public string StarRating { get; set; }
    }
}