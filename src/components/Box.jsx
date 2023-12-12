/* eslint-disable react/prop-types */
const Box = (props) => {
  const { value, handleBoxClick, winnerData } = props;

  const onBoxClick = () => {
    if (!value.data) handleBoxClick(value);
  };

  return (
    <div
      className={`w-24 h-24 border-2 border-sky-100 flex items-center justify-center cursor-pointer ${
        winnerData && winnerData.includes(value.index)
          ? "bg-teal-500 border-teal-500"
          : ""
      }`}
      onClick={() => onBoxClick()}
    >
      <span className="text-xl">
        {value.data === "X" ? "X" : value.data === "O" ? "O" : ""}
      </span>
    </div>
  );
};

export default Box;
