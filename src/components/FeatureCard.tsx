import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="flex items-center space-x-4 p-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700/50 flex items-center justify-center">
          <Icon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
