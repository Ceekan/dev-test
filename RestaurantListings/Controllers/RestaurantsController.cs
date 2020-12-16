using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RestaurantListings.Data;
using RestaurantListings.Data.Converters;
using RestaurantListings.Data.Entities;

namespace RestaurantListings.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class RestaurantsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public RestaurantsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        /// <summary>
        /// Returns all restaurants.
        /// </summary>
        [HttpGet]
        public IEnumerable<Restaurant> Get()
        {
           return _context.Restaurants.OrderBy(x => x.Id).ToList();
        }

        /// <summary>
        /// Returns a restaurant with user rating.
        /// </summary>
        [HttpPost]
        [Route("/api/restaurants/item", Name = "RestaurantItem")]
        public RatingResponseCarrier GetRestaurantItem([FromBody] RatingRequestCarrier requestCarrier)
        {
            int restaurantId = Int32.Parse(requestCarrier.RestaurantId);
            var user = requestCarrier.UserId;

            var restaurant = _context.Restaurants.Where(x => x.Id == restaurantId).FirstOrDefault();

            IEnumerable<string> userRatingsToFetch = restaurant.UserRating.Select(x => x);
			var userRatingToFetchAsHashSet = new HashSet<string>(userRatingsToFetch);  

            bool userRatingExist = false;
            foreach (var item in restaurant.UserRating)
            {
                if (userRatingToFetchAsHashSet.Contains(item))
                {
                    userRatingExist = true;
                }
            }
            
            return restaurant.ToCarrier(user, userRatingExist);
        }

        /// <summary>
        /// Save user rating.
        /// </summary>
        [HttpPost]
        [Route("/api/restaurants/rating", Name = "RestaurantRating")]
        public async Task<bool> AddUserRating([FromBody] Rating rating)
        {
            int restaurantId = Int32.Parse(rating.RestaurantId);

            var restaurant = _context.Restaurants.Where(x => x.Id == restaurantId).FirstOrDefault();
            restaurant.UserRating.Add(rating.UserId);
            restaurant.StarRating = Int32.Parse(rating.StarRating);

            await _context.SaveChangesAsync().ConfigureAwait(false);

            return true;
        }

        /// <summary>
        /// Returns all tags.
        /// </summary>
        [HttpGet]
        [Route("/api/restaurants/tags", Name = "Tags")]
        public IEnumerable<string> GetTags()
        {
           var restuarants = _context.Restaurants.OrderBy(x => x.Id).ToList();

            List<string> tags = new List<string>();
			for (int i = 0; i < restuarants.Count; i++)
			{
				var currentRestuarant = restuarants[i];

                if (currentRestuarant.Tags.Count == 0)
                    continue;

                List<string> currentTags = currentRestuarant.Tags.Select(x => x).ToList();

                foreach (var item in currentTags)
				{
					if (!tags.Contains(item))
					{
					    tags.Add(item);
					}
				}
			}

			return tags.OrderBy(tag => tag).ToList();
        }
    }
}
