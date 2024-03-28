import { Review } from "../../types/models";
import ProfilePng from "../../images/Profile.png";
import { Rating, RatingProps } from "@mui/material";
interface ReviewCardProps {
  review: Review;
}
const ReviewCard = ({ review }: ReviewCardProps) => {
  const ratingOptions: RatingProps = {
    value: review.rating,
    precision: 0.5,
    readOnly: true,
    size: "small",
  };
  return (
    <div className="reviewCard">
      <img src={ProfilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...ratingOptions} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
