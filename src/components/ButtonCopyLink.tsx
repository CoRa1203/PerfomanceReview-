import { useState } from "react";
import { Button } from "@heroui/button";

interface CopyButtonProps {
  text: string;
  children?: React.ReactNode; 
}

export default function ButtonCopyLink({ text, children }: CopyButtonProps){
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // const copyText = process.env.NEXT_PUBLIC_HOST + text
      // н требует HTTPS (или localhost)
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    } catch (err) {
      console.error("Не удалось скопировать ", err);
    }
  };

  return(
    <Button
      onPress={handleCopy}
      color={ isCopied ? 'default' : 'primary' }
    >
      {isCopied ? "Скопировано!" : (children || 'Скопировать')}
    </Button>
  )
}