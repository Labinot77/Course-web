import { Button } from "@/components/ui/button";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  isReactive?: boolean;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

export const DefaultButton = ({ onClick, size = "default",type = "button", className, isReactive, children }: Props) => {
  return (
  <Button
    size={size}
    onClick={onClick}
    className={`${isReactive && "transition-all active:scale-95 duration-100"} ${className}`}
  >
    {children}
  </Button>
  )
};
