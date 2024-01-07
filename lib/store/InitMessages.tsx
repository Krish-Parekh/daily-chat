"use client";
import React, { useEffect, useRef } from "react";
import { useMessage } from "./messages";
import { IMessage } from "./messages";
import { LIMIT_MESSAGE } from "../constants";

interface InitMessageProps {
  messages: IMessage[];
}
export default function InitMessage({ messages }: InitMessageProps) {
  const initState = useRef(false);
  const hasMore = messages.length >= LIMIT_MESSAGE;
  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages, hasMore });
    }
    initState.current = true;
    // eslint-disable-next-line
  }, []);
  return <></>;
}
