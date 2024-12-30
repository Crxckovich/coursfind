import { Htag } from "@/components/Htag";
import { P } from "@/components/P/P";
import { ProfessionalAdvantage } from "@/lib/types";
import {CircleCheck} from 'lucide-react';

interface ProfessionalAdvantagesSectionProps {
  professionalAdvantages: ProfessionalAdvantage[];
}

export function ProfessionalAdvantagesSection({ professionalAdvantages }: ProfessionalAdvantagesSectionProps) {
  return (
    <div className="flex flex-col gap-8">
      <Htag tag="h2">Преимущества</Htag>
      {professionalAdvantages?.map((advantage) => (
        <div key={advantage.id} className="flex gap-3">
          <div>
            <CircleCheck className='stroke-green-500'/>
          </div>
          <div className="flex flex-col gap-3">
            <Htag tag='h3'>{advantage.title}</Htag>
            <P size='s'>{advantage.description}</P>
          </div>
        </div>
      ))}
    </div>
  );
}

