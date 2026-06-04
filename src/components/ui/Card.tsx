import { cn } from '../../utils/cn';

interface Props {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className, hover, onClick }: Props) {
  return (
    <div
      className={cn(
        'glass-card p-6',
        hover && 'glass-card-hover cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
