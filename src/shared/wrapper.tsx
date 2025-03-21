import { FC, ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default wrapper; 