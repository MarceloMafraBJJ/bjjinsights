import { City } from "@/types";
import { Listbox } from "@headlessui/react";

interface SelectCityProps {
  onChange: (value: City) => void;
  value: City;
  data: City[];
}
const SelectCity = ({ value, onChange, data }: SelectCityProps) => {
  return (
    <div className="w-full">
      <Listbox as="div" className="space-y-4">
        <Listbox.Label>Selecione sua cidade</Listbox.Label>

        <Listbox.Button
          as="button"
          className="block w-full rounded-md bg-light_primary px-4 py-2 text-black outline-none dark:bg-dark_secondary dark:text-light_primary"
        >
          {data?.length > 0 || typeof value == "string" ? (
            typeof value == "object" ? (
              value.nome
            ) : (
              value || "Selecione sua cidade"
            )
          ) : (
            <>Selecione um estado primeiro</>
          )}
        </Listbox.Button>

        {data?.length > 0 && (
          <Listbox.Options
            as="ul"
            className="max-h-60 overflow-y-auto rounded-md bg-light_primary px-4 text-black shadow-md outline-none scrollbar-thin scrollbar-track-light_primary dark:bg-dark_secondary dark:text-light_primary dark:scrollbar-track-dark_primary"
          >
            {data?.map((city) => (
              <Listbox.Option key={city.id} value={city}>
                {({ active, selected }) => (
                  <li
                    className={`${
                      active && "opaCity-50"
                    } relative cursor-pointer select-none px-4 py-2`}
                    onClick={() => onChange(city)}
                  >
                    <p className="flex items-center gap-2">
                      {city.nome}
                      <span className="text-xs">
                        {" "}
                        ({city.microrregiao.nome})
                      </span>
                    </p>
                    {selected && (
                      <span
                        className={`${
                          active &&
                          "text-dark_secondary dark:text-light_primary"
                        } absolute inset-y-0 right-0 flex items-center pl-3`}
                      >
                        ✔
                      </span>
                    )}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        )}
      </Listbox>
    </div>
  );
};

export default SelectCity;
