import { Menu } from "@mantine/core";
import { useState } from "react";
import { socialMediaDataTypes } from "../../../../types/social-type";
import { supabase } from "../../../../utils/supabase";

const SocialMenu = (props: {
  src: string | undefined;
  socials: socialMediaDataTypes[] | undefined;
  id: number;
}) => {
  const [image, setImage] = useState(props.src);
  const changeImage = async (socialId: number, image: string) => {
    setImage(image);
    const { data, error } = await supabase
      .from("tasks")
      .update({
        social: socialId,
      })
      .eq("id", props.id);
    console.log(data);
  };
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <img className="w-full h-full" src={image} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Reseau sociaux</Menu.Label>
        {props.socials?.map((social) => (
          <Menu.Item
            icon={<img className="w-8 h-8" src={social.img} />}
            key={social.id}
            onClick={() => changeImage(social.id, social.img)}
          >
            {social.title}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default SocialMenu;
