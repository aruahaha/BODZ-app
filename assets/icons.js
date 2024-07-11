import {
  AntDesign,
  Entypo,
  Feather,
  Fontisto,
  Octicons,
} from "@expo/vector-icons";

export const icons = {
  Home: (props) => <Entypo name="home" size={24} {...props} />,
  Deals: (props) => <Fontisto name="shopping-sale" size={26} {...props} />,
  Profile: (props) => <Octicons name="feed-person" size={24} {...props} />,
};
