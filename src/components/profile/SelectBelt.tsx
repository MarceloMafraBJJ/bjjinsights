"use client";

import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { belts } from "@/constants";

interface SelectBeltProps {
  setState: (value: string) => void;
  state: string;
}

interface BeltProps {
  category: string;
  subcategory: string[];
}

const SelectBelt = ({ state, setState }: SelectBeltProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);

  const toggleCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  const toggleSubcategoryModal = (category: string) => {
    if (category === selectedCategory) {
      setIsSubcategoryModalOpen(!isSubcategoryModalOpen);
    } else {
      setSelectedCategory(category);
      setIsSubcategoryModalOpen(true);
    }
  };
  const handleSubcategorySelection = (subcategory: string) => {
    setIsCategoryModalOpen(false);
    setIsSubcategoryModalOpen(false);
    setState(subcategory);
  };

  return (
    <Listbox as="div" className="relative flex h-full w-full flex-col gap-4">
      <Listbox.Label>Selecione sua faixa</Listbox.Label>

      <div
        onClick={toggleCategoryModal}
        className="bg-secondary flex cursor-pointer items-center rounded-md p-4 text-left shadow-sm"
      >
        <span className="ml-3">{state || "Selecione uma faixa"}</span>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      <Transition
        show={isCategoryModalOpen && !isSubcategoryModalOpen}
        enter="transition ease-in duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-out duration-75"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="bg-secondary w-[280px] rounded-md py-1 text-base shadow-lg">
          {belts.map((belt, index) => (
            <BeltOption
              key={index}
              belt={belt}
              toggleSubcategoryModal={toggleSubcategoryModal}
            />
          ))}
        </div>
      </Transition>

      <Transition
        show={isSubcategoryModalOpen}
        enter="transition ease-in duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-out duration-75"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          onMouseLeave={() => {
            setIsCategoryModalOpen(!isCategoryModalOpen);
            setIsSubcategoryModalOpen(!isSubcategoryModalOpen);
          }}
          className="bg-secondary w-[280px] rounded-md py-1 text-base shadow-lg"
        >
          {belts
            .find((belt) => belt.category === selectedCategory)
            ?.subcategory.map((subcategory, index) => (
              <SubcategoryOption
                key={index}
                subcategory={subcategory}
                handleSubcategorySelection={handleSubcategorySelection}
              />
            ))}
        </div>
      </Transition>
    </Listbox>
  );
};

const BeltOption = ({
  belt,
  toggleSubcategoryModal,
}: {
  belt: BeltProps;
  toggleSubcategoryModal: (category: string) => void;
}) => (
  <div
    onClick={() => toggleSubcategoryModal(belt.category)}
    className="cursor-pointer select-none px-4 py-2"
  >
    <div className="flex items-center">
      <span className="ml-2 font-medium">{belt.category}</span>
    </div>
  </div>
);

const SubcategoryOption = ({
  subcategory,
  handleSubcategorySelection,
}: {
  subcategory: string;
  handleSubcategorySelection: (subcategory: string) => void;
}) => (
  <div
    onClick={() => handleSubcategorySelection(subcategory)}
    className="cursor-pointer select-none px-4 py-2"
  >
    <div className="flex items-center">
      <span className="ml-2 font-medium">{subcategory}</span>
    </div>
  </div>
);

export default SelectBelt;
