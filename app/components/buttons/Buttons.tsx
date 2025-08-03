import { Button } from "@/components/ui/button";

interface Props {
  onClick?: () => void | Promise<void>;
  isReactive?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

export const DefaultButton = ({ onClick, size = "default",type = "button", isReactive, children }: Props) => {
  return (
  <Button
    size={size}
    onClick={onClick}
    className={`${isReactive && "transition-all active:scale-95 duration-100"}`}
  >
    {children}
  </Button>
  )
};
