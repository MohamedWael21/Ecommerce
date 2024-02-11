import { Helmet } from "react-helmet";
interface HelmetDataProp {
  title: string;
}
const HelmetData = ({ title }: HelmetDataProp) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default HelmetData;
