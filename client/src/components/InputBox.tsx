export const InputBox = ({
  type,
  placeholder,
  name,
  onChange,
  value
}: {
  type: string;
  placeholder: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | undefined
}) => {
  return (
    <input
      type={`${type}`}
      onChange={onChange}
      value={value}
      autoComplete="off"
      name={`${name}`}
      className="w-full h-10 border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
      placeholder={`${placeholder}`}
    />
  );
};
