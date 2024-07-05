import { SplashScreen, router } from "expo-router";
import React, { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import SplashScreenLoad from "../screens/SplashScreenLoad";

const index = () => {
  useEffect(() => {
    const delay = setTimeout(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          router.replace("/(tabs)/");
        }
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          router.replace("/(tabs)/");
        } else {
          router.replace("/login");
        }
      });
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  return <SplashScreenLoad />;
};

export default index;
