import React, { useEffect, useState, createContext, useContext } from "react";
import { port } from "../../common/config";

type ReloadedAt = number;

const HotReloadContext = createContext<{ reloadedAt: ReloadedAt }>({
  reloadedAt: 0,
});

export const HotReloadRoot: React.VFC<{ children: React.ReactNode }> = (
  props
) => {
  const [reloadedAt, setReloadedAt] = useState<ReloadedAt>(0);

  useEffect(() => {
    const websocket = new WebSocket(`ws://${location.hostname}:${port}`);

    websocket.onmessage = () => {
      setReloadedAt(new Date().getTime());
    };

    return () => {
      console.log("Disconnecting socket...");
      websocket.close();
    };
  }, []);

  return (
    <HotReloadContext.Provider value={{ reloadedAt }}>
      {props.children}
    </HotReloadContext.Provider>
  );
};

export function useLocalFileChangedEffect(fn: () => unknown) {
  const { reloadedAt } = useContext(HotReloadContext);

  useEffect(() => {
    fn();
  }, [reloadedAt]);
}
