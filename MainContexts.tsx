import { useQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { me } from "./graphql/connection";
import { ICategory, IUser } from "./interfaces";
import { getCategories } from "./graphql/Category";
interface IMainProvider {
  children?: React.ReactNode;
}
export interface IMainContexts {
  user: IUser | null | undefined;
  setUser: Function;
  refetch: Function;
  categorie: string;
  setCategorie: Function;
  categories: ICategory[] | [];
}

export const MainContext = createContext<IMainContexts | null>(null);

export const MainProvider: React.FunctionComponent<IMainProvider> = ({
  children,
}: IMainProvider): JSX.Element => {
  const { navigate, reset } = useNavigation();
  const [categorie, setCategorie] = useState("");
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

  const [categories, setCategories] = useState<ICategory[] | []>([]);
  const categoriesData = useQuery(getCategories, {});

  useEffect(() => {
    if (error) {
      setUser(undefined);
    }
  }, [categoriesData.error]);

  useEffect(() => {
    if (categoriesData.data) {
      if (categoriesData.data) {
        setCategories(categoriesData.data.categories);
        console.log("Categories getted");
      }
    }
  }, [categoriesData.data]);
  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        refetch,
        categorie,
        setCategorie,
        categories,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
