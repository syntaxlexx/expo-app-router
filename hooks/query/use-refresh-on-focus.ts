import React, { useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";

// This custom hook triggers a refetch when the screen is focused.
export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const enabledRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (enabledRef.current) {
        refetch();
      } else {
        enabledRef.current = true;
      }
    }, [refetch])
  );
}
