import React from "react";
import { Button } from "@/components/ui/button";
import { LIMIT_MESSAGE } from "@/lib/constants";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { generateFromTo } from "@/lib/utils";
import { useMessage } from "@/lib/store/messages";
import { toast } from "sonner";

export default function LoadMoreMessages() {
  const { page, setMessages, hasMore } = useMessage((state) => state);
  const fetchMore = async () => {
    const supabase = supabaseBrowser();
    const { from, to } = generateFromTo(page, LIMIT_MESSAGE);
    const { data, error } = await supabase
      .from("messages")
      .select("*, users(*)")
      .range(from, to)
      .order("created_at", { ascending: false });
    if (error) {
      toast.error(error.message);
    } else {
      setMessages(data.reverse() || []);
    }
  };
  if (hasMore) {
    return (
      <Button variant="outline" className="w-full" onClick={fetchMore}>
        Load More
      </Button>
    );
  }
  return <></>;
}
