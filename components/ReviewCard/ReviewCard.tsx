'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Htag, P, Rating } from "@/components/Htag";
import { Separator } from "@/components/ui/separator";
import { CircleUserRound, Dot, MessagesSquare } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ReviewCardProps } from "./ReviewCard.props";
import { ReviewForm } from "@/components/ReviewForm/ReviewForm";
import { Review } from "@/lib/types";
import { Button } from "@/components/ui/button/button";
import {declension} from "@/helpers/helpers";

export function ReviewCard({ courseId, initialReviews = [], pageSize = 5 }: ReviewCardProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setDisplayedReviews(reviews.slice(0, page * pageSize));
  }, [reviews, page, pageSize]);

  const handleSubmitSuccess = (newReview: Review) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Card className='bg-card/50 flex flex-col'>
      <CardHeader>
        <div className="px-10 py-8">
          <Htag tag={'h3'} className='flex items-center flex-wrap gap-3'>
            <MessagesSquare />
            {reviews.length} {declension(reviews.length, ['Отзыв', 'Отзыва', 'Отзывы'])}
          </Htag>
        </div>
      </CardHeader>

      <Separator />

      <ScrollArea className="h-[400px]">
        <CardContent className="px-10 py-8 flex flex-col gap-y-10">
          {displayedReviews.length > 0 ? (
            displayedReviews.map((review) => (
              <div key={review.id} className="flex flex-col gap-y-5">
                <div className="flex gap-3 flex-wrap justify-between">
                  <div className="flex gap-3 items-center flex-wrap">
                    <CircleUserRound className='stroke-accent'/>
                    <P size={'b'} className='text-primary/90'>{review.author_name}</P>
                    <Dot />
                    <p className='text-2xl font-bold font-halvar'>{review.title}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                    <P size={'s'} className='text-muted-foreground'>
                      {format(new Date(review.created_at), 'dd MMMM yyyy', { locale: ru })}
                    </P>
                    <div className="flex gap-3 items-center">
                      <Rating value={review.rating} disabled/>
                    </div>
                  </div>
                </div>
                <P size='s' className='text-primary/90'>{review.content}</P>
              </div>
            ))
          ) : (
            <P size='s' className='text-muted-foreground text-center'>Пока нет отзывов</P>
          )}
          {displayedReviews.length < reviews.length && (
            <Button onClick={loadMore} variant="outline" className="mt-4">
              Загрузить еще
            </Button>
          )}
        </CardContent>
      </ScrollArea>

      <Separator />

      <CardFooter className="flex items-start flex-col gap-y-5 px-10 py-8">
        <ReviewForm courseId={courseId} onSubmitSuccess={handleSubmitSuccess} />
      </CardFooter>
    </Card>
  );
}

