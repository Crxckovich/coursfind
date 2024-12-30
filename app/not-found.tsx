import {Htag, P} from "@/components/Htag";

export default function NotFound() {
    return (
        <div className="container mx-auto py-10">
            <Htag tag='h1'>Ошибка 404</Htag>
            <P size='b' className="mt-4">Страница не найдена</P>
        </div>
    );
}

