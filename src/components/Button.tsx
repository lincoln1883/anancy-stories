
interface ButtonProps {
	type: "button" | "submit" | "reset";
	className?: string;
	onClick?: () => void;
	children: React.ReactNode;
};


const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
	return (
    <button onClick={onClick} className="bg-blue-500 text-white text-sm rounded-md h-10 w-48 uppercase">
      {children}
    </button>
  );
};

export default Button;