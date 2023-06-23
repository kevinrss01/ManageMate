import Navbar from "@/components/app/Navbar";
import RightSide from "@/components/app/homePage/RightSide";
import { fetchUserData, createStorageUsage } from "./homepage";
import { useEffect, useState } from "react";
import { update, updateStorage } from "../../../slices/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import { SlMagnifier } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";
import { File } from "@/interfaces/Interfaces";
import { typeFilter } from "../../utils/fileUtils";
import { useDebouncedEffect } from "@react-hookz/web";
import NetflixLoader from "@/components/loaders/FilesPageLoader";
import FilesContainer from "@/components/app/filesPage/FilesContainer";
import toastMessage from "@/utils/toast";

interface Filter {
  [key: string]: (files: File[], extension?: string) => void;
}

// TODO : Permettre de retirer les filtres
// TODO : Permettre de cumuler les filtres

export default function Files() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<File[]>([]);
  const [typeOfFilterOpen, setTypeOfFilterOpen] = useState<string>("none");
  const [activeFilter, setActiveFilter] = useState<string>("none");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const data = useSelector(selectUser);

  const fetchData = async () => {
    // If there is no data is redux store, fetch it from the API
    if (data.firstName === "") {
      console.log("fetch effectué 2");
      const id = localStorage.getItem("id");
      if (!id) {
        toastMessage(
          "Oups ! Une erreur c'est produit veuillez réessayer plus tard. (id not found))",
          "error"
        );
        return;
      }
      const userData = await fetchUserData(id);
      const userStorage = await createStorageUsage(userData);

      dispatch(
        update({
          ...userData,
        })
      );
      if (userStorage) {
        dispatch(
          updateStorage({
            ...userStorage,
          })
        );
      }

      setFiles(userData.files);
      setFilteredFiles(userData.files);
    } else {
      // If there is data in redux store, use it
      setFiles(data.files);
      setFilteredFiles(data.files);
    }
  };

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, [files]);

  const searchFiles = (value: string) => {
    if (value) {
      const filterFiles = [...files].filter((file) => {
        return file.name
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      });
      setFilteredFiles(filterFiles);
    } else {
      fetchData();
      setFilteredFiles(files);
    }
  };

  useDebouncedEffect(
    () => {
      searchFiles(searchValue);
    },
    [searchValue],
    200
  );

  const typeFilterMap: Filter = {
    dateGrowing: (files: File[]) => {
      const filterFiles = [...files].sort((a, b) => {
        const dateA = new Date(a.dateAdded);
        const dateB = new Date(b.dateAdded);
        return dateB.getTime() - dateA.getTime();
      });
      setFilteredFiles(filterFiles);
    },
    dateDecreasing: (files: File[]) => {
      const filterFiles = [...files].sort((a, b) => {
        const dateA = new Date(a.dateAdded);
        const dateB = new Date(b.dateAdded);
        return dateA.getTime() - dateB.getTime();
      });
      setFilteredFiles(filterFiles);
    },
    sizeGrowing: (files: File[]) => {
      const filterFiles = [...files].sort((a, b) => {
        return b.size - a.size;
      });
      setFilteredFiles(filterFiles);
    },
    sizeDecreasing: (files: File[]) => {
      const filterFiles = [...files].sort((a, b) => {
        return a.size - b.size;
      });
      setFilteredFiles(filterFiles);
    },
    filesType: (files: File[], extension: string | undefined) => {
      if (!extension) return;
      const filterFiles = [...files].filter((file) => {
        return file.type === extension;
      });
      setFilteredFiles(filterFiles);
    },
  };

  const handleFilterType = (filterType: string, extensionFile?: string) => {
    if (extensionFile) {
      typeFilterMap["filesType"](files, extensionFile);
    } else {
      typeFilterMap[filterType](files);
    }
  };

  return (
    <div className="files-pages-container">
      <Navbar />
      <main className="files-pages-main">
        <div className="searchContainer">
          <div className="input-container">
            <SlMagnifier className="searchIcon" />
            <input
              type="text"
              placeholder="Rechercher un fichier par son nom"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="files-container">
          <h2>Tous vos fichiers</h2>
          {isLoading ? (
            <>
              <NetflixLoader />
            </>
          ) : (
            <>
              <div className="filters-container">
                <div className="open-filters-container">
                  <h3>Filtrer mes fichiers</h3>
                  <IoIosArrowForward className="icon" />
                </div>

                <div className="filters">
                  {typeFilter.map((filter, index) => {
                    return (
                      <div key={index} className="filter-container">
                        <div
                          className="filter"
                          onClick={() => {
                            if (
                              isOpenFilters &&
                              typeOfFilterOpen !== filter.type
                            ) {
                              setTypeOfFilterOpen(filter.type);
                            } else {
                              setTypeOfFilterOpen(filter.type);
                              setIsOpenFilters(!isOpenFilters);
                            }
                          }}
                        >
                          <span>Filtrer par {filter.type}</span>
                          <IoIosArrowForward
                            className="icon"
                            style={{
                              rotate:
                                isOpenFilters &&
                                typeOfFilterOpen === filter.type
                                  ? "90deg"
                                  : "",
                            }}
                          />
                        </div>
                        {isOpenFilters && typeOfFilterOpen === filter.type && (
                          <div className="under-filter-type-container">
                            {filter.underFilterType.map(
                              (underFilter, index: number) => {
                                return (
                                  <div
                                    key={index}
                                    className="under-filter-type"
                                    style={{
                                      backgroundColor:
                                        activeFilter === underFilter.displayName
                                          ? "#F87F3F"
                                          : "",
                                      pointerEvents:
                                        activeFilter === underFilter.displayName
                                          ? "none"
                                          : "auto",
                                    }}
                                    onClick={() => {
                                      setActiveFilter(underFilter.displayName);
                                      handleFilterType(
                                        underFilter.function,
                                        underFilter.extension
                                      );
                                    }}
                                  >
                                    {underFilter.displayName}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <FilesContainer filteredFiles={filteredFiles} />
            </>
          )}
        </div>
      </main>
      <RightSide />
    </div>
  );
}
