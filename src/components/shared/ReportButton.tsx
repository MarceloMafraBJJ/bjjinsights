"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from ".";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { commonReports } from "@/constants";
import { Post } from "@/types";

const ReportButton = ({
  userEmail,
  post,
}: {
  userEmail: string;
  post: Post;
}) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [hasReported, setHasReported] = useState(false);

  useEffect(() => {
    selectedReason && handleReport();
  }, [selectedReason]);

  const handleReport = async () => {
    if (!userEmail) {
      return toast.error(
        "Você precisa estar logado para reportar uma postagem",
      );
    }

    if (!selectedReason) {
      return toast.error("Por favor, selecione um motivo de relatório.");
    }

    if (hasReported) {
      return toast.error("Você já reportou esta postagem.");
    }

    setHasReported(true);

    await fetch("/api/posts/report", {
      method: "POST",
      body: JSON.stringify({
        userEmail,
        reason: selectedReason,
        postId: post.id,
        postTitle: post.title,
        postSlug: post.slug,
        postUserEmail: post.userEmail,
      }),
    });
    toast.dismiss();

    toast.success(
      `Postagem reportada com sucesso. Motivo: ( ${selectedReason} )`,
    );
  };

  return (
    <div className="flex flex-col">
      <button
        className="h-5 w-5 cursor-pointer transition-all hover:fill-accent"
        onClick={() => {
          toast((t) => (
            <div className="flex flex-col">
              <p>Selecione um motivo de relatório:</p>
              <select
                className="mt-2 rounded-md border border-gray-300 p-1"
                onChange={(e) => setSelectedReason(e.target.value)}
                value={selectedReason || ""}
              >
                <option value="">-- Selecione um motivo --</option>
                {commonReports.map((report) => (
                  <option key={report} value={report}>
                    {report}
                  </option>
                ))}
              </select>

              <Button
                className="my-3 w-full bg-accent font-medium"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancelar
              </Button>
            </div>
          ));
        }}
      >
        <ExclamationTriangleIcon className="h-5 w-5 transition-all hover:fill-accent" />
      </button>
    </div>
  );
};

export default ReportButton;
