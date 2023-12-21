import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// É preciso utilizar o plugin customParseFormat de dayjs.
dayjs.extend(customParseFormat);

const dataValida = (umaData: string) => {
  let dateArray = umaData.split("/");
  let newDate: string = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
  return dayjs(newDate, "YYYY-MM-DD", true).isValid();
};
export default dataValida;
