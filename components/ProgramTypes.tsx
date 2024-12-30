import { Button } from "@/components/ui/button/button";
import { ProgramType } from "@/lib/types";

interface ProgramTypesProps {
  programTypes: ProgramType[];
}

export function ProgramTypes({ programTypes }: ProgramTypesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {programTypes?.map((program) => (
        <Button key={program.id} variant="secondary">
          {program.name}
        </Button>
      ))}
    </div>
  );
}

