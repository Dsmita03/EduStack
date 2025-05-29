import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);
  const rating = Math.round(calculateRating(course)); // round rating to int for stars display
  const discountedPrice = (course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2);

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="flex flex-col gap-2 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all duration-300"
    >
      <div className="overflow-hidden rounded-md">
        <img
          className="w-full object-cover transition-transform duration-300 hover:scale-105"
          src={course.courseThumbnail}
          alt={course.courseTitle}
          loading="lazy"
        />
      </div>

      <div className="p-3 text-left flex flex-col gap-1">
        <h3 className="text-base font-semibold line-clamp-2">{course.courseTitle}</h3>
        <p className="text-gray-500 text-sm">{course.educator.name}</p>

        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < rating ? assets.star : assets.star_blank}
                alt={index < rating ? 'Filled star' : 'Empty star'}
                className="w-4 h-4"
              />
            ))}
          </div>
          <p className="text-gray-600 text-sm">{rating.toFixed(1)}</p>
          <p className="text-gray-400 text-sm">({course.courseRatings.length})</p>
        </div>

        <p className="text-base font-semibold text-gray-900 mt-1">
          {currency}
          <span>{discountedPrice}</span>{' '}
          {course.discount > 0 && (
            <span className="text-gray-400 line-through text-sm ml-2">
              {currency}
              {course.coursePrice.toFixed(2)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
