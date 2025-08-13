import { Button } from "@/components/ui/button";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  isReactive?: boolean;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
  disabled?: boolean 
  children: React.ReactNode;
}

export const DefaultButton = ({ onClick, size = "default",type = "button", className,variant, isReactive, disabled,  children }: Props) => {
  return (
  <Button
    size={size}
    onClick={onClick}
    variant={variant}
    disabled={disabled}
    className={`${isReactive && "transition-all active:scale-95 duration-100"} ${className}`}
  >
    {children}
  </Button>
  )
};
