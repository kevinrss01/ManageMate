import Navbar from "../components/app/Navbar";
import RightSide from "../components/app/homePage/RightSide";
import { fetchUserData, fetchFiles, createStorageUsage } from "./homepage";
import { useEffect } from "react";
import { update, updateStorage } from "../../../slices/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";

export default function Files() {
  const dispatch = useDispatch();
  const data = useSelector(selectUser);

  useEffect(() => {
    const fetchData = async () => {
      if (data.firstName === "") {
        console.log("yes");
        const userData = await fetchUserData();
        const userStorage = await createStorageUsage(userData);

        dispatch(
          update({
            ...userData,
          })
        );
        dispatch(
          updateStorage({
            ...userStorage,
          })
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="files-pages-container">
      <Navbar />
      <main className="mainPageContainer"></main>
      <RightSide />
    </div>
  );
}
