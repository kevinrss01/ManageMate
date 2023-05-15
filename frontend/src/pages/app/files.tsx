import Navbar from "../components/app/Navbar";
import RightSide from "../components/app/homePage/RightSide";
import { fetchUserData, fetchFiles, createStorageUsage } from "./homepage";
import { useEffect, useState } from "react";
import { update, updateStorage } from "../../../slices/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import { SlMagnifier } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";
import { File } from "@/interfaces/Interfaces";

interface Filter {
  [key: string]: (files: File[]) => File[];
}

export default function Files() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isFilterType, setIsFilterType] = useState<string>("none");
  const [isFilterOpen, setIsFilterOpen] = useState<string>("none");

  const dispatch = useDispatch();
  const data = useSelector(selectUser);

  const searchFiles = () => {
    if (searchValue) {
      //console.log(searchValue);
    }
  };

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

      const files = await fetchFiles();
      setFiles(files);
    };

    fetchData();
  }, [files]);

  const typeFilterMap: Filter = {
    date: (files: File[]) => {
      return files.sort((a, b) => {
        const dateA = new Date(a.dateAdded);
        const dateB = new Date(b.dateAdded);
        return dateB.getTime() - dateA.getTime();
      });
    },
    // weight: (files: File[]) => {

    // },
    // type: (files: File[]) => {},
    // name: (files: File[]) => {},
  };

  useEffect(() => {
    if (isFilterType !== "none") {
      typeFilterMap[isFilterType];
    }
  }, [isFilterType]);

  const typeFilter = [
    {
      type: "date",
      underFilterType: [
        //Ajouter tous les types de filtres
      ],
    },
    {
      type: "poids",
      underFilterType: [
        //Ajouter tous les types de filtres
      ],
    },
    {
      type: "type de fichier",
      underFilterType: [
        //Ajouter tous les types de filtres
      ],
    },
  ];

  return (
    <div className="files-pages-container">
      <Navbar />
      <main className="files-pages-main">
        <div className="searchContainer">
          <div className="input-container">
            <SlMagnifier className="searchIcon" />
            <input
              type="text"
              placeholder="Rechercher un fichier par nom"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (searchValue) {
                    searchFiles();
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="files-container">
          <h2>Tous vos fichiers</h2>
          <div className="filters-container">
            <div className="open-filters-container">
              <h3>Filtrer mes fichiers</h3>
              <IoIosArrowForward className="icon" />
            </div>

            <div className="filters">
              {typeFilter.map((filter, index) => {
                return (
                  <div
                    key={index}
                    className="filter-container"
                    onClick={() => {
                      setIsOpenFilters(!isOpenFilters);
                      setIsFilterOpen(filter.type);
                    }}
                  >
                    <div className="filter">
                      <span>Filtrer par {filter.type}</span>
                      <IoIosArrowForward
                        className="icon"
                        style={{
                          rotate:
                            isOpenFilters && isFilterOpen === filter.type
                              ? "90deg"
                              : "",
                        }}
                      />
                    </div>
                    {isOpenFilters && isFilterOpen === filter.type && (
                      <div className="under-filter-type">
                        {/* Maper sur tous les sous-type de filtre */}
                        <span>Hello</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="files">
            {files.map((file) => {
              return (
                <div className="file" key={file.id}>
                  <span>{file.name}</span>
                  <span>{file.type}</span>
                  <span>{file.size}</span>
                  <span>{file.dateAdded}</span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <RightSide />
    </div>
  );
}
