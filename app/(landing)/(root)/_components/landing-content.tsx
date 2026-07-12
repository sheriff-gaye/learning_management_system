import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Joel",
    avatar: "J",
    title: "Software Engineer",
    description: "This is the best application I've ever used!"
  },
  {
    name: "Antonio",
    avatar: "A",
    title: "Designer",
    description: "I use this daily for generating new photos!"
  },
  {
    name: "Mark",
    avatar: "M",
    title: "Student",
    description:
      "This app has changed my life, cannot imagine working without it!"
  },
  {
    name: "Mary",
    avatar: "M",
    title: "CFO",
    description: "The best in class, definitely worth the premium subscription!"
  }
];

export const LandingContent = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 flex flex-col items-center gap-2 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Testimonials</h2>
        <p className="text-muted-foreground">What our users say</p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="flex flex-col gap-4 p-6 shadow-sm"
          >
            <div className="flex gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="flex-1 text-sm text-muted-foreground">
              &ldquo;{item.description}&rdquo;
            </p>
            <div className="flex items-center gap-x-3 border-t pt-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {item.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">
                  {item.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.title}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
