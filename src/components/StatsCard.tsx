import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  gradient?: boolean;
}

export const StatsCard = ({ title, value, subtitle, icon: Icon, gradient = false }: StatsCardProps) => {
  return (
    <Card className={`transition-all duration-300 hover:shadow-glow ${gradient ? 'bg-gradient-primary text-primary-foreground' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${gradient ? 'text-primary-foreground/80' : 'text-muted-foreground'}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${gradient ? 'text-primary-foreground' : ''}`}>
          {value}
        </div>
        {subtitle && (
          <p className={`text-xs ${gradient ? 'text-primary-foreground/80' : 'text-muted-foreground'} mt-1`}>
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};