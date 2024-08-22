"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const firstSlice = testimonials.slice(0, 3);
  const secondSlice = testimonials.slice(3, 6);
  const thirdSlice = testimonials.slice(6, 9);

  return (
    <div className="px-10 py-[8.6rem]">
      <div className="flex justify-center flex-col py-[3rem]">
        <h2 className="text-center text-4xl  font-extrabold mb-3">
          Testimonials
        </h2>
        <p className="text-center">what our users say</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="shadow-md   bg-gradient-to-r bg-gray-800 text-white"
          >
            {" "}
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-3 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
