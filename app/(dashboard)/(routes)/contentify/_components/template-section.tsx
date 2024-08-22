import { useEffect, useState } from "react";
import TemplateCard from "./template-card";
import templates from "./Templates";

export interface TEMPLATE {
  name: string,
  desc: string,
  icon: string,
  category: string,
  slug: string,
  aiPrompt: string,
  form?: FORM[],
}

export interface FORM {
  label: string,
  field: string,
  name: string,
  required?: boolean;
}

const TemplateSection = ({userSearchInput}:any) => {

    const [templateList,setTemplateList]=useState(templates);
   
    useEffect(()=>{

     if(userSearchInput){
        const filterData=templates.filter(item=>item.name.toLowerCase().includes(userSearchInput.toLowerCase()));
        setTemplateList(filterData);
     }
     else{
        setTemplateList(templates)
     }
   

    },[userSearchInput])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
      {templateList.map((item:TEMPLATE, index:number) => (
        <TemplateCard key={index} {...item} />
       
      ))}
    </div>
  );
};

export default TemplateSection;