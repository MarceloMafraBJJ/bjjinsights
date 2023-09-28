interface FormFieldProps {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  setState: (value: string) => void;
  isTextArea?: boolean;
  required?: boolean;
}

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
  required = false,
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
          className="placeholder:text-gray-secondary h-[150px] w-full resize-none rounded-md bg-light_primary p-4 outline-0 dark:bg-dark_secondary"
        />
      ) : (
        <input
          type={type || "text"}
          required={required}
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder={placeholder}
          className="placeholder:text-gray-secondary w-full rounded-md bg-light_primary p-4 outline-0 dark:bg-dark_secondary"
        />
      )}
    </div>
  );
};

export default FormField;
