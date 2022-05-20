import { useEffect, useState } from 'react';
import superagent from 'superagent';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    superagent
      .get('https://http-hook-7dba9-default-rtdb.europe-west1.firebasedatabase.app/meals.json')
      .end((err, res) => {
        if (err) {
          setError('Something went wrong');
          setIsLoading(false);
          return;
        }

        const fetchedMeals = [];
        for (const key in res.body) {
          const mealData = res.body[key];
          fetchedMeals.push({
            id: key,
            name: mealData.name,
            description: mealData.description,
            price: mealData.price,
          });
        }

        setMeals(fetchedMeals);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.loader}>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p className={classes.error}>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map(meal => 
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  );

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;