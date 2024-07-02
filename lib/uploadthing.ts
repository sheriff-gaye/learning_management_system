import { generateUploadButton, generateReactHelpers,generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton  = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
// export const  Uploader = generateUploadButton<OurFileRouter>();

export const { useUploadThing} =generateReactHelpers<OurFileRouter>();

 
 
