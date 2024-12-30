import { Htag } from "@/components/Htag";
import { P } from "@/components/P/P";
import { type VacancyStatistics } from "@/lib/types";
import { BriefcaseBusiness, Crown } from 'lucide-react';
import {declension, priceRu} from "@/helpers/helpers";

interface VacancyStatisticsSectionProps {
  vacancyStatistics: VacancyStatistics;
}

export function VacancyStatisticsSection({ vacancyStatistics }: VacancyStatisticsSectionProps) {
  const vacancyWord = declension(vacancyStatistics?.total_count || 0, [
    'вакансия',
    'вакансии',
    'вакансий'
  ]);

  return (
    <div className="flex flex-col gap-5">
      <Htag tag="h2">Вакансии на <span className="text-red-500">HH.RU</span></Htag>
      <div className="grid xl:grid-cols-4 grid-cols-1 xl:gap-x-5 gap-y-5">
        <div className="py-5 flex flex-col border rounded-md items-center w-full">
          <P size='b'>{`Всего ${vacancyWord}`}</P>
          <div className="flex gap-2 items-center">
            <Htag tag="h2" className='text-accent'>{vacancyStatistics?.total_count}</Htag>
            <BriefcaseBusiness size={32} className='stroke-accent' />
          </div>
        </div>
        <div className="col-span-3 grid xl:grid-cols-3 grid-cols-1 border rounded-md xl:gap-x-10 gap-y-10 py-5 w-full">
          <div className="flex flex-col items-center">
            <P size='b'>Junior</P>
            <Htag tag="h2" className='text-blue-300'>{priceRu(vacancyStatistics?.junior_salary || 0)}</Htag>
          </div>
          <div className="flex flex-col items-center">
            <P size='b'>Middle</P>
            <Htag tag="h2" className='text-blue-400'>{priceRu(vacancyStatistics?.middle_salary || 0)}</Htag>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex gap-x-2">
              <P size='b'>Senior</P>
              <Crown className='stroke-yellow-500'/>
            </div>
            <Htag tag="h2" className='text-accent'>{priceRu(vacancyStatistics?.senior_salary || 0)}</Htag>
          </div>
        </div>
      </div>
    </div>
  );
}

