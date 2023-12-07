/* eslint-disable react/prop-types */
const Box = (props) => {
  const { value, handleBoxClick } = props;

  const onBoxClick = () => {
    if (!value.data) handleBoxClick(value);
  };

  return (
    <div
      className="w-24 h-24 border-2 border-sky-100 flex items-center justify-center cursor-pointer"
      onClick={() => onBoxClick()}
    >
      <span className="text-xl">{value.data}</span>
    </div>
  );
};

export default Box;
