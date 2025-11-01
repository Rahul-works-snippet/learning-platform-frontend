import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const StudentReviews = ({ reviews, overallRating, ratingBreakdown }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [visibleReviews, setVisibleReviews] = useState(5);

  const filterOptions = [
    { value: 'all', label: 'All Reviews' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const filteredReviews = selectedFilter === 'all' 
    ? reviews 
    : reviews?.filter(review => review?.rating === parseInt(selectedFilter));

  const displayedReviews = filteredReviews?.slice(0, visibleReviews);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 5);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 mb-6">
        {/* Overall Rating Summary */}
        <div className="lg:w-1/3 mb-6 lg:mb-0">
          <h2 className="text-xl font-semibold text-foreground mb-4">Student Reviews</h2>
          
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
              <span className="text-3xl font-bold text-foreground">{overallRating}</span>
              <div className="flex items-center space-x-1">
                {renderStars(Math.floor(overallRating))}
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Based on {reviews?.length} reviews
            </p>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1]?.map((stars) => {
                const count = ratingBreakdown?.[stars] || 0;
                const percentage = reviews?.length > 0 ? (count / reviews?.length) * 100 : 0;
                
                return (
                  <div key={stars} className="flex items-center space-x-2 text-sm">
                    <span className="w-8 text-muted-foreground">{stars}</span>
                    <Icon name="Star" size={12} className="text-warning" />
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-warning h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-muted-foreground text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:w-2/3">
          {/* Filter Controls */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foreground">
              Reviews ({filteredReviews?.length})
            </h3>
            <div className="w-40">
              <Select
                options={filterOptions}
                value={selectedFilter}
                onChange={setSelectedFilter}
                placeholder="Filter reviews"
              />
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {displayedReviews?.map((review) => (
              <div key={review?.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-start space-x-3">
                  <Image
                    src={review?.student?.avatar}
                    alt={review?.student?.avatarAlt}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">{review?.student?.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            {renderStars(review?.rating)}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(review?.date)}
                          </span>
                        </div>
                      </div>
                      
                      {review?.isVerifiedPurchase && (
                        <span className="bg-success/10 text-success px-2 py-1 rounded text-xs font-medium flex-shrink-0">
                          <Icon name="CheckCircle" size={12} className="inline mr-1" />
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm mb-3">
                      {review?.comment}
                    </p>

                    {/* Review Actions */}
                    <div className="flex items-center space-x-4 text-sm">
                      <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
                        <Icon name="ThumbsUp" size={14} />
                        <span>Helpful ({review?.helpfulCount})</span>
                      </button>
                      
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        Report
                      </button>
                    </div>

                    {/* Instructor Reply */}
                    {review?.instructorReply && (
                      <div className="mt-4 p-3 bg-muted/30 rounded-md">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="MessageCircle" size={14} className="text-primary" />
                          <span className="text-sm font-medium text-foreground">Instructor Response</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review?.instructorReply}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleReviews < filteredReviews?.length && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                onClick={loadMoreReviews}
                iconName="ChevronDown"
                iconPosition="right"
              >
                Load More Reviews
              </Button>
            </div>
          )}

          {filteredReviews?.length === 0 && (
            <div className="text-center py-8">
              <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No reviews found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentReviews;