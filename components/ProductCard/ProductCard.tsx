import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Rating } from "@/components/Rating/Rating";
import { P } from "@/components/P/P";
import { Crown, CirclePlus, CircleMinus } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Htag } from "@/components/Htag";
import { getCourseImageUrl } from "@/lib/api";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ReviewCard } from "@/components/ReviewCard/ReviewCard";
import {CourseWithDetails} from "@/lib/types";
import { motion } from "framer-motion";
import {declension, priceRu} from "@/helpers/helpers";
import cn from "classnames";

export const ProductCard = ({
  id,
  name,
  description,
  price,
  credit_price,
  discount_percentage,
  avatar_url,
  header_image_url,
  average_rating,
  duration_months,
  tags,
  pros,
  cons,
  difficulty_level,
  completion_document,
  reviews,
  school,
}: CourseWithDetails) => {
  const discountAmount = (price * discount_percentage) / 100;
  const finalPrice = price - discountAmount;
  const avatarUrl = avatar_url ? getCourseImageUrl(avatar_url) : "/placeholder.svg?height=96&width=96";
  const headerUrl = header_image_url ? getCourseImageUrl(header_image_url) : "/placeholder.svg?height=200&width=800";

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'начальный':
        return 'text-green-500';
      case 'профессиональный':
        return 'text-[#3B82F6]';
      case 'продвинутый':
        return 'text-red-500';
      default:
        return 'text-primary';
    }
  };

  return (
    <Collapsible>
      <Card className="flex flex-col gap-y-8">
        <CardHeader className="relative p-0">
          <div className="relative rounded-lg lg:h-[200px] h-[150px] rounded-b-lg w-full overflow-hidden">
            <Image
                src={headerUrl}
                alt={`${name} header`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
            />
          </div>
          <div className="absolute -bottom-12 left-8 flex items-start gap-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden border-4 border-card rounded-xl">
              <Link href={school?.url || '#'} target="_blank" className="hover:opacity-90 transition-opacity">
                <Image
                    src={avatarUrl}
                    alt={name}
                    fill
                    sizes="96px"
                    className="object-cover"
                />
              </Link>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex w-full flex-col gap-3 px-10 py-8">
            <div className="flex flex-wrap justify-between w-full gap-x-2 gap-y-5">
              <div className="flex flex-col lg:gap-y-3 gap-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Htag tag="h3" className="text-xl font-bold font-halvar">
                    {name}
                  </Htag>
                  <Crown className="h-5 w-5 text-yellow-500"/>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                      <Badge key={tag.id} variant="secondary">
                        {tag.name}
                      </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-8">
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-3">
                    <Htag tag="h3" className="font-bold font-halvar text-xl">
                      {priceRu(finalPrice)}
                    </Htag>
                    {discount_percentage > 0 && (
                        <Badge variant="green">
                          -{priceRu(discountAmount)}
                        </Badge>
                    )}
                  </div>
                  <P size="s" className="text-muted-foreground">Цена</P>
                </div>
                <div className="flex flex-col">
                  <Htag tag="h3" className="flex items-end gap-1 font-bold font-halvar text-xl">
                    {priceRu(credit_price)}
                    <span>
                      <P size="s" className="font-normal">/ мес</P>
                    </span>
                  </Htag>
                  <P size="s" className="text-muted-foreground">В кредит</P>
                </div>
                <div className="flex flex-col gap-y-0.5 mt-1">
                  <Rating value={average_rating} showcase disabled/>
                  <div className="flex items-end gap-2">
                    <P size="s">Оценка</P>
                    <p className="text-xl font-bold font-halvar">
                      {average_rating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator/>

          <div className="flex flex-col gap-8 px-10 pt-10">
            <P size="s" className="text-primary/90">{description}</P>

            <div className="flex flex-wrap gap-y-8 justify-between">
              <div className="flex flex-col gap-y-2">
                {pros.map((pro, index) => (
                    <div key={index} className="flex gap-2">
                      <CirclePlus className="h-5 w-5 shrink-0 text-green-500"/>
                      <P>{pro}</P>
                    </div>
                ))}
                {cons.map((con, index) => (
                    <div key={index} className="flex gap-2">
                      <CircleMinus className="h-5 w-5 shrink-0 text-red-500"/>
                      <P>{con}</P>
                    </div>
                ))}
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col lg:flex-row justify-between gap-x-10">
                  <P className="text-sm text-primary/90">Школа:</P>
                  <div className="flex items-center gap-2">
                    <Link
                        href={school?.url || '#'}
                        target="_blank"
                        className="font-bold underline underline-offset-2 hover:text-primary/70 transition-colors"
                    >
                      {school?.name || 'Неизвестная школа'}
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-x-10">
                  <P className="text-sm text-primary/90">Документ от окончании:</P>
                  <P className="font-bold text-amber-500">{completion_document.name}</P>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-x-10">
                  <P className="text-sm text-primary/90">Длительность:</P>
                  <P className="font-bold">{duration_months} {declension(duration_months, ['Месяц', 'Месяца', 'Месяцев'])}</P>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-x-10">
                  <P className="text-sm text-primary/90">Сложность:</P>
                  <P className={cn("font-bold", getDifficultyColor(difficulty_level.name))}>
                    {difficulty_level.name}
                  </P>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <Separator orientation="horizontal"/>

        <CardFooter className="px-10 pb-10">
          <div className="flex flex-wrap gap-3">
            <Link href="#">
              <Button>Узнать подробнее</Button>
            </Link>
            <CollapsibleTrigger asChild>
              <Button variant="outline">Читать отзывы</Button>
            </CollapsibleTrigger>
          </div>
        </CardFooter>
      </Card>
      <CollapsibleContent>
        <motion.div
            initial={{opacity: 0, y: -60}}
            whileInView={{opacity: 1, y: 5}}
        >
          <ReviewCard courseId={id} initialReviews={reviews}/>
        </motion.div>
      </CollapsibleContent>
    </Collapsible>
  );
};

