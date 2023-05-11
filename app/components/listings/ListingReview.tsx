"use client";

import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button";
import StarRating from "@/app/components/StarRating";
import { Review, User } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";

interface ListingReviewProps {
  reviews: (Review & { user: User })[];
  listingId: string;
}

const ListingReview = ({ reviews, listingId }: ListingReviewProps) => {
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const totalRate = reviews
    .reduce((accumulator, review, _, { length }) => {
      return accumulator + (review.rate ?? 0) / length;
    }, 0)
    .toFixed(2);

  const onSubmit = () => {
    setIsLoading(true);

    axios
      .post("/api/reviews", {
        rate: rating,
        content: inputValue,
        listingId,
      })
      .then(() => {
        toast.success("Review created!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setInputValue("");
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="max-h-[324px] overflow-y-auto">
        <div className="flex gap-1 items-center mb-8">
          <span>
            <AiFillStar size={18} />
          </span>
          <span className="font-semidbold text-xl">{totalRate + "  ·  " + reviews.length + " reviews"}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 mb-8">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-b-[#f4f4f4] pb-4">
              <div className="flex gap-3 items-center mb-4">
                <div>
                  <Avatar src={review.user.image} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">{review.user.name}</span>
                  <span className="text-sm text-[#717171]">{format(new Date(review.createdAt), "MM/dd/yyyy")}</span>
                </div>
              </div>
              <div>
                <span className="line-clamp-4">{review.content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <StarRating value={rating} onChange={(r) => setRating(r)} />
      <div className="flex flex-col md:flex-row items-center gap-4 mt-2">
        <textarea
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className="
          resize-none
          peer
          w-full
          h-24
          p-4
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
      "
        />
        <div className="w-full md:w-[160px]">
          <Button label="Review" onClick={onSubmit} disabled={!inputValue || isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ListingReview;
