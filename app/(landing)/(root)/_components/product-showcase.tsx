import Image from "next/image";

const ProductShowCase = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 pb-20 text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">Boost Your Skill Set</h2>
      <p className="text-lg font-medium text-primary">
        A more effective way to learn
      </p>
      <p className="max-w-2xl text-muted-foreground">
        An intuitive, flexible platform for skill development. Whether you're
        enhancing your professional expertise or exploring new fields, get a
        personalized learning experience with real-time feedback that helps
        you grow with confidence.
      </p>
      <div className="relative mt-8 w-full max-w-5xl">
        <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
        <Image
          src="/product.png"
          alt="Product preview"
          width={1500}
          height={1500}
          className="rounded-xl border shadow-2xl"
        />
      </div>
    </div>
  );
};

export default ProductShowCase;
