import Image from "next/image";
import { TEMPLATE } from "./template-section";
import Link from "next/link";

const TemplateCard = (item: TEMPLATE) => {
  return (
    <Link href={`/contentify/${item.slug}`}>
      <div className="p-5 shadow-md rounded-md border  bg-white flex  flex-col  gap-3  cursor-pointer hover:scale-105 transition-all">
        <Image alt="Icon" src={item.icon} width={50} height={50} />
        <h2 className="font-medium text-lg">{item.name}</h2>
        <p className="text-gray-500 line-clamp-3">{item.desc}</p>
      </div>
    </Link>
  );
};

export default TemplateCard;
