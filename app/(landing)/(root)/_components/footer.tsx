import { Copyright, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = [
  {
    title: "Courses",
    links: [
      { name: "Web Development", link: "/" },
      { name: "Data Science", link: "/" },
      { name: "Machine Learning", link: "/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", link: "/" },
      { name: "FAQs", link: "/" },
      { name: "Contact Support", link: "/" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { name: "support@lmsplatform.com", link: "mailto:support@lmsplatform.com" },
      { name: "+1234567890", link: "tel:+1234567890" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className='w-full shadow-xl bg-gray-800  rounded-lg text-white'>
      <div className='flex justify-between items-start gap-20 flex-wrap max-lg:flex-col max-w-screen-xl mx-auto px-4 py-8'>
        <div className='flex flex-col items-start'>
          <a href='/'>
            <img
              src="/logo.png"
              alt='LMS Logo'
              width={50}
              height={50}
              className='m-0'
            />
          </a>
          <p className='mt-6 text-base leading-7 font-montserrat sm:max-w-sm'>
            Empower your career with our cutting-edge online courses. Learn the latest skills in technology, business, and more from industry experts.
          </p>
          <div className='flex items-center gap-5 mt-8'>
            <Facebook className='w-6 h-6 cursor-pointer' />
            <Twitter className='w-6 h-6 cursor-pointer' />
            <Instagram className='w-6 h-6 cursor-pointer' />
            <Linkedin className='w-6 h-6 cursor-pointer' />
          </div>
        </div>

        <div className='flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap'>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className='font-montserrat text-2xl leading-normal font-medium mb-6'>
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    className='mt-3 font-montserrat text-base leading-normal'
                    key={link.name}
                  >
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-between mt-4 max-sm:flex-col max-sm:items-center max-w-screen-xl mx-auto px-4 py-4'>
        <div className='flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer'>
          <Copyright />
          <p>© {new Date().getFullYear()} LMS Platform. All rights reserved.</p>
        </div>
        <p className='font-montserrat cursor-pointer'>Terms & Conditions</p>
      </div>
    </footer>
  );
};

export default Footer;