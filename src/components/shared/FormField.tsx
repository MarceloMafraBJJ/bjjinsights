import { ComponentProps } from "react";

type FormFieldProps = ComponentProps<"input"> & {
  setState: (value: string) => void;
  state: string;
  title: string;
  isTextArea?: boolean;
};

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
  required = false,
  pattern,
}: FormFieldProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <label className="text-gray-secondary w-full">{title}</label>

      {isTextArea ? (
        <textarea
          required={required}
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder={placeholder}
          className="placeholder:text-gray-secondary h-[150px] w-full resize-none rounded-md bg-secondary p-4 outline-0"
        />
      ) : (
        <input
          type={type || "text"}
          required={required}
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder={placeholder}
          className="placeholder:text-gray-secondary w-full rounded-md bg-secondary p-4 outline-0"
          pattern={pattern}
          title={"Insira um URL válido para esta rede social."}
        />
      )}
    </div>
  );
};

export default FormField;
