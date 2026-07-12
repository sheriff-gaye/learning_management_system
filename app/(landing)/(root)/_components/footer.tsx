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
    <footer className="w-full border-t bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-16 px-6 py-12 max-lg:flex-col">
        <div className="flex flex-col items-start">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="LMS Logo" width={40} height={40} />
            <span className="text-lg font-bold">EduCraft</span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Empower your career with our cutting-edge online courses. Learn
            the latest skills in technology, business, and more from industry
            experts.
          </p>
          <div className="mt-6 flex items-center gap-4 text-muted-foreground">
            <Facebook className="h-5 w-5 cursor-pointer transition-colors hover:text-primary" />
            <Twitter className="h-5 w-5 cursor-pointer transition-colors hover:text-primary" />
            <Instagram className="h-5 w-5 cursor-pointer transition-colors hover:text-primary" />
            <Linkedin className="h-5 w-5 cursor-pointer transition-colors hover:text-primary" />
          </div>
        </div>

        <div className="flex flex-1 flex-wrap justify-between gap-10">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li
                    key={link.name}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-6 py-6 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <Copyright className="h-4 w-4" />
          <p>© {new Date().getFullYear()} EduCraft. All rights reserved.</p>
        </div>
        <p className="cursor-pointer transition-colors hover:text-foreground">
          Terms & Conditions
        </p>
      </div>
    </footer>
  );
};

export default Footer;