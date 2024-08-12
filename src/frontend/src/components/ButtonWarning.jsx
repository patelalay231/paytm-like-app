import { useNavigate } from "react-router-dom";

function ButtonWarning({ label, buttonText, buttonLink }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(buttonLink);
  };

  return (
    <div className="flex justify-center pt-2">
      <div>{label}</div>
      <button className="underline" onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default ButtonWarning;
