import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from '@/components/course-progress';

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
};

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group h-full overflow-hidden rounded-xl border bg-card p-3 transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <Image
            fill
            className="object-cover transition group-hover:scale-105"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-3">
          <div className="text-base font-medium transition line-clamp-2 group-hover:text-primary">
            {title}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-xs">
            <div className="flex items-center gap-x-1 text-muted-foreground">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-sm font-medium">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

CourseCard.Skeleton = function CourseCardSkeleton() {
  return (
    <div className="space-y-4 p-3 border rounded-xl animate-pulse h-full">
      <Skeleton className="relative w-full aspect-video rounded-lg" />
      <Skeleton className="h-6 rounded-md" />
      <Skeleton className="h-4 rounded-md" />
      <Skeleton className="h-4 rounded-md w-1/2" />
    </div>
  );
};