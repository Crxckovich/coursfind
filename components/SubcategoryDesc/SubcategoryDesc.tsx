import { type SubcategoryDescProps } from "./SubcategoryDesc.props";
import { P } from "@/components/P/P";

export function SubcategoryDesc({ descriptions }: SubcategoryDescProps) {
  if (!descriptions || descriptions.length === 0) {
    return null;
  }

  return (
    <div>
      {descriptions.map((desc) => (
        <P key={desc.id} size="s" className="text-primary/90">
          {desc.description}
        </P>
      ))}
    </div>
  );
}

