import { useQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { me } from "./graphql/connection";
import { IUser } from "./interfaces";
interface IMainProvider {
  children?: React.ReactNode;
}
export interface IMainContexts {
  user: IUser | null | undefined;
  setUser: Function;
  refetch: Function;
}

export const MainContext = createContext<IMainContexts | null>(null);

export const MainProvider: React.FunctionComponent<IMainProvider> = ({
  children,
}: IMainProvider): JSX.Element => {
  const { navigate, reset } = useNavigation();
  const [user, setUser] = useState<IUser | null | undefined>(undefined);
  const { data, refetch, error } = useQuery(me, {
    fetchPolicy: "network-only",
    errorPolicy: "ignore",
  });

  useEffect(() => {
    if (error) {
      setUser(undefined);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      if (data.me) {
        setUser(data.me);
        console.log("User connected");
      }
    }
  }, [data]);
  console.log(user);
  useEffect(() => {
    if (user === null) {
      navigate("Connection" as never);
    }
  }, [user]);
  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        refetch,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
