import Image from "next/image";

const ProductShowCase = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center   rounded  px-10">
      <div>
        <h2 className="text-3xl font-bold  mt-4">Boost Your Skill Set</h2>
        <h3 className="text-xl  mb-4">A More Effective Way to Learn</h3>
      </div>
      <p className=" max-w-l px-[8rem] text-xl ">
        Our Learning Management System (LMS) is designed to empower learners by
        providing an intuitive, flexible, and engaging platform for skill
        development. Whether you're looking to enhance your professional
        expertise or explore new fields, our LMS offers a personalized learning
        experience tailored to your goals. With a wide range of courses,
        interactive modules, and real-time feedback, you'll find a more
        effective way to learn and grow. Dive into our comprehensive resources
        and take the next step in your educational journey with confidence.
      </p>
      <div className="relative w-full max-w-6xl  p-7">
        <Image
          src="/product.png"
          alt="product"
          width={1500}
          height={1500}
          className="rounded-lg border shadow-md"
        />
      </div>
    </div>
  );
};

export default ProductShowCase;
