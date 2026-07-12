import { BrainCircuit, Compass, LineChart, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Driven Modules",
    description:
      "Course content that adapts to how you learn, powered by AI that understands your pace and goals."
  },
  {
    icon: Compass,
    title: "Personalized Paths",
    description:
      "Follow a learning path tailored to your skill level, built from your interests and progress."
  },
  {
    icon: LineChart,
    title: "Real-Time Tracking",
    description:
      "Watch your progress update live, with clear milestones so you always know what's next."
  },
  {
    icon: ShieldCheck,
    title: "Trusted by Learners",
    description:
      "A secure, reliable platform built to support your learning journey from day one to mastery."
  }
];

const Features = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-2xl border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
