import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — CineHub` : "CineHub — Tu próxima película";
  }, [title]);
}
