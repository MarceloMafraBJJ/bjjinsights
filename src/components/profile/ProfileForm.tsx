"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import useSWR from "swr";
import toast from "react-hot-toast/headless";

import { City, Location, User } from "@/types";
import { SelectState, SelectCity, SelectBelt } from ".";
import { Button, FormField } from "../shared";
import { fetcher } from "@/constants";

interface ProfileFormProps {
  session: Session;
  user?: User;
}

interface State {
  id: number;
  nome: string;
  sigla: string;
}

const ProfileForm = ({ session, user }: ProfileFormProps) => {
  const router = useRouter();

  const [isSubmitting, setSubmitting] = useState(false);
  const [state, setState] = useState<State>();
  const [city, setCity] = useState<City>();
  const [location, setLocation] = useState<Location>();

  const [form, setForm] = useState({
    name: user?.name || "",
    description: user?.description || "",
    instagram: user?.instagram || "",
    youtube: user?.youtube || "",
    belt: user?.belt || "",
    email: user?.email || session.user?.email,
  });

  useEffect(() => {
    if (city) {
      setLocation({
        city: city?.nome,
        state: city?.microrregiao.mesorregiao.UF.nome,
        uf: city?.microrregiao.mesorregiao.UF.sigla,
        mesoregion: city?.microrregiao.mesorregiao.nome,
        microregion: city?.microrregiao.nome,
        region: city?.microrregiao.mesorregiao.UF.regiao.nome,
        userEmail: user?.email || session.user?.email!,
      });
    } else if (user?.location) {
    }
  }, [city]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify({ form, location }),
      });

      toast.success("Perfil editado com sucesso.");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      router.push(`/profile?email=${user?.email}`);
    }
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  const { data: citiesData } = useSWR(
    state &&
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.id}/municipios`,
    fetcher,
  );

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto flex w-full flex-col items-center justify-normal gap-6 py-12 text-lg md:gap-10 md:p-16"
    >
      <div className="flex w-full flex-col items-start gap-5 md:flex-row">
        <FormField
          title="Nome"
          state={form.name}
          placeholder="John Doe"
          setState={(value) => handleStateChange("name", value)}
          required
        />

        <SelectBelt
          state={form.belt}
          setState={(value) => handleStateChange("belt", value)}
        />
      </div>

      <FormField
        title="Descrição"
        state={form.description}
        placeholder="Faixa preta 2 graus.."
        setState={(value) => handleStateChange("description", value)}
        isTextArea
      />

      <div className="flex w-full flex-col gap-5 md:flex-row">
        <SelectState
          value={state! || user?.location?.state!}
          onChange={(value: State) => setState(value)}
        />
        <SelectCity
          value={city! || user?.location?.city!}
          onChange={(value: City) => setCity(value)}
          data={citiesData}
        />
      </div>

      <div className="flex w-full flex-col gap-5 md:flex-row">
        <FormField
          title="Instagram"
          state={form.instagram}
          placeholder="https://www.instagram.com/bjjinsights/"
          setState={(value) => handleStateChange("instagram", value)}
          type="url"
          pattern="https?://(www\.)?instagram\.com/.+"
        />
        <FormField
          title="Youtube"
          state={form.youtube}
          placeholder="https://www.youtube.com/bjjinsights/"
          setState={(value) => handleStateChange("youtube", value)}
          type="url"
          pattern="https?://(www\.)?youtube\.com/.+"
        />
      </div>

      <div className="w-full">
        <div className="w-[300px]">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Editando.." : "Editar"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
