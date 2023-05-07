import clsx from "clsx";
import React, { useState } from "react";

interface StarRatingProps {
  defaultValue?: number;
  value?: number;
  onChange?: (rate: number) => void;
}

const StarRating = ({ defaultValue, value, onChange }: StarRatingProps) => {
  const [rating, setRating] = useState((value || defaultValue) ?? 0);
  const [hover, setHover] = useState((value || defaultValue) ?? 0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={clsx("group text-xl", index <= (hover || rating) ? "text-[#F5DE0B]" : "text-[#717171]")}
            onClick={() => {
              setRating(index);
              onChange?.(index);
            }}
            onMouseEnter={() => {
              setHover(index);
            }}
            onMouseLeave={() => {
              setHover(rating);
            }}
          >
            &#9733;{" "}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
