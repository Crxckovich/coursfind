'use client';

import { useForm, Controller } from 'react-hook-form';
import { P } from "@/components/P/P";
import { Rating } from "@/components/Rating/Rating";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button/button";
import { MessageSquareText } from 'lucide-react';
import { toast } from "sonner";
import { ReviewFormProps, FormData } from "./ReviewForm.props";

export function ReviewForm({ courseId, onSubmitSuccess }: ReviewFormProps) {
    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
        defaultValues: {
            authorName: '',
            title: '',
            content: '',
            rating: 0
        }
    });

    const onSubmit = async (data: FormData) => {
        try {
            console.log('Отправленные данные:', {...data, courseId});
            // Здесь должна быть реальная отправка данных на сервер
            // и валидация на стороне сервера
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success('Отзыв успешно отправлен на модерацию');

            const newReview = {
                id: Date.now().toString(),
                course_id: courseId,
                author_name: data.authorName,
                title: data.title,
                content: data.content,
                rating: data.rating,
                created_at: new Date().toISOString(),
                is_moderated: false
            };

            onSubmitSuccess(newReview);
            reset();
        } catch (error) {
            toast.error('Ошибка при отправке отзыва');
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-5">
            <div className="flex gap-4">
                <P size='b'>Ваша оценка:</P>
                <Controller
                    name="rating"
                    control={control}
                    rules={{ required: 'Оценка обязательна', min: { value: 1, message: 'Минимальная оценка - 1 звезда' } }}
                    render={({ field }) => (
                        <Rating
                            value={field.value}
                            onChange={(newValue) => field.onChange(newValue)}
                        />
                    )}
                />
            </div>
            {errors.rating && <span className="text-red-500">{errors.rating.message}</span>}
            <div className="flex-col flex gap-3">
                <Controller
                    name="authorName"
                    control={control}
                    rules={{ required: 'Имя обязательно' }}
                    render={({ field }) => (
                        <Input {...field} placeholder='Имя...' />
                    )}
                />
                {errors.authorName && <span className="font-raleway text-md text-red-500">{errors.authorName.message}</span>}
                <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'Заголовок обязателен' }}
                    render={({ field }) => (
                        <Input {...field} placeholder='Заголовок...' />
                    )}
                />
                {errors.title && <span className="font-raleway text-md text-red-500">{errors.title.message}</span>}
                <Controller
                    name="content"
                    control={control}
                    rules={{ required: 'Текст отзыва обязателен' }}
                    render={({ field }) => (
                        <Textarea {...field} placeholder='Текст отзыва...' />
                    )}
                />
                {errors.content && <span className="font-raleway text-md text-red-500">{errors.content.message}</span>}
            </div>
            <div className="flex flex-wrap gap-3 items-center">
                <Button type="submit" variant='default' disabled={isSubmitting}>
                    {isSubmitting ? 'Публикация...' : 'Опубликовать'}
                    <MessageSquareText/>
                </Button>
                <p className='text-muted-foreground text-sm font-raleway'>
                    * Перед публикацией отзыв пройдет предварительную модерацию и проверку
                </p>
            </div>
        </form>
    );
}

