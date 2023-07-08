import { useEffect } from "react";
import ThemeButton from "./ThemeButton";
import LoginButton from "./LoginButton";
import { useAppSelector } from "@/store/hooks";
import UserButton from "./UserButton";

type RightsideProps = {};

const Rightside: React.FC<RightsideProps> = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <div className="flex space-x-5 items-center">
      <ThemeButton></ThemeButton>
      {user.access_token != "" ? (
        <UserButton></UserButton>
      ) : (
        <LoginButton></LoginButton>
      )}
    </div>
  );
};
export default Rightside;
