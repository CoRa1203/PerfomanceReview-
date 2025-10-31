import { useState } from "react";
import { Button } from "@heroui/button";
import { Copy } from "./icons";

interface CopyButtonProps {
  text: string;
  children?: React.ReactNode; 
}

export default function ButtonCopyText({ text, children }: CopyButtonProps){
    const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Не удалось скопировать текст: ", err);
    }
  };

    return(
 <Button
      variant="light"
      onPress={handleCopy}
      isIconOnly
    >
        <Copy/>
      {isCopied ? "Скопировано!" : children}
    </Button>
    )
}