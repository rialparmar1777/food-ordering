export async function fetchRandomMeals(count = 5) {
    try {
      const mealPromises = Array.from({ length: count }, () =>
        fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) =>
          res.json()
        )
      );
  
      const mealResults = await Promise.all(mealPromises);
      return mealResults
        .map((data) => data.meals?.[0])
        .filter(Boolean) // Remove undefined results
        .map((meal) => ({
          name: meal.strMeal,
          image: meal.strMealThumb,
        }));
    } catch (error) {
      console.error("Error fetching meals:", error);
      return [];
    }
  }
  