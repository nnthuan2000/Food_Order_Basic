import React, { useState, useEffect } from "react";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card/Card";

import { IMeal } from "../../models/Meal";

import classes from "./MealsAvailable.module.css";

const MealsAvailable = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-e9233-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      const loadedData = Object.keys(data).reduce<IMeal[]>((arr, key) => {
        arr.push({ id: key, ...data[key] });
        return arr;
      }, []);

      setMeals(loadedData);
      setIsLoading(false);
    };

    fetchMeals().catch((error: unknown) => {
      setError((error as Error).message);
    });
  }, []);

  let mealsContent = (
    <Card>
      <ul>
        {meals.map((meal) => (
          <MealItem key={meal.id} {...meal} />
        ))}
      </ul>
    </Card>
  );

  let classNames = classes.meals;

  if (isLoading) {
    classNames = classes["meals-loading"];
    mealsContent = <p>Loading some meals...</p>;
  }

  if (error) {
    classNames = classes["meals-error"];
    mealsContent = <p>{error}</p>;
  }

  return <section className={`${classNames}`}>{mealsContent}</section>;
};

export default MealsAvailable;
