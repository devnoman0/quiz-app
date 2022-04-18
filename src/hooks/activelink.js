/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const useActiveLink = () => {
  const router = useRouter();
  const currentUrl = router.pathname;
  const getActiveLinkKey = () => {
    switch (currentUrl) {
      case "/register":
        return "2";
      case "/login":
        return "1";
      case "/on-board":
        return "3";
      case "/drafted-quiz":
        return "4";

      default:
        return null;
    }
  };

  const [activeLink, setActiveLink] = useState(() => getActiveLinkKey());

  useEffect(() => {
    setActiveLink(() => getActiveLinkKey());
  }, [currentUrl]);

  return [activeLink];
};
