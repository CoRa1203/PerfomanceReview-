import FormGoal, { Goal } from "@/components/Forms/FormGoal";
import FormTasks from "@/components/Forms/FormTasks";

// const ROOT_URL_API = "http://192.168.0.107:3000/api";
const ROOT_URL_API = "http://192.168.137.1:3000/api";
// const ROOT_URL_API = "/api";
const url = ROOT_URL_API + "/v0/task";

async function getData(id: string): Promise<Goal> {
  const response = await fetch(url + "/" + id);
  const data = await response.json();
  console.log(data);
  return data;
}

export default async function Edit({ params }: { params: { taskId: string } }) {
  const id = await params.taskId;
  const data: Goal = await getData(id);

  return <FormTasks taskData={data} />;
}
