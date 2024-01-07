"use client";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useRef } from "react";
import { useUser } from "./user";

interface InitUserProps {
  user: User | undefined;
}
export default function InitUser({ user }: InitUserProps) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useUser.setState({ user });
    }
    initState.current = true;
    // eslint-disable-next-line
  }, []);
  return <></>;
}
