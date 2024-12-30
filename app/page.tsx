import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DoorOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import {P} from "@/components/Htag";

export default async function Home() {
  const { data: categoryData } = await supabase
    .from('categories')
    .select('name, slug_type');

  return (
    <main className="container mx-auto">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 w-full py-10">
        {categoryData ? (
          categoryData.map((category, index) => (
              <Link key={index} href={category.slug_type}>
                  <Card className='p-10'>
                      <CardHeader className='flex flex-col gap-y-1'>
                        <CardTitle>
                            <h2 className='font-halvar text-[38px]'>{category.name}</h2>
                            </CardTitle>
                        <CardDescription>
                            <P>
                                Какой-то текст
                            </P>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className='relative flex items-end justify-between'>
                          <Button>
                            Открыть
                            <DoorOpen />
                          </Button>
                        <GraduationCap className='opacity-70' size={228} />
                      </CardContent>
                  </Card>
              </Link>
          ))
        ) : (
          <p>Нет доступных категорий.</p>
        )}
      </div>
    </main>
  );
}