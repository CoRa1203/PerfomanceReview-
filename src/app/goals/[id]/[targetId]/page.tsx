  import { Edit } from "@/components/icons";
import { Button } from "@heroui/button";


export default function Task (){
    return(
        <div className="w-full flex gap-2 items-center">
        <p className="w-full">Задача</p>
        <Button>
          <Edit />
        </Button>
      </div>
    )
}