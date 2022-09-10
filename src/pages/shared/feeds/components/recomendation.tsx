import { useQuery } from "@tanstack/react-query";
import { clientsType } from "../../../../types/account-type";
import { socialMediaDataTypes } from "../../../../types/social-type";
import { supabase } from "../../../../utils/supabase";
import ShortProfile from "../../layout/components/short-profile";
const Recomendation = () => {
  const { data: clients } = useQuery(["recommendation"], async () => {
    const { data } = await supabase.from("clients").select("*").limit(2);
    console.log(data);

    return data as clientsType[];
  });
  const { data: social, isFetched } = useQuery(["social-media"], async () => {
    const { data } = await supabase.from("social-media");
    return data as socialMediaDataTypes[];
  });
  return (
    <div className="bg-white rounded-xl p-3">
      <p className="text-start font-bold text-gray-600">Recommendation</p>
      <div className="mt-2 flex flex-col items-start justify-center">
        {clients?.map(({ id, name, phone, avatar }) => {
          return (
            <ShortProfile
              id={id}
              key={id}
              name={name}
              phone={phone}
              avatar={avatar}
              social={isFetched ? social![Math.floor(Math.random() * 5)] : null}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Recomendation;
